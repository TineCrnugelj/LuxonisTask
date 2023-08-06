import React, {useMemo} from 'react';
import { useSearchParams } from "react-router-dom";

interface PageButtonProps {
    page: number,
    switchPage: (page: number) => void,
    children: number | React.ReactNode
}

const PageButton: React.FC<PageButtonProps> = ({children, page, switchPage}) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const isActive = useMemo(() => Number(searchParams.get('page')) === page, [searchParams]);

    const switchPageHandler = () => {
        setSearchParams({page: page.toString()});
        switchPage(page);
    }   

    return (
        <button 
            className={`page-button ${isActive ? 'bg-blue-800' : 'bg-blue-400'}`}
            onClick={switchPageHandler}
        >
            <strong>{children}</strong> 
        </button>
    );
}

export default PageButton;
