export interface UserAccount{
	id: number;
	username: string;
	password: string;
	email: string;
	country: string;
	nick: string;
	isVerified: boolean;
	isFilled: boolean;
}