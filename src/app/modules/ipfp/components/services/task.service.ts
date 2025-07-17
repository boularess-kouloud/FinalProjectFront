// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TaskModel} from "../../models/task.model";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.apiUrl, task);
  }

  updateTask(id: number, task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}