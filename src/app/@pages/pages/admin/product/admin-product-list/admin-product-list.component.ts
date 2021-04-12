import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {API} from '../../../../../services/apis-call/api.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'gts-fe-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'price', 'quantity', 'edit'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;

  products;
  data = [];

  constructor(
      private api: API,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.data = [];
    this.api.getAllProduct().subscribe(products => {
      this.products = products;
      for (const product of this.products) {
        const d = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: product.quantity
        };
        this.data.push(d);
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  newItem() {
    this.router.navigate(['/admin/product/new']);
  }

  edit(productId: any) {
    this.router.navigate(['/admin/product/' + productId]);
  }

}
