import styles from "./Loader.module.scss";

const Loader = ({ classname }) => {
  return <div className={`${styles.loader} ${classname}`}></div>;
};

export default Loader;
