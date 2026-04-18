import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Labial Matte',
      brand: 'Maybelline',
      price: 18,
      category: 'Labial',
      image: 'https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//y/v/yves-saint-laurent-rouge-pur-couture-satin-color-lipstick-r13-rouge-calls-3-8g_1.jpg',
      favorited: false
    },
    {
      id: 2,
      name: 'Base 24h',
      brand: 'L\'Oréal',
      price: 29,
      category: 'Base',
      image: 'https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//m/-/m-a-c-cosmetics-prep-prime-face-protect-lotion-spf50-30ml.jpg',
      favorited: false
    },
    {
      id: 3,
      name: 'Eye Shadow x9',
      brand: 'MAC',
      price: 49,
      category: 'Sombras',
      image: 'https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//m/a/makeup-revolution-i-heart-revolution-nudes-chocolate-palette.jpg',
      favorited: false
    },
    {
      id: 4,
      name: 'Blush Subtil',
      brand: 'L\'Oréal',
      price: 22,
      category: 'Rubor',
      image: 'https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//y/v/yves-saint-laurent-make-me-blush-bold-blurring-blush-06-rose-haze-6g_1.jpg',
      favorited: false
    },
    {
      id: 5,
      name: 'Lipstick',
      brand: 'MAC',
      price: 39,
      category: 'Labial',
      image: 'https://static.beautytocare.com/cdn-cgi/image/width=600,height=600,f=auto/media/catalog/product/m/a/maybelline-superstay-matte-ink-liquid-lipstick-15-lover-5ml.jpg',
      favorited: false
    },
    {
      id: 6,
      name: 'Base mate',
      brand: 'Maybelline',
      price: 21,
      category: 'Base',
      image: 'https://static.beautytocare.com/cdn-cgi/image/width=600,height=600,f=auto/media/catalog/product/m/a/maybelline-fit-me-matte-poreless-foundation-110-porcelain-30ml_1.jpg',
      favorited: false
    }
  ];
    private editingProduct: Product | null = null;
  setEditingProduct(product: Product | null) {
    this.editingProduct = product ? { ...product } : null;
  }

  getEditingProduct() {
    return this.editingProduct;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    product.id = new Date().getTime();
    this.products.push(product);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }
}
