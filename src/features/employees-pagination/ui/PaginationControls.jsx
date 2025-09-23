import styles from '../styles/pagination.module.scss';
import { memo } from 'react';

export const PaginationControls = memo(({
	currentItems,
	currentPage,
	totalItems,
	itemPerPage,
	onChangePage,
	onSetPage,
	onSetItemsPerPage
}) => {
	const endPage = Math.ceil(totalItems / itemPerPage);
	const [startItem, endItem] = currentItems;

	return (
		<div className={styles.paginationControls}>
			<button onClick={() => onSetPage(1)} disabled={currentPage === 1}>
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
			<button onClick={() => onSetPage(endPage)} disabled={currentPage === endPage}>
				{">>"}
			</button>

			<label className={styles.paginationLabel}>
				Выберите кол-во страниц
				<select
					onChange={(e) => onSetItemsPerPage(e.target.value)}
					className={styles.paginationSelect}
				>
					<option value={10} selected>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
					<option value={30}>30</option>
				</select>
			</label>
		</div>
	)
});