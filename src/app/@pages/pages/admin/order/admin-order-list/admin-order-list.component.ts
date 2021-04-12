import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {API} from '../../../../../services/apis-call/api.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {or} from '@progress/kendo-angular-grid/dist/es2015/utils';

@Component({
  selector: 'gts-fe-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {
  displayedColumns = ['id', 'userId', 'userName', 'userPhone', 'productId', 'productName', 'productPrice', 'quantity', 'edit'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;

  orders;
  user;
  product;
  data = [];

  constructor(
      private api: API,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.data = [];
    this.api.getAllOrder().subscribe(orders => {
      this.orders = orders;
      for (const order of this.orders) {
        this.api.getUserById(order.userId).subscribe(user => {
          this.api.getProductById(order.productId).subscribe(product => {
            this.user = user;
            this.product = product;
            const d = {
              id: order.id,
              userId: order.userId,
              userName: this.user.name,
              userPhone: this.user.phone,
              productId: order.productId,
              productName: this.product.name,
              productPrice: this.product.price,
              quantity: order.quantity
            };
            this.data.push(d);
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
          });
        });
      }
    });
  }

  newItem() {
    this.router.navigate(['/admin/order/new']);
  }

  edit(id: any) {
    this.router.navigate(['/admin/order/' + id]);
  }

}
