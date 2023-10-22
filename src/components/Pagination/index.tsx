import { SHOW_PAGE_NATION_COUNT } from "@/constants/const";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type Props = {
  pageCount: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  handleClicKPageRouter: (count: number) => any
}

export const PagiNation = ({ pageCount, currentPage, setCurrentPage, handleClicKPageRouter }: Props) => {
  const router = useRouter();

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;
  // 表示に関するロジック
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(SHOW_PAGE_NATION_COUNT, pageCount)
  }

  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = pageCount - (SHOW_PAGE_NATION_COUNT - 1);
  }

  // pagination生成
  let liArray = [];
  for(let i = startPage; i < endPage + 1; i++) {
    const li = (
      <li
        key={i} 
        onClick={() => handleClicKPageRouter(i)}
        className={`rounded-full flex items-center justify-center w-8 h-8 ${i === currentPage && 'bg-pink-color text-white'}`}
      >
        {i}
      </li>
    )
    liArray.push(li)
  }

  if (pageCount === 0) return <></>
  return (
    <ul className="flex space-x-4 my-8">
      { liArray }
    </ul>
  )
}