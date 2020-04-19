import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    // { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m=>m.RecipesModule) },    
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    // { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule) }
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }