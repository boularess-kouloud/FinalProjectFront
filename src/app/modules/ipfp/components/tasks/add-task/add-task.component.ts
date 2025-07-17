import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private taskService: TaskService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  save(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe(() => {
        this.router.navigate(['/list-tasks']);
      });
    }
  }

  reset(): void {
    this.taskForm.reset();
  }
}