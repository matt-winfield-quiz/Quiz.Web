import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';
import { ApplicationUrls } from './ApplicationUrls';
import { RoomsComponent } from './rooms/rooms/rooms.component';


const routes: Routes = [
	{ path: '', redirectTo: ApplicationUrls.Rooms, pathMatch: 'full' },
	{ path: ApplicationUrls.Rooms, component: RoomsComponent },
	{ path: ApplicationUrls.CreateRoom, component: CreateRoomComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
