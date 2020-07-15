import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { ConfigService } from './services/config/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export function load(config: ConfigService) {
	return () => config.load();
}

@NgModule({
	declarations: [
		AppComponent,
		RoomComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule
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
