export default interface IError<P>
	extends Record<'message', string>,
		Record<'errors', { [T in keyof P]?: string[] } | undefined>,
		Record<'data', { [T in keyof P]?: string } | undefined> {}
