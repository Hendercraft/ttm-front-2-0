import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {IsSignedInGuard} from './guard/is-signed-in.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)

  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'a-propos',
    loadChildren: () => import('./Pages/a-propos/a-propos.module').then( m => m.AProposPageModule)
  },
  {
    path: 'hommes',
    loadChildren: () => import('./Pages/hommes/hommes.module').then( m => m.HommesPageModule)
  },
  {
    path: 'architecture',
    loadChildren: () => import('./Pages/architecture/architecture.module').then( m => m.ArchitecturePageModule)
  },
  {
    path: 'urbanisme',
    loadChildren: () => import('./Pages/urbanisme/urbanisme.module').then( m => m.UrbanismePageModule)
  },
  {
    path: 'production',
    loadChildren: () => import('./Pages/production/production.module').then( m => m.ProductionPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[IsSignedInGuard]
  },
  {
    path: 'token-expired',
    loadChildren: () => import('./Pages/token-expired/token-expired.module').then( m => m.TokenExpiredPageModule)
  },
  {
    path: 'temoignage',
    loadChildren: () => import('./Pages/temoignage/temoignage.module').then( m => m.TemoignagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
