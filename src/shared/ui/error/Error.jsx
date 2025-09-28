import error from "../../assets/Error.gif";
import styles from "./error.module.scss";

export const Error = () => {

	return (
		<div className={styles.error}>
			<img src={error} alt="Error" />
		</div>
	)
}