import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbAddComponent } from './db-add/db-add.component';
import { DbGetComponent } from './db-get/db-get.component';
import { DbUpdateComponent } from './db-update/db-update.component';

const routes: Routes = [
  {
  path: 'database/create',
  component: DbAddComponent
  },
  {
    path: 'database/update/:id',
    component: DbUpdateComponent
  },
  {
    path: 'database',
    component: DbGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
