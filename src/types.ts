export interface Paginator {
  page: number;
  perPage: number;
  last: number;
}

export interface PaginatedData<T> {
  rows: T[];
  paginator: Paginator;
}

interface ResolverParams {
  page: number;
  abortSignal: AbortSignal;
}

export type Resolver<T> = (params: ResolverParams) => Promise<PaginatedData<T>>;

export interface Classes {
  row: string;
}
