import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path:'',
    component: FormComponent
  },
  {
    path:'knnmap',
    component:MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
