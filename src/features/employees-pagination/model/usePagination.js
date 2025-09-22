import { useState } from "react"

export const usePagination = (totalItems, initialItemsPerPage = 20) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemPerPage, setItemPerPage] = useState(initialItemsPerPage);

	const setPage = (page) => {
		setCurrentPage(page);
	};

	const changePage = (num) => {
		const endPage = Math.ceil(totalItems / itemPerPage);
		const followingPage = currentPage + num;
		if (followingPage < 1) {
			setPage(1);
		} else if (followingPage > endPage) {
			setPage(endPage);
		} else {
			setPage(followingPage);
		};
	};

	const resetPagination = () => {
		setCurrentPage(1);
	};

	return {
		currentPage,
		setPage,
		changePage,
		resetPagination,
		itemPerPage,
		apiParams: {
			_page: currentPage,
			_limit: itemPerPage
		}
	}
}