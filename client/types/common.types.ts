export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export type ActionStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';
