import styles from '../styles/pagination.module.scss';


export const PaginationControls = ({
	currentItems,
	currentPage,
	totalItems, 
	itemPerPage, 
	onChangePage, 
	setPage
}) => {
	const endPage = Math.ceil(totalItems / itemPerPage);
	const [startItem, endItem] = currentItems;

	return (
		<div className={styles.paginationControls}>
			<button onClick={() => setPage(1)} disabled={currentPage === 1}>
				{"<<"}
			</button>
			<button onClick={() => onChangePage(-1)} disabled={currentPage === 1}>
				{"<"}
			</button>

			<span className={styles.paginationCurrentItems}> {startItem}-{endItem} </span>
			<span className={styles.paginationDeciderItems}> / </span>
			<span className={styles.paginationTotalItems}> {totalItems} </span>
			<button onClick={() => onChangePage(1)} disabled={currentPage === endPage}>
				{">"}
			</button>
			<button onClick={() => setPage(endPage)} disabled={currentPage === endPage}>
				{">>"}
			</button>
		</div>
	)
}