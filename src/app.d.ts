// See https://kit.svelte.dev/docs/types#app

import type IUser from '$lib/types/models/user/IUser';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Pick<IUser, 'id' | 'email' | 'roles' | 'permissions' | 'profileCompletion' | 'avatar'> & {
				firstName: string;
				lastName: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
