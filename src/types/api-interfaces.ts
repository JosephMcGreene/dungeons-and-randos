export interface DnDItem {
  index: string;
  name: string;
  url: string;
}

export interface APIData {
  count: number;
  results: DnDItem[];
}

export interface AxiosResponse {
  config: object;
  data: APIData;
  headers: object;
  status: number;
  statusText: string;
}
