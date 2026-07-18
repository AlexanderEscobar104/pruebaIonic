import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  imports: [NgFor, IonSegment, IonSegmentButton, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
  @Input() categories: Category[] = [];
  @Input() selectedId: string | null = null;
  @Output() selectionChange = new EventEmitter<string | null>();

  onSegmentChange(event: CustomEvent): void {
    const value = event.detail.value;
    this.selectionChange.emit(value === 'all' ? null : value);
  }
}
