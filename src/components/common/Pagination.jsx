import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // 20, 5, 1
  const pagesCount = Math.ceil(itemsCount / pageSize); // 20/5=4
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // [1, 2, 3, 4]

  const getPrevPage = () => {
    // if(currentPage - 1 === )
    onPageChange(currentPage - 1);
  };

  const getNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav>
      <ul className="pagination">
        <li class="page-item">
          <a class="page-link" onClick={() => getPrevPage()}>
            Previous
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}

        <li class="page-item">
          <a class="page-link" onClick={() => getNextPage()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
