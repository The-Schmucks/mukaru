import type IMiddleware from '$lib/types/shared/IMiddleware';
import { redirect, type Redirect, type RequestEvent } from '@sveltejs/kit';

class Middleware {
	#list: Array<IMiddleware>;

	#event: RequestEvent;

	constructor({ event, list }: { event: RequestEvent; list: Array<IMiddleware> }) {
		this.#event = event;
		this.#list = list;
	}

	/**
	 * @throws {Redirect}
	 */
	abort({ url, route = 'login', prev = false }: Parameters<Parameters<IMiddleware>['0']['abort']>['0']): never {
		prev = prev ? prev : url.pathname + url.search;
		redirect(302, `/${route}?from=${prev}`);
	}

	async run() {
		for (let i = 0; i < this.#list.length; i++) {
			await this.#list[i]({ event: this.#event, abort: this.abort });
		}
	}
}

export default Middleware;
