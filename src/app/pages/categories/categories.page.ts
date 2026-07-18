import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton,
  IonFab, IonFabButton, IonIcon, IonModal,
  IonInput, IonBackButton, IonButtons,
  IonItemSliding, IonItemOptions, IonItemOption,
  IonAlert, IonChip, IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, closeOutline } from 'ionicons/icons';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  imports: [
    NgFor, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton,
    IonFab, IonFabButton, IonIcon, IonModal,
    IonInput, IonBackButton, IonButtons,
    IonItemSliding, IonItemOptions, IonItemOption,
    IonAlert, IonChip, IonFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  showModal = false;
  editingCategory: Category | null = null;
  formName = '';
  formColor = '#3880ff';
  showDeleteAlert = false;
  deleteTargetId: string | null = null;
  colorOptions = ['#3880ff', '#eb445a', '#2dd36f', '#ffc409', '#5260ff', '#8e24aa', '#00bcd4', '#ff7043'];

  constructor(private categoryService: CategoryService) {
    addIcons({ addOutline, createOutline, trashOutline, closeOutline });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  openCreate(): void {
    this.editingCategory = null;
    this.formName = '';
    this.formColor = '#3880ff';
    this.showModal = true;
  }

  openEdit(cat: Category): void {
    this.editingCategory = cat;
    this.formName = cat.name;
    this.formColor = cat.color;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
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
