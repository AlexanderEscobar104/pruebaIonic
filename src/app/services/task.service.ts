import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private _tasks: Task[] = [];
  private readonly STORAGE_KEY = 'tasks';

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    await this.storage.create();
    const stored = await this.storage.get(this.STORAGE_KEY);
    this._tasks = stored || [];
  }

  getTasks(): Task[] {
    return this._tasks;
  }

  async addTask(title: string, categoryId?: string, deadline?: string): Promise<Task> {
    const task: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      categoryId: categoryId || null,
      deadline,
      createdAt: Date.now(),
    };
    this._tasks.unshift(task);
    await this.persist();
    return task;
  }

  async toggleTask(id: string): Promise<void> {
    const task = this._tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.persist();
    }
  }

  async deleteTask(id: string): Promise<void> {
    this._tasks = this._tasks.filter((t) => t.id !== id);
    await this.persist();
  }

  getTasksByCategory(categoryId: string | null): Task[] {
    if (!categoryId) return this._tasks;
    return this._tasks.filter((t) => t.categoryId === categoryId);
  }

  async updateTaskCategory(taskId: string, categoryId: string | null): Promise<void> {
    const task = this._tasks.find((t) => t.id === taskId);
    if (task) {
      task.categoryId = categoryId;
      await this.persist();
    }
  }

  private async persist(): Promise<void> {
    await this.storage.set(this.STORAGE_KEY, this._tasks);
  }
}
