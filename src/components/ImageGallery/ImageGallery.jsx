import React from 'react';
import { PropTypes } from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ dataImages, onOpenModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {dataImages.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  dataImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
