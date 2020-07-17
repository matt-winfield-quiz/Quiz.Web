export enum SignalRMethod {
	// Client -> Server
	CreateRoom = 'CreateRoom',
	JoinRoom = 'JoinRoom',
	Buzz = 'Buzz',
	UpdateUsername = "UpdateUsername",

	// Server -> Client
	RoomCreated = 'RoomCreated',
	UserJoinRoomSuccess = 'UserJoinRoomSuccess',
	UserJoinRoomFail = 'UserJoinRoomFail',
	UserJoinedRoom = 'UserJoinedRoom',
	UserLeftRoom = 'UserLeftRoom',
	BuzzerPressed = 'BuzzerPressed',
	UserUpdatedName = 'UserUpdatedName'
}