import { Photo } from "@prisma/client";
import useSWRInfinite from "swr/infinite";

const usePagination = <T>(url: string, pageSize: number) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${url}/?skip=${pageIndex * pageSize}&take=${pageSize}`;
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, setSize, size, mutate } = useSWRInfinite<T[]>(
    getKey,
    fetcher
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);

  return {
    data,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    setSize,
    size,
    mutate
  };
};

export default usePagination;
