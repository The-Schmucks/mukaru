export default interface IToken {
	id: string;
	revoked: string;
	created_at: string;
	activity?: ITokenActivity;
}

export interface ITokenActivity {
	access_token_id: string;
	refresh_token_id: string;
	type: string;
	ip_address: string;
	browser_agent: string;
	latitude: string;
	longitude: string;
	region: string;
	city: string;
	country: string;
	postal: string;
}
