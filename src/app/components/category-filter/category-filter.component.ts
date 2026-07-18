import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  imports: [NgFor, NgIf, NgStyle, IonChip, IonIcon, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
  @Input() categories: Category[] = [];
  @Input() selectedId: string | null = null;
  @Output() selectionChange = new EventEmitter<string | null>();

  constructor() {
    addIcons({ closeOutline });
  }

  selectCategory(id: string | null): void {
    this.selectionChange.emit(id === this.selectedId ? null : id);
  }

  clearFilter(event: Event): void {
    event.stopPropagation();
    this.selectionChange.emit(null);
  }
}
