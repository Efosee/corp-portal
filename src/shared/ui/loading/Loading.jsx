import spin from '../../assets/Spin.svg';
import styles from './loading.module.scss';

export const Loading = () => {
    return (
        <div className={styles.loading}>
            <img src={spin} alt="Loading..." />
        </div>
    );
}