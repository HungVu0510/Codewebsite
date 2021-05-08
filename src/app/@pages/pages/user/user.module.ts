import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [UserHomeComponent, ProductDetailComponent, PaymentComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        Ng2SearchPipeModule
    ]
})
export class UserModule { }
