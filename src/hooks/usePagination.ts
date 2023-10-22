import { MAX_RENTAL_HOUSES_PER_REQUEST } from "@/constants/const";
import { useMemo, useState } from "react";

export const usePagination = (totalCount: number) => {
  const [ currentPage, setCurrentPage ] = useState(1);

  const pageCount = useMemo(() => {
    return Math.ceil(totalCount / MAX_RENTAL_HOUSES_PER_REQUEST)
  }, [totalCount]);

  return {
    currentPage,
    setCurrentPage,
    pageCount
  }
}