import styles from '../styles/employee.module.scss';

export const EmployeeAvatar = ({imgSrc, fullName="иван иван иван"}) => {

	const altText = fullName.split(" ").reduce((acc, value,) => acc + value[0].toUpperCase(), '');

	return(
		<div className={styles.avatar}>
			{imgSrc ? 
			<img src={imgSrc} alt={altText}/> :
			<div className={styles.avatarIcon}> {altText} </div>
			}
		</div>
	)
}