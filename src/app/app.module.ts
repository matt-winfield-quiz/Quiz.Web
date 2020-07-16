import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';
import { ConfigService } from './services/config/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms/rooms.component';
import { RoomComponent } from './rooms/room/room/room.component';

export function load(config: ConfigService) {
	return () => config.load();
}

@NgModule({
	declarations: [
		AppComponent,
		CreateRoomComponent,
		RoomsComponent,
		RoomComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		NgxSpinnerModule,
		ToastrModule.forRoot()
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: load,
			multi: true,
			deps: [ConfigService]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
