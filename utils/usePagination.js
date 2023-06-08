// usePagination.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const usePagination = (totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    let currentPage;
    if (!router.query.page) {
      const savedPage = localStorage.getItem('currentPage');
      currentPage = savedPage ? parseInt(savedPage) : 1;
      setCurrentPage(currentPage);
      router.replace(`/home?page=${currentPage}`);
    } else {
      currentPage = parseInt(router.query.page);
      setCurrentPage(currentPage);
    }
  }, [router]);

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    localStorage.setItem('currentPage', page);
    router.push(`/home?page=${page}`);
  };

  const renderPagination = () => {
    const pages = [];

    let startPage = currentPage - 1;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      endPage += Math.abs(startPage - 1);
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    if (currentPage > 1) {
      pages.push(
        <li key="previous" className="mx-1 p-1">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="py-2 ml-1 px-4 border-2 rounded-sm bg-blue-300"
          >
            &lt;
          </button>
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={` p-1 ${currentPage === i ? 'font-bold text-black' : 'text-black'}`}>
          <button
            onClick={() => handlePageChange(i)}
            className=" py-2 ml-1 px-4 border-2 rounded-sm bg-blue-300"
          >
            {i}
          </button>
        </li>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <li key="next" className="mx-1 p-1">
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className=" py-2 ml-1 px-4 border-2 rounded-sm bg-blue-300"
          >
            &#62;
          </button>
        </li>
      );
    }

    return <ul className="grid grid-cols-5 xs:flex mt-8">{pages}</ul>;
  };

  return {
    currentPage,
    handlePageChange,
    renderPagination,
  };
};

export default usePagination;
