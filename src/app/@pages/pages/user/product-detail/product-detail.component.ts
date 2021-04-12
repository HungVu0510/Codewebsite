import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {API} from '../../../../services/apis-call/api.service';

@Component({
  selector: 'gts-fe-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id;
  product;
  quantity = 0;
  cart;
  constructor(
      private route: ActivatedRoute,
      private api: API,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.quantity = 0;
    this.id = this.route.snapshot.paramMap.get('id');
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (this.cart === null) {
      this.cart = [];
    }
    this.api.getProductById(this.id).subscribe(product => {
      this.product = product;
      console.log(this.product);
    })
  }

  addProduct() {
    this.product.quantity = this.quantity;
    let contain = false;
    for (const c of this.cart) {
      if (c.id === this.product.id) {
        c.quantity += this.quantity;
        contain = true;
      }
    }
    if (!contain && this.quantity > 0) {
      this.cart.push(this.product);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.router.navigate(['/user/home']);
  }
}
