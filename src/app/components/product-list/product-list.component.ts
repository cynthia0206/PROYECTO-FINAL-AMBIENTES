import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import type { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() key: number = 0;
  @Output() editProduct = new EventEmitter<Product>();

  products: Product[] = [];
  searchTerm: string = '';
  selectedBrand: string = '';
  selectedCategory: string = '';
  showDeleteConfirm: boolean = false;
  productToDeleteId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['key']) {
      this.products = this.productService.getProducts();
    }
  }

  toggleFavorite(product: Product, event: Event) {
    event.stopPropagation();
    product.favorited = !product.favorited;
  }

  filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = this.searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesBrand = this.selectedBrand === '' || product.brand === this.selectedBrand;
      const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    });
  }

  delete(id: number) {
    this.productToDeleteId = id;
    this.showDeleteConfirm = true;
  }

  confirmDelete() {
    if (this.productToDeleteId !== null) {
      this.productService.deleteProduct(this.productToDeleteId);
      this.products = this.productService.getProducts();
    }
    this.showDeleteConfirm = false;
    this.productToDeleteId = null;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.productToDeleteId = null;
  }

  edit(product: Product) {
    this.editProduct.emit(product);
  }
}
