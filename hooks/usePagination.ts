import { PhotoQuery } from "@mytypes/prisma.types";
import useSWRInfinite from "swr/infinite";
import { fetcher, _getKeyValue_ } from "utils";

const usePagination = <T>(
  url: string,
  pageSize: number,
  query?: PhotoQuery
) => {

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    
    let queryString = "";
    if (query && query != undefined)
      for (let key of Object.keys(query)) {
        const value = _getKeyValue_(key)(query);
        if (value && value != undefined && value != "")
          queryString = queryString + `&${key}=${value}`;
      }

    return `${url}/?skip=${
      pageIndex * pageSize
    }&take=${pageSize}${queryString}`;
  };

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
