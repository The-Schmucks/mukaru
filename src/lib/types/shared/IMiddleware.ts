import type { RequestEvent } from '@sveltejs/kit';

type IMiddlware = (params: {
	event: RequestEvent;
	abort: (params: { url: URL; route?: string; prev?: false | string }) => never;
}) => void;

export default IMiddlware;
