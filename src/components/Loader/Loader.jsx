import React from 'react';

import { Grid } from 'react-loader-spinner';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <Grid
        heigth="200"
        width="200"
        color="#3f51b5"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Loader;
