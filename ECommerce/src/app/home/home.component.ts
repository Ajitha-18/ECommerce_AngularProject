import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductData } from '../static-data/product-data';
import { CategoryData } from '../static-data/category-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!: Product[];
  categories: Category[] = [];

  constructor (
    public authService: AuthService
  ) {}


  ngOnInit(): void {
    this.products = ProductData;
    this.categories = CategoryData;
  }


  }


