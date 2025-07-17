import {Component, OnInit} from '@angular/core';
import {TaskModel} from "../../../models/task.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MatDrawerContainer,
    MatIcon,
    DatePipe,
    NgIf
  ]
})
export class ListTasksComponent implements OnInit {
  tasks: TaskModel[] = [];
  loading = true;
  error: string | null = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des tâches';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}
