import React from "react";

const getPages = (curr, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (curr <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (curr >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", curr - 1, curr, curr + 1);
    }
  }
  return pages;
};

const Pagination = ({ pageHandler, page, dynamicPage }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`px-4 py-2 rounded-md text-white transition
      ${
        page === 1
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-black hover:bg-gray-800 cursor-pointer"
      }
    `}
      >
        Prev
      </button>

      {getPages(page, dynamicPage).map((p, idx) => (
        <button
          key={idx}
          onClick={() => typeof p === "number" && pageHandler(p)}
          disabled={p === "..."}
          className={`px-3 py-1 rounded-md text-sm transition
        ${
          p === page ? "font-bold" : "text-gray-700 hover:bg-gray-200 cursor-pointer"
        }
      `}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === dynamicPage}
        onClick={() => pageHandler(page + 1)}
        className={`px-4 py-2 rounded-md text-white transition
      ${
        page === dynamicPage
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-black hover:bg-gray-800 cursor-pointer"
      }
    `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
