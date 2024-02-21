import React from 'react';
import './pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageButtons = React.useMemo(() => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                    aria-label={`Go to page ${i}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    }, [currentPage, totalPages, onPageChange]);

    return (
        <div className="pagination">
            <button className='previous-btn' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageButtons}
            <button className='next-btn' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
