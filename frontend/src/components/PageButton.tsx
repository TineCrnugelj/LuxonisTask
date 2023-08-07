import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface PageButtonProps {
  page: number;
  switchPage: (page: number) => void;
  children: number | React.ReactNode;
}

const PageButton: React.FC<PageButtonProps> = ({
  children,
  page,
  switchPage,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const isActive = useMemo(() => {
    const pageSearchParameter = Number(searchParams.get("page"));
    return (
      pageSearchParameter === page || (page === 1 && pageSearchParameter === 0)
    );
  }, [searchParams]);

  const switchPageHandler = () => {
    setSearchParams({ page: page.toString() });
    switchPage(page);
  };

  return (
    <button
      className={`page-button ${
        isActive ? "bg-blue-800 hover:bg-blue-800 text-white" : "bg-white"
      }`}
      onClick={switchPageHandler}
    >
      <strong>{children}</strong>
    </button>
  );
};

export default PageButton;
