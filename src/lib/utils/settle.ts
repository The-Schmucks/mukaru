import type IError from '$lib/types/shared/IError';
import { fail } from '@sveltejs/kit';

const settle = async <T = any, D = any>({
	response,
	validation,
	done
}: {
	response: Response;
	validation: (data: IError<T>) => Record<string, IError<T>>;
	done?: (data: D) => Record<string, any>;
}) => {
	if ([400, 422].includes(response.status)) {
		const data = await response.json();
		return fail(response.status, {
			...validation(data)
		});
	} else if (![200, 204].includes(response.status)) {
		throw Error('Something wrong with the api');
	}

	const data = (await response.json()) as D;
	return done === undefined ? { success: true } : done(data);
};

export default settle;
