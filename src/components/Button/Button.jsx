import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Button.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} type="button" className={styles.Button}>
      load more
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
