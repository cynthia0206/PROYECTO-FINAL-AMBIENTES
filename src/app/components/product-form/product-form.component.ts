
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import type { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() editingProduct: Product | null = null;
  @Output() formClosed = new EventEmitter<void>();
  form: FormGroup;
  editing: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';
  submitted: boolean = false;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.setFormFromInput();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingProduct']) {
      this.setFormFromInput();
    }
  }

  setFormFromInput() {
    if (this.editingProduct) {
      this.form.patchValue({ ...this.editingProduct });
      this.editing = true;
    } else {
      this.form.reset();
      this.editing = false;
    }
    this.submitted = false;
  }

  onBlur(field: string) {
    this.form.get(field)?.markAsTouched();
  }

  getErrorMsg(): string {
    const fields: { key: string; label: string }[] = [
      { key: 'name', label: 'Nombre' },
      { key: 'brand', label: 'Marca' },
      { key: 'price', label: 'Precio' },
      { key: 'category', label: 'Categoría' },
      { key: 'image', label: 'URL de imagen' }
    ];
    const missing = fields.filter(f => this.form.get(f.key)?.invalid).map(f => {
      const ctrl = this.form.get(f.key);
      if (ctrl?.errors?.['required']) return `${f.label} es requerido`;
      if (ctrl?.errors?.['min']) return `${f.label} debe ser mayor a 0`;
      return f.label;
    });
    if (missing.length === 0) return '';
    return 'No se puede guardar: ' + missing.join(', ') + '.';
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      this.errorMsg = this.getErrorMsg();
      this.successMsg = '';
      this.form.markAllAsTouched();
      return;
    }
    const { name, brand, price, category, image } = this.form.value;
    if (this.editing && this.editingProduct?.id) {
      const updatedProduct: Product = {
        ...this.editingProduct,
        name: name.trim(),
        brand: brand.trim(),
        price: Number(price),
        category: category.trim(),
        image: image.trim()
      };
      this.productService.updateProduct(updatedProduct);
      this.successMsg = '¡Producto editado exitosamente! ✨';
    } else {
      const newProduct: Product = {
        id: 0,
        name: name.trim(),
        brand: brand.trim(),
        price: Number(price),
        category: category.trim(),
        image: image.trim(),
        favorited: false
      };
      this.productService.addProduct(newProduct);
      this.successMsg = '¡Producto guardado exitosamente! 💄';
    }
    this.errorMsg = '';
    this.form.reset();
    this.editing = false;
    this.productService.setEditingProduct(null);
    setTimeout(() => this.successMsg = '', 2000);
    this.formClosed.emit();
  }

  cancelEdit() {
    this.form.reset();
    this.editing = false;
    this.productService.setEditingProduct(null);
    this.formClosed.emit();
  }
}
