import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './pages/app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';
import { LoginComponent } from './pages/login/login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token.interceptor';
import { RupeeIconComponent } from './components/rupee-icon/rupee-icon.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterExtraService } from './services/routerExtraService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavBarComponent,
    FooterComponent,
    ProductComponent,
    CartComponent,
    LoginComponent,
    CheckoutComponent,
    RupeeIconComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthService,
    ApiService,
    CartService,
    RouterExtraService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
