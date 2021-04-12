import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from '../../../../../services/apis-call/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'gts-fe-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {

  ACTION;
  formGroup: FormGroup;
  product;
  id;

  constructor(
      private api: API,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === 'new') {
      this.ACTION = 'NEW';
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: [''],
        price: [0, [Validators.required]],
        imageUrl: [''],
        quantity: [0, [Validators.required]]
      });
    } else {
      this.ACTION = 'EDIT';
      this.formGroup = this.formBuilder.group({
        id: [0],
        name: ['', [Validators.required]],
        description: [''],
        price: [0, [Validators.required]],
        imageUrl: [''],
        quantity: [0, [Validators.required]]
      });
      this.loadEdit();
    }
  }
  private loadEdit() {
    this.api.getProductById(this.id).subscribe(product => {
      this.product = product;
      this.formGroup.patchValue(this.product);
    })
  }

  onSubmit() {
    if (this.ACTION === 'NEW') {
      this.api.createProduct(this.formGroup.value).subscribe(next => {
        this.router.navigate(['admin/product']);
      })
    } else {
      this.api.updateProduct(this.id, this.formGroup.value).subscribe(next => {
        this.router.navigate(['admin/product']);
      })
    }
  }

  onCancel() {
    this.router.navigate(['admin/product']);
  }

}
