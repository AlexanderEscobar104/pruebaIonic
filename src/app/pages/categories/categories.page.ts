import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton,
  IonFab, IonFabButton, IonIcon, IonModal,
  IonInput, IonBackButton, IonButtons,
  IonAlert, IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, closeOutline, checkmarkOutline, listOutline } from 'ionicons/icons';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  imports: [
    NgFor, NgIf, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton,
    IonFab, IonFabButton, IonIcon, IonModal,
    IonInput, IonBackButton, IonButtons,
    IonAlert, IonFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  showModal = false;
  editingCategory: Category | null = null;
  formName = '';
  formColor = '#6366f1';
  showDeleteAlert = false;
  deleteTargetId: string | null = null;
  colorOptions = ['#6366f1', '#a855f7', '#ec4899', '#ef4444', '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#14b8a6'];

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
  ) {
    addIcons({ addOutline, createOutline, trashOutline, closeOutline, checkmarkOutline, listOutline });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  openCreate(): void {
    this.editingCategory = null;
    this.formName = '';
    this.formColor = '#6366f1';
    this.showModal = true;
    this.cdr.markForCheck();
  }

  openEdit(cat: Category): void {
    this.editingCategory = cat;
    this.formName = cat.name;
    this.formColor = cat.color;
    this.showModal = true;
    this.cdr.markForCheck();
  }

  closeModal(): void {
    this.showModal = false;
    this.cdr.markForCheck();
  }

  async save(): Promise<void> {
    if (!this.formName.trim()) return;
    if (this.editingCategory) {
      await this.categoryService.updateCategory(this.editingCategory.id, this.formName, this.formColor);
    } else {
      await this.categoryService.addCategory(this.formName, this.formColor);
    }
    this.categories = this.categoryService.getCategories();
    this.closeModal();
    this.cdr.markForCheck();
  }

  confirmDelete(id: string): void {
    this.deleteTargetId = id;
    this.showDeleteAlert = true;
  }

  async onDeleteConfirm(): Promise<void> {
    if (this.deleteTargetId) {
      await this.categoryService.deleteCategory(this.deleteTargetId);
      this.categories = this.categoryService.getCategories();
    }
    this.showDeleteAlert = false;
    this.deleteTargetId = null;
  }

  get alertButtons() {
    return [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Eliminar', handler: () => { this.onDeleteConfirm(); } },
    ];
  }
}
