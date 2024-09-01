import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';

const routes: Routes = [
  { path: '', component: PokeListComponent },
  { path: 'pokemon/:name', component: PokeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
