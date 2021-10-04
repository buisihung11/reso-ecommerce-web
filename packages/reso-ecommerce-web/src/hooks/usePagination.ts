import { useCallback, useState } from 'react';

type Props = {
  initValues?: {
    page?: number;
    size?: number;
    total?: number;
  };
};

const usePagination = ({ initValues }: Props) => {
  const [page, setPage] = useState(initValues?.page ?? 1);
  const [size, setSize] = useState(initValues?.size ?? 20);
  const totalPage = Math.floor((initValues?.total ?? 100) / size);
  const onPageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const onNextPage = useCallback(() => {
    if (page + 1 < totalPage) {
      setPage(page + 1);
    }
  }, [totalPage]);

  const onPreviousPage = useCallback(() => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  }, [totalPage]);

  const onSizeChange = useCallback((size: number) => {
    setSize(size);
  }, []);

  return {
    page,
    size,
    onPageChange,
    onNextPage,
    onPreviousPage,
    onSizeChange,
  };
};

export default usePagination;
