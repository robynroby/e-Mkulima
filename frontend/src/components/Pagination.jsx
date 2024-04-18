import { useNavigate } from 'react-router-dom';
import './pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const navigate = useNavigate();

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            // Trigger onPageChange to fetch products for the next page
            onPageChange(nextPage);
            // Update navigation to the next page route
            navigate(`/products/page/${nextPage}`);
        }
    };


    const handlePreviousClick = () => {
        const previousPage = currentPage - 1;
        if (previousPage >= 1) {
            onPageChange(previousPage);
            navigate(`/products/page/${previousPage}`);
        }
    };

    return (
        <div className="pagination">
            <button className='previous-btn' onClick={handlePreviousClick} disabled={currentPage === 1}>
                Previous
            </button>
            <span className='page-info'>Showing page {currentPage} out of {totalPages}</span>
            <button className='next-btn' onClick={handleNextClick} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
