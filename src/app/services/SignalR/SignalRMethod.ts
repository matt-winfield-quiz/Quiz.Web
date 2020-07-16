export enum SignalRMethod {
	// Client -> Server
	CreateRoom = 'CreateRoom',
	JoinRoom = 'JoinRoom',

	// Server -> Client
	RoomCreated = 'RoomCreated',
	UserJoinRoomSuccess = 'UserJoinRoomSuccess',
	UserJoinRoomFail = 'UserJoinRoomFail'
}