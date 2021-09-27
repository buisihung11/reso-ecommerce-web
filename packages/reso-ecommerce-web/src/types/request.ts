export type BaseResponse<T> = {
  data: T[];
  metadata: {
    page: number;
    size: number;
    total: number;
  };
};

export type TRequestPaging = {
  page?: number;
  size?: number;
};
