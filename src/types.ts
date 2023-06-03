export interface Paginator {
  page: number;
  perPage: number;
  lastPage: number;
  count: number;
}

export interface PaginatedData<T> {
  rows: T[];
  paginator: Paginator;
}

interface ResolverParams {
  page: number;
  abortSignal: AbortSignal;
}

export type KeyableField<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends string | number | symbol ? K : never;
}[keyof T];

export type Resolver<T> = (params: ResolverParams) => Promise<PaginatedData<T>>;

export interface Classes {
  row: string;
  rowSelected: string;
}
