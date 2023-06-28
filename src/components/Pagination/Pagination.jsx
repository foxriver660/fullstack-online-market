import React, { useState } from "react";
import style from "./Pagination.module.scss";

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts }) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  const [pageNumberLimit] = useState(7);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(7);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // GO to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // GO to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={style.pagination}>
      <li onClick={paginatePrev} className={currentPage === pageNumbers[0] ? `${style.hidden}` : null}>
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${style.active}` : null}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNext}
        className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${style.hidden}` : null}
      >
        Next
      </li>

      <p>
        страница <b className={style.page}>{` ${currentPage}`}</b>
        <span>{` из `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
