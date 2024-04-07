import { useNavigate } from 'react-router-dom';
import './pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const navigate = useNavigate();

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            navigate(`/products/page/${currentPage + 1}`);
        }
    };

    return (
        <div className="pagination">
            <button className='previous-btn' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {/* <span className='page-number'>{currentPage}</span> */}
            <span className='page-info'>Showing page {currentPage} out of {totalPages}</span>
            <button className='next-btn' onClick={handleNextClick} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;