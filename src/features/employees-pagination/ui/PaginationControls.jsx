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
			<div className={styles.paginationNav}>
				<button onClick={() => onSetPage(1)} disabled={currentPage === 1}>
					{"<<"}
				</button>
				<button onClick={() => onChangePage(-1)} disabled={currentPage === 1}>
					{"<"}
				</button>
			</div>

			<div className={styles.paginationInfo}>
				<span className={styles.paginationCurrentItems}>{startItem}-{endItem}</span>
				<span className={styles.paginationDeciderItems}>/</span>
				<span className={styles.paginationTotalItems}>{totalItems}</span>
			</div>

			<div className={styles.paginationNav}>
				<button onClick={() => onChangePage(1)} disabled={currentPage === endPage}>
					{">"}
				</button>
				<button onClick={() => onSetPage(endPage)} disabled={currentPage === endPage}>
					{">>"}
				</button>
			</div>

			<label className={styles.paginationLabel}>
				Выберите кол-во строк
				<select
					onChange={(e) => onSetItemsPerPage(e.target.value)}
					value={itemPerPage}
					className={styles.paginationSelect}
				>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
					<option value={30}>30</option>
				</select>
			</label>
		</div>
	)
});