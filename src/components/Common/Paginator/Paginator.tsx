import React, { useState } from 'react'
import s from './Paginator.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
type PropsType = {
   totalCount: number | null,
   countFollowed: number,
   pageFollowed: number,
   onPageChange: (pageFollowed: number) => void
}
const Paginator: React.FC<PropsType> = ({ totalCount, countFollowed, pageFollowed, onPageChange }) => {
   let pagesCount = Math.ceil(totalCount as number / countFollowed)
   let pages: Array<number> = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }
   let portionSize = 1
   let portionsCount = Math.ceil(pagesCount / portionSize)
   let [portionNumber, setPortionNumber] = useState<number>(1)
   let leftPortionPageNumber = ((portionNumber - 1) * portionSize) + 1
   let rightPortionNumber = portionNumber * portionSize
   pages = pages
      .filter((el) => {
         return el >= leftPortionPageNumber && el <= rightPortionNumber
      })
   return (
      <div className={s.paginationClassic}>
         <div className={s.paginationClassic__row}>
            <div className={s.paginationClassic__buttonLeft}>
               {portionNumber > 1
                  ? <FontAwesomeIcon className={s.paginationClassic__buttonAble} icon={faChevronLeft} onClick={() => { setPortionNumber(portionNumber - 1); onPageChange(pageFollowed -= 1) }} />
                  : <FontAwesomeIcon className={s.paginationClassic__buttonDisAble} icon={faChevronLeft} />
               }
            </div>
            <div className={s.paginationClassic__content}>{pages}</div>
            <div className={s.paginationClassic__buttonRight}>
               {portionNumber < portionsCount
                  ? <FontAwesomeIcon className={s.paginationClassic__buttonAble} icon={faChevronRight} onClick={() => { setPortionNumber(portionNumber + 1); onPageChange(pageFollowed += 1) }} />
                  : <FontAwesomeIcon className={s.paginationClassic__buttonDisAble} icon={faChevronRight} />
               }
            </div>
         </div>
      </div >

   )
}
export default Paginator