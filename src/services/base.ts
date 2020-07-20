export interface ListQueryContainer<T> {
  count: number;
  next: string;
  previous: string;
  page:number;
  pageSize:number;
  result: T[];
}


export interface ApiErrorResponse {
  code:string,
  reason:string
  success:boolean
}
