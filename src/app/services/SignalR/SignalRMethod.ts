export enum SignalRMethod {
	// Client -> Server
	CreateRoom = 'CreateRoom',
	JoinRoom = 'JoinRoom',
	Buzz = 'Buzz',
	UpdateUsername = 'UpdateUsername',
	ClearScores = 'ClearScores',
	RemoveRoom = 'RemoveRoom',
	IncrementUserScore = 'IncrementUserScore',
	DecrementUserScore = 'DecrementUserScore',

	// Server -> Client
	RoomCreateSuccess = 'RoomCreateSuccess',
	RoomCreated = 'RoomCreated',
	UserJoinRoomSuccess = 'UserJoinRoomSuccess',
	UserJoinRoomFail = 'UserJoinRoomFail',
	UserJoinedRoom = 'UserJoinedRoom',
	UserLeftRoom = 'UserLeftRoom',
	BuzzerPressed = 'BuzzerPressed',
	BuzzerPressSuccess = 'BuzzerPressSuccess',
	UserUpdatedName = 'UserUpdatedName',
	ScoresCleared = 'ScoresCleared',
	RoomClosed = 'RoomClosed',
	InvalidJwtToken = 'InvalidJwtToken',
	UserScoreUpdated = 'UserScoreUpdated'
}