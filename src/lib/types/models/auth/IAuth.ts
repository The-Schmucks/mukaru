import type IError from '$lib/types/shared/IError';
import type IUser from '../user/IUser';

export interface IAuth {
	user?: Omit<IUser, 'password'>;
}

export interface ILoginRequest extends Pick<IUser, 'email' | 'password'> {}

export interface IRegisterRequest extends ILoginRequest {
	password_confirmation: string;
}

export interface ILoginResponse {
	token_type: string;
	expires_in: number;
	access_token: string;
	refresh_token: string;
}

export interface ILoginError extends IError<Pick<IUser, 'email' | 'password'>> {}
export interface IRegisterError extends IError<Pick<IUser, 'email' | 'password'> & { password_confirmation: string }> {}
