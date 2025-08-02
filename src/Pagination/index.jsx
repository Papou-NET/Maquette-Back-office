import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const maxButtons = 5;
    const pages = [];

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div style={{ display: "flex", gap: "5px", marginTop: "20px", flexWrap: "wrap" }}>
      {/* Bouton précédent */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyle}
      >
        Préc
      </button>

      {/* Pages visibles */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...buttonStyle,
            backgroundColor: page === currentPage ? "#aa8362" : "#ccc",
            color: page === currentPage ? "#fff" : "#000",
            fontWeight: page === currentPage ? "bold" : "normal"
          }}
        >
          {page}
        </button>
      ))}

      {/* Bouton suivant */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default Pagination;
