import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomComponent } from './create-room.component';

describe('RoomComponent', () => {
	let component: CreateRoomComponent;
	let fixture: ComponentFixture<CreateRoomComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateRoomComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateRoomComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
