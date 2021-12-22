import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainCustomersComponent } from './components/main-customers/main-customers.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainProductsComponent } from './components/main-products/main-products.component';
import { MainShopComponent } from './components/main-shop/main-shop.component';
import { MainStockComponent } from './components/main-stock/main-stock.component';
import { MainProvidersComponent } from './components/main-providers/main-providers.component';
import { MainInvoicesComponent } from './components/main-invoices/main-invoices.component';
import { ListInvoiceComponent } from './components/main-invoices/list-invoice/list-invoice.component';
import { InvoiceFilterComponent } from './components/main-invoices/invoice-filter/invoice-filter.component';
import { InvoiceFormComponent } from './components/main-invoices/invoice-form/invoice-form.component';
import { CustomersFormComponent } from './components/main-customers/customers-form/customers-form.component';
import { UpdateFormComponent } from './components/main-customers/update-form/update-form.component';
import { ListCustomersComponent } from './components/main-customers/list-customers/list-customers.component';
import { ProductFormComponent } from './components/main-products/product-form/product-form.component';
import { ListProductComponent } from './components/main-products/list-product/list-product.component';
import { InvoiceComponent } from './components/main-invoices/invoice/invoice.component';
import { ListRayonComponent } from './components/main-shop/list-rayon/list-rayon.component';
import { AddRayonComponent } from './components/main-shop/add-rayon/add-rayon.component';
import { DetailProduitComponent } from './components/main-products/detail-produit/detail-produit.component';
import { DetailClientComponent } from './components/main-customers/detail-client/detail-client.component';
import { ProduitAcheteParClientComponent } from './components/main-customers/produit-achete-par-client/produit-achete-par-client.component';
import { AddstockComponent } from './components/main-stock/addstock/addstock.component';
import { DetailStockComponent } from './components/main-stock/detail-stock/detail-stock.component';
import { PageStockComponent } from './components/main-stock/page-stock/page-stock.component';


const routes: Routes = [
  {path: '', component: MainPageComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'customers', component: MainCustomersComponent, children: [
      {path: '', component: ListCustomersComponent},
      {path: 'addcustomer', component: CustomersFormComponent},
      {path: 'updatecustomer/:id"', component: UpdateFormComponent}
    ]},
    {path: 'addcustomer', component: CustomersFormComponent},
    {path: 'customers/:idclient', component: DetailClientComponent },
    {path: 'ProduitByClient/:idclient/:idFacture', component: ProduitAcheteParClientComponent },
    {path: 'updatecustomer"', component: UpdateFormComponent},


    {path: 'products', component: MainProductsComponent, children: [
      {path: '', component: ListProductComponent},
      {path: 'addProduct', component: ProductFormComponent},
      {path: 'detailproduit', component: DetailProduitComponent}
    ]},
    {path: 'stock', component: PageStockComponent, children: [
      {path: '', component: MainStockComponent},
      {path: "addstock", component: AddstockComponent},
      {path:"details", component:DetailStockComponent },
    ]},
    {path: 'shop', component: MainShopComponent, children: [
      {path: '', component: ListRayonComponent},
      {path: 'addRayon', component: AddRayonComponent},
    ]},
    {path: 'providers', component: MainProvidersComponent},
    {path: 'invoices', component: MainInvoicesComponent, children: [
      {path: '', component: ListInvoiceComponent},
      {path: 'addInvoice', component: InvoiceFormComponent},
      {path: 'showInvoice/:id', component: InvoiceComponent}
    ]},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
