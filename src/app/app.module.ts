import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IonicModule } from '@ionic/angular';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainCustomersComponent } from './components/main-customers/main-customers.component';
import { MainProductsComponent } from './components/main-products/main-products.component';
import { MainStockComponent } from './components/main-stock/main-stock.component';
import { MainShopComponent } from './components/main-shop/main-shop.component';
import { MainProvidersComponent } from './components/main-providers/main-providers.component';
import { MainInvoicesComponent } from './components/main-invoices/main-invoices.component';
import { ListInvoiceComponent } from './components/main-invoices/list-invoice/list-invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceFilterComponent } from './components/main-invoices/invoice-filter/invoice-filter.component';
import { InvoiceFormComponent } from './components/main-invoices/invoice-form/invoice-form.component';
import { InvoiceDetailFormComponent } from './components/main-invoices/invoice-detail-form/invoice-detail-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/main-invoices/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { CustomersFormComponent } from './components/main-customers/customers-form/customers-form.component';
import { UpdateFormComponent } from './components/main-customers/update-form/update-form.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ListCustomersComponent } from './components/main-customers/list-customers/list-customers.component';
import { ListProductComponent } from './components/main-products/list-product/list-product.component';
import { ProductFormComponent } from './components/main-products/product-form/product-form.component';
import { ListProvidersComponent } from './components/main-providers/list-providers/list-providers.component';
import { AddProvidersComponent } from './components/main-providers/add-providers/add-providers.component';
import { EditProvidersComponent } from './components/main-providers/edit-providers/edit-providers.component';
import { InvoiceComponent } from './components/main-invoices/invoice/invoice.component';
import { ListRayonComponent } from './components/main-shop/list-rayon/list-rayon.component';
import { AddRayonComponent } from './components/main-shop/add-rayon/add-rayon.component';
import { EditRayonComponent } from './components/main-shop/edit-rayon/edit-rayon.component';
import { ConfirmDialogModule } from './components/shared/confirm-dialog/confirm-dialog.module';

import { NgxPrintModule } from 'ngx-print';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailClientComponent } from './components/main-customers/detail-client/detail-client.component';
import { ProduitAcheteParClientComponent } from './components/main-customers/produit-achete-par-client/produit-achete-par-client.component';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductModifyComponent } from './components/main-products/product-modify/product-modify.component';
import { AddstockComponent } from './components/main-stock/addstock/addstock.component';
import { EditstockComponent } from './components/main-stock/editstock/editstock.component';
import { DetailStockComponent } from './components/main-stock/detail-stock/detail-stock.component';
import { PageStockComponent } from './components/main-stock/page-stock/page-stock.component';
import { DetailProduitComponent } from './components/main-products/detail-produit/detail-produit.component';
  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    DashboardComponent,
    MainPageComponent,
    MainCustomersComponent,
    MainProductsComponent,
    MainStockComponent,
    MainShopComponent,
    MainProvidersComponent,
    MainInvoicesComponent,
    ListInvoiceComponent,
    InvoiceFilterComponent,
    InvoiceFormComponent,
    InvoiceDetailFormComponent,
    BreadcrumbComponent,
    CustomersFormComponent,
    UpdateFormComponent,
    ListCustomersComponent,
    ListProductComponent,
    ProductFormComponent,
    ListProvidersComponent,
    AddProvidersComponent,
    EditProvidersComponent,
    InvoiceComponent,
    ListRayonComponent,
    AddRayonComponent,
    EditRayonComponent,
    DetailClientComponent,
    ProduitAcheteParClientComponent,
    ProductModifyComponent,
    AddstockComponent,
    EditstockComponent,
    DetailStockComponent,
    PageStockComponent,
    DetailProduitComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    AccordionModule,
    NgxPaginationModule,
    MenuModule,
    NgbModule,
    IonicModule.forRoot(),
    NgbModule,
    NgxPrintModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgApexchartsModule,
    NgChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
