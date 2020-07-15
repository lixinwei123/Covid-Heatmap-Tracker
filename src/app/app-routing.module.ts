import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full'
  },
  {
    path: 'app/:id',
    loadChildren: () => import('./map-home-screen/map-home-screen.module').then( m => m.MapHomeScreenModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
