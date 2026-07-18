import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonInput,
  IonButton, IonIcon,
  IonSegment, IonSegmentButton, IonButtons,
  IonText, IonFooter, IonSelect, IonSelectOption,
  IonItemGroup,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, listOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';
import { RemoteConfigService } from 'src/app/services/remote-config.service';
import { Task } from 'src/app/models/task.model';
import { Category } from 'src/app/models/category.model';
import { TaskItemComponent } from 'src/app/components/task-item/task-item.component';
import { CategoryFilterComponent } from 'src/app/components/category-filter/category-filter.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    NgFor, NgIf, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput,
    IonButton, IonIcon,
    IonSegment, IonSegmentButton, IonButtons,
    IonText, IonFooter, IonSelect, IonSelectOption,
    IonItemGroup,
    TaskItemComponent, CategoryFilterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredCategoryId: string | null = null;
  newTaskTitle = '';
  newTaskCategory = '';
  newTaskDeadline = '';
  showDeadline = false;
  activeFilter: 'all' | 'pending' | 'completed' = 'all';
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private remoteConfig: RemoteConfigService,
  ) {
    addIcons({ addOutline, listOutline, checkmarkDoneOutline });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.tasks = this.taskService.getTasks();
    this.showDeadline = this.remoteConfig.isDeadlineEnabled$.value;
    this.remoteConfig.isDeadlineEnabled$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => { this.showDeadline = v; });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredTasks(): Task[] {
    let list = this.taskService.getTasksByCategory(this.filteredCategoryId);
    if (this.activeFilter === 'pending') {
      list = list.filter((t) => !t.completed);
    } else if (this.activeFilter === 'completed') {
      list = list.filter((t) => t.completed);
    }
    return list;
  }

  getTaskCategory(categoryId: string | null): Category | undefined {
    if (!categoryId) return undefined;
    return this.categories.find((c) => c.id === categoryId);
  }

  async addTask(): Promise<void> {
    const title = this.newTaskTitle.trim();
    if (!title) return;
    await this.taskService.addTask(title, this.newTaskCategory || undefined, this.newTaskDeadline || undefined);
    this.tasks = this.taskService.getTasks();
    this.newTaskTitle = '';
    this.newTaskCategory = '';
    this.newTaskDeadline = '';
  }

  async toggleTask(id: string): Promise<void> {
    await this.taskService.toggleTask(id);
    this.tasks = this.taskService.getTasks();
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  onCategoryFilter(categoryId: string | null): void {
    this.filteredCategoryId = categoryId;
  }

  onFilterChange(event: CustomEvent): void {
    this.activeFilter = event.detail.value;
  }

  trackById(_index: number, item: Task): string {
    return item.id;
  }

  get pendingCount(): number {
    return this.taskService.getTasks().filter((t) => !t.completed).length;
  }
}
