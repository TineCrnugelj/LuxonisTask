import React, {useMemo} from "react";
import PageButton from "./PageButton";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";

interface PaginationButtonsProps {
    currentPage: number,
    switchPage: (page: number) => void,
    previousPage: () => void,
    nextPage: () => void,
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({currentPage = 1, switchPage, previousPage, nextPage}) => {
    const pageButtons = useMemo(() => {
        if (currentPage < 3) {
            return (
                Array.from({ length: 5 }, (_, index) => 
                <PageButton 
                    key={index} 
                    switchPage={switchPage} 
                    page={currentPage + index}
                >
                    {currentPage + index}
                </PageButton>
                )
            );
        }

        return Array.from({ length: 5 }, (_, index) => 
            <PageButton 
                key={index} 
                switchPage={switchPage} 
                page={currentPage - 2 + index}
            >
                {currentPage -2 + index}
            </PageButton>
        );
    }, [currentPage]);

    return (
        <nav className='inline m-6'>
            <button disabled={currentPage === 1} className={`page-button ${currentPage === 1 && 'hover:bg-slate-300 bg-slate-300 cursor-not-allowed'}`} onClick={previousPage}><ChevronLeft size={20}/></button>
            {pageButtons}
            <button className='page-button' onClick={nextPage}><ChevronRight size={20} /></button>
        </nav>
    );
}

export default PaginationButtons;
