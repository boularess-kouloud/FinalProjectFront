import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private taskService: TaskService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.taskForm.patchValue({
        title: task.title,
        content: task.content
      });
    });
  }

  reset(): void {
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.taskForm.patchValue({
        title: task.title,
        content: task.content
      });
    });
  }

  save(): void {
    if (this.taskForm.valid) {
      console.log('Formulaire valide, envoi de la requête...'); // 👈 à ajouter
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(() => {
        this.router.navigate(['/list-tasks']);
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
