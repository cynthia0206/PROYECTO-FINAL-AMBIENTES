
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import type { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beautystore';
  showModal = false;
  editingProduct: Product | null = null;
  listKey = 0;

  openNewProductModal() {
    this.editingProduct = null;
    this.showModal = true;
  }

  openEditProductModal(product: Product) {
    this.editingProduct = { ...product };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
  }

  refreshList() {
    this.listKey++;
  }
}
