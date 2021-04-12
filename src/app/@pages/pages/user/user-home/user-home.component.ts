import {Component, OnInit} from '@angular/core';
import {API} from '../../../../services/apis-call/api.service';
import {AuthService} from '../../../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {ProductDetailComponent} from '../product-detail/product-detail.component';

@Component({
    selector: 'gts-fe-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

    user;
    cart;
    products;
    searchText;

    constructor(
        private api: API,
        private authService: AuthService,
        private router: Router,
        public dialog: MatDialog
        ) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('userProfile'));
        this.cart = JSON.parse(localStorage.getItem('cart'));
        if (this.cart === null) {
            this.cart = [];
        }
        console.log(this.cart);
        this.api.getAllProduct().subscribe(products => {
            this.products = products;
        });
    }

    getPriceFormat(price: any) {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
        });
    }

    calculateDiscount(price: any, discountPrice: any) {
        return ((price - discountPrice) / price * 100).toFixed(0);
    }

    logOut() {
        this.authService.logOut();
    }

    goToDetail(id) {
        this.router.navigate(['/user/product/' + id]);
    }

    removeElementFromCart(c) {
        const index = this.cart.indexOf(c);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}
