import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';


const routes: Routes = [
	{ path: '', redirectTo: '/rooms/create', pathMatch: 'full' },
	{ path: 'rooms/create', component: CreateRoomComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
