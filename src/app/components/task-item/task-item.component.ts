import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { NgIf, NgStyle, DatePipe } from '@angular/common';
import { Task } from 'src/app/models/task.model';
import { Category } from 'src/app/models/category.model';
import { trashOutline, checkmarkCircle, ellipseOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  imports: [IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, NgIf, NgStyle, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() category?: Category;
  @Input() showDeadline = false;
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() {
    addIcons({ trashOutline, checkmarkCircle, ellipseOutline });
  }

  onToggle(): void {
    this.toggle.emit(this.task.id);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
