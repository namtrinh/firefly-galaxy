import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {CreateUserComponent} from './admin/manage-user/create-user/create-user.component';
import {ListComponent} from './admin/manage-user/list-user/list.component';
import {UserDetailsComponent} from './admin/manage-user/user-details/user-details.component';
import {LoginComponent} from './auth/login/login.component';
import {EditUserComponent} from './admin/manage-user/edit-user/edit-user.component';
import {ListRoleComponent} from './admin/manage-role/list-role/list-role.component';
import {CreateRoleComponent} from './admin/manage-role/create-role/create-role.component';
import {EditRoleComponent} from './admin/manage-role/edit-role/edit-role.component';
import {ListPermissionComponent} from './admin/manage-permission/list-permission/list-permission.component';
import {RegistryComponent} from './auth/registry/registry.component';
import {ViewAdminComponent} from './admin/view-admin/view-admin.component';
import {ViewHomeComponent} from './home/view-home/view-home.component';
import {EditMyInfComponent} from './home/edit-user/edit-user.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {ListUserByroleComponent} from './admin/manage-role/list-user-byrole/list-user-byrole.component';
import {ListProductComponent} from './admin/manage-product/list-product/list-product.component';
import {CreateProductComponent} from './admin/manage-product/create-product/create-product.component';
import {EditProductComponent} from './admin/manage-product/edit-product/edit-product.component';
import {ListCategoryComponent} from './admin/manage-category/list-category/list-category.component';
import {CreateCategoryComponent} from './admin/manage-category/create-category/create-category.component';
import {EditCategoryComponent} from './admin/manage-category/edit-category/edit-category.component';
import {PayFailComponent} from './payment/pay-fail/pay-fail.component';
import {PaySuccessComponent} from './payment/pay-success/pay-success.component';
import {MyInfComponent} from './home/detail-user/user-details.component';
import {DetailProductComponent} from './home/detail-product/detail-product.component';

import {ProductSaleComponent} from './home/product-sale/product-sale.component';

import {AuthCodeComponent} from './auth/auth-code/auth-code.component';
import {TestComponent} from './test/test.component';
import {CartComponent} from './home/cart/cart.component';
import {ProductByCategoryComponent} from './home/product-by-category/product-by-category.component';
import {FooterComponent} from './home/footer/footer.component';
import {AuthService} from './service/auth-service.service';
import {_401Component} from './401/401.component';
import {ProductExtendComponent} from './home/product-extend/product-extend.component';
import {RequiredResetPasComponent} from "./auth/required-reset-pass/required-reset-pas.component";
import {ResetPassComponent} from "./auth/reset-pass/reset-pass.component";
import {PromotionProductComponent} from './admin/manage-product/promotion-product/promotion-product.component';
import {ListPromotionComponent} from "./admin/manage-promotion/list-promotion/list-promotion.component";
import {CreatePromotionComponent} from "./admin/manage-promotion/create-promotion/create-promotion.component";
import {UpdatePromotionComponent} from "./admin/manage-promotion/update-promotion/update-promotion.component";
import {RouteGuard} from "./route-guard.guard";
import {Test1Component} from "./test/test1.component";
import {ListOrderComponent} from "./admin/manage-invoice/list-order/list-order.component";
import {OrderDetailComponent} from "./admin/manage-invoice/order-detail/order-detail.component";

export const routes: Routes = [
  { path: 'product/:id/ratings', component: RatingComponent }, //Rating
  //Test View
  {path: 'a', component: TestComponent},
  {path: 'b', component: Test1Component},

  //Auth
  {path: 'login', component: LoginComponent},
  {path: 'registry', component: RegistryComponent, canActivate: [RouteGuard]},
  {path: 'verify-code', component: AuthCodeComponent, canActivate: [RouteGuard]},
  {path: 'forgot-password', component: RequiredResetPasComponent, canActivate: [RouteGuard]},
  {path: 'reset-password', component: ResetPassComponent},

  //View Client
  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '', component: ViewHomeComponent, children: [
      {path: '', component: ProductSaleComponent},

      {path: 'b', component: ProductExtendComponent},
      {path: 'category/:seotitle/:seotitle', component: DetailProductComponent},
      {path: 'myinf/:user_id', component: MyInfComponent},
      {path: 'edit_my_inf/:user_id', component: EditMyInfComponent},
      {path: 'cart', component: CartComponent},
      {path: 'category/:seotitle', component: ProductByCategoryComponent},
    ]
  },

  {
    path: 'admin', component: ViewAdminComponent, canActivate: [AuthService], data: {role: 1}, children: [

      //User
      {path: 'list-user', component: ListComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'create-user', component: CreateUserComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'user-details/:user_id', component: UserDetailsComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'edit-user/:user_id', component: EditUserComponent, canActivate: [AuthService], data: {role: 1}},

      //Product
      {path: 'product', component: ListProductComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'promotion-product', component: PromotionProductComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'create-product', component: CreateProductComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'edit-product/:product_id', component: EditProductComponent, canActivate: [AuthService], data: {role: 1}},

      //Promotion
      {path: 'promotion', component: ListPromotionComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'create-promotion', component: CreatePromotionComponent, canActivate: [AuthService], data: {role: 1}},
      {
        path: 'update-promotion/:promotion_id',
        component: UpdatePromotionComponent,
        canActivate: [AuthService],
        data: {role: 1}
      },

      //Category
      {path: 'category', component: ListCategoryComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'create-category', component: CreateCategoryComponent, canActivate: [AuthService], data: {role: 1}},
      {
        path: 'edit-category/:category_id',
        component: EditCategoryComponent,
        canActivate: [AuthService],
        data: {role: 1}
      },

      //Invoice
      {path: 'list-orders', component: ListOrderComponent, canActivate: [AuthService], data: {role: 1}},
      {path: 'detail-order/:order_detail_id', component: OrderDetailComponent, canActivate: [AuthService], data: {role: 1}},

      //Role
      {
        path: 'role', component: ListRoleComponent, children: [
          {path: 'edit-role/:name', component: EditRoleComponent},
          {path: 'create-role', component: CreateRoleComponent},
          {path: 'get-user-byrole:/:name', component: ListUserByroleComponent},
        ]
      },

      //Permission
      {path: 'list-permission', component: ListPermissionComponent},

      // Home admin
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthService], data: {role: 1}},
    ]
  },

  //Payment
  {path: 'payment-fail', component: PayFailComponent},
  {path: 'payment-success', component: PaySuccessComponent},

  //Forbiden
  {path: '???', component: _401Component}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {
}

function get(): import("@angular/router").Route {
  throw new Error('Function not implemented.');
}

