export default interface IError<P>
	extends Record<'message', string>,
		Record<'errors', { [T in keyof P]?: string[] }> {
	[key: string | number | symbol]: unknown;
}
