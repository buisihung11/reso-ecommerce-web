export type BaseReponse<T> = {
  data: T[];
  metadata: {
    page: number;
    size: number;
    total: number;
  };
};

export type ErrorResponse = {
  error: {
    message: string;
    reason: string;
  };
};
