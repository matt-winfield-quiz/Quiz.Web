import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/http/rooms.service';
import { Room } from 'src/app/models/Room';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-rooms',
	templateUrl: './rooms.component.html',
	styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
	public rooms: Room[];

	constructor(private _roomsService: RoomsService, private spinner: NgxSpinnerService) { }

	public async ngOnInit(): Promise<void> {
		this.spinner.show();
		this.rooms = await this._roomsService.getRooms();
		this.spinner.hide();
	}
}
