import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
	{ path: '', redirectTo: '/rooms', pathMatch: 'full' },
	{ path: 'rooms', component: RoomComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
