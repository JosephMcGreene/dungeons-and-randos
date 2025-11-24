export type DnDItem = {
	index: string;
	name: string;
	url: string;
};

export type APIData = {
	count: number;
	results: DnDItem[];
};

export type AxiosResponse = {
	config: object;
	data: APIData;
	headers: object;
	status: number;
	statusText: string;
};
