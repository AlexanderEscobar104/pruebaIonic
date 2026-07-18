import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _categories: Category[] = [];
  private readonly STORAGE_KEY = 'categories';

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    await this.storage.create();
    const stored = await this.storage.get(this.STORAGE_KEY);
    this._categories = stored || [];
    if (this._categories.length === 0) {
      await this.seedDefaults();
    }
  }

  getCategories(): Category[] {
    return this._categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this._categories.find((c) => c.id === id);
  }

  async addCategory(name: string, color: string): Promise<Category> {
    const category: Category = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
    };
    this._categories.push(category);
    await this.persist();
    return category;
  }

  async updateCategory(id: string, name: string, color: string): Promise<void> {
    const cat = this._categories.find((c) => c.id === id);
    if (cat) {
      cat.name = name.trim();
      cat.color = color;
      await this.persist();
    }
  }

  async deleteCategory(id: string): Promise<void> {
    this._categories = this._categories.filter((c) => c.id !== id);
    await this.persist();
  }

  private async seedDefaults(): Promise<void> {
    const defaults: Category[] = [
      { id: 'cat-personal', name: 'Personal', color: '#3880ff' },
      { id: 'cat-work', name: 'Trabajo', color: '#eb445a' },
      { id: 'cat-shopping', name: 'Compras', color: '#2dd36f' },
    ];
    this._categories = defaults;
    await this.persist();
  }

  private async persist(): Promise<void> {
    await this.storage.set(this.STORAGE_KEY, this._categories);
  }
}
