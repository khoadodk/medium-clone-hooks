import React from 'react';
import { Link } from 'react-router-dom';

const PaginationItem = ({ page, currentPage, url }) => {
  const isCurrentPage = currentPage === page ? 'page-item active' : 'page-item';
  return (
    <li className={isCurrentPage}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pageCount = Math.ceil(total / limit); //ex: Page 21 if total 201, limit 10
  let pages = [];
  for (let i = 1; i < pageCount + 1; i++) {
    pages.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pages.map(page => (
          <PaginationItem
            page={page}
            key={page}
            currentPage={currentPage}
            url={url}
          />
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
