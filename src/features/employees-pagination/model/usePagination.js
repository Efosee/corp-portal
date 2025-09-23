import { useState, useEffect, useMemo, useCallback } from "react";
import { employeeApi } from "../../../entities/employee";

export const usePagination = (initialItemsPerPage = 20) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(initialItemsPerPage);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        employeeApi.getEmployeesForTable()
            .then(({ totalItems }) => setTotalItems(totalItems));
    }, []);

    const setPage = useCallback((page) => {
        setCurrentPage(page);
    }, []);
    
    const apiParams = useMemo(() => ({
        _page: currentPage,
        _limit: itemPerPage
    }), [currentPage, itemPerPage]);

    const changePage = useCallback((num) => {
        const endPage = Math.ceil(totalItems / itemPerPage);
        const followingPage = currentPage + num;
        if (followingPage < 1) {
            setPage(1);
        } else if (followingPage > endPage) {
            setPage(endPage);
        } else {
            setPage(followingPage);
        };
    }, [currentPage, totalItems, itemPerPage, setPage]);

    const resetPagination = useCallback(() => {
        setCurrentPage(1);
    }, []);

    return useMemo(() => ({
        currentPage,
        setPage,
        changePage,
        resetPagination,
        itemPerPage,
				setItemPerPage,
        apiParams
    }), [currentPage, setPage, changePage, resetPagination, itemPerPage, apiParams]);
}