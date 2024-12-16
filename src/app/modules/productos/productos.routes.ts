import { Routes } from "@angular/router";
import { ProductosComponent } from "./productos.component";
import { ProductDetailComponent } from "./pages/productDetail/productDetail.component";

export const routes: Routes=[
    {
        path:"",
        component: ProductosComponent
    },
    {
        path:":id",
        component: ProductDetailComponent
    },


]