import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onOpenModal }) => {
  return (
    <li
      key={image.id}
      onClick={() => {
        onOpenModal(image);
      }}
      className={styles.ImageGalleryItem}
    >
      <img
        height={260}
        className={styles.ImageGalleryItem__image}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),

  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem