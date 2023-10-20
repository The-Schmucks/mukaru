export default interface IPaginate<T> {
	data: T[];
	path: string;
	per_page: number;
	next_cursor: string | null;
	next_page_url: string | null;
	prev_cursor: string | null;
	prev_page_url: string | null;
}

export const IPaginateKeys = [
	'data',
	'next_cursor',
	'next_page_url',
	'path',
	'per_page',
	'prev_cursor',
	'prev_page_url'
];
