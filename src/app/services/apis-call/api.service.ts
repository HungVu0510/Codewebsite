import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class API {
    public token: String;

    constructor(private http: HttpClient) {

    }

    getAllUser() {
        return this.http.get(environment.apiUrl + `users`, {});
    }

    getUserById(id) {
        return this.http.get(environment.apiUrl + `users/` + id, {});
    }

    getAllProduct() {
        return this.http.get(environment.apiUrl + `products`, {});
    }

    getProductById(id) {
        return this.http.get(environment.apiUrl + `products/` + id, {});
    }

    getAllOrder() {
        return this.http.get(environment.apiUrl + `orders`, {});
    }

    getOrderById(id) {
        return this.http.get(environment.apiUrl + `orders/` + id, {});
    }

    signup(value: any) {
        return this.http.post(environment.apiUrl + `users`, value);
    }

    createProduct(value: any) {
        return this.http.post(environment.apiUrl + `products`, value);
    }

    createOrder(value: any) {
        return this.http.post(environment.apiUrl + `orders`, value);
    }

    updateUser(id, value: any) {
        return this.http.patch(environment.apiUrl + `users/` + id, value);
    }

    updateProduct(id, value: any) {
        return this.http.patch(environment.apiUrl + `products/` + id, value);
    }

    updateOrder(id, value: any) {
        return this.http.patch(environment.apiUrl + `orders/` + id, value);
    }
}
