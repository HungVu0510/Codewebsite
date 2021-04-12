import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from '../../../../../services/apis-call/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'gts-fe-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit {
  ACTION;
  formGroup: FormGroup;
  order;
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
        userId: ['', [Validators.required]],
        productId: [''],
        quantity: [0, [Validators.required]]
      });
    } else {
      this.ACTION = 'EDIT';
      this.formGroup = this.formBuilder.group({
        id: [0],
        userId: ['', [Validators.required]],
        productId: [''],
        quantity: [0, [Validators.required]]
      });
      this.loadEdit();
    }
  }
  private loadEdit() {
    this.api.getOrderById(this.id).subscribe(order => {
      this.order = order;
      this.formGroup.patchValue(this.order);
    })
  }

  onSubmit() {
    if (this.ACTION === 'NEW') {
      this.api.createOrder(this.formGroup.value).subscribe(next => {
        this.router.navigate(['admin/order']);
      })
    } else {
      this.api.updateOrder(this.id, this.formGroup.value).subscribe(next => {
        this.router.navigate(['admin/order']);
      })
    }
  }

  onCancel() {
    this.router.navigate(['admin/order']);
  }

}
