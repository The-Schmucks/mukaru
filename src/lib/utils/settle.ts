import type { AxiosResponse } from 'axios';

const settle = <T extends AxiosResponse>({
	object,
	defaults
}: {
	object: PromiseSettledResult<T>;
	defaults: Array<keyof T['data']>;
}): T['data'] => {
	if (object.status === 'fulfilled') return object.value.data;
	else return Object.fromEntries(defaults.map((k) => [k, '']));
};

export default settle;
