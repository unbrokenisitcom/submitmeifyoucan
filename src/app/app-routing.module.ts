import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimateFormComponent } from './animate-form/animate-form.component';

const routes: Routes = [
    { path: '', component: AnimateFormComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
