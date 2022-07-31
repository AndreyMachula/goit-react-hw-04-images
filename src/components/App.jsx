import { useState, useEffect } from 'react';

import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../api/PixabayApi';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

import styles from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [dataImages, setDataImages] = useState([]);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagImageAlt, setTagImageAlt] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    if (searchQuery === '') {
      return;
    }

    setStatus('pending');

    API(searchQuery, page, { signal })
      .then(response => {
        if (searchQuery !== '' && response.length !== 0 && page === 1) {
          toast.success(`Images ${searchQuery} found`);
          setDataImages(response);
          setStatus('resolved');
        }
        if (response.length !== 0 && page > 1) {
          setDataImages(prevDataImages => [...prevDataImages, ...response]);
          setStatus('resolved');
          scroll.scrollToBottom(100);
        }

        if (response.length === 0) {
          toast.error(`Images ${searchQuery} not found`);
          setStatus('idle');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    return () => controller.abort();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setDataImages([]);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const handleOpenModal = image => {
    const { largeImageURL, tags } = image;

    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTagImageAlt(tags);
  };

  const handleCloseModal = e => {
    setShowModal(false);
    setLargeImageURL('');
    setTagImageAlt('');
  };

  return (
    <div className={styles.App}>
      <Searchbar onFormSubmit={handleFormSubmit} />

      {status === 'idle' && <div>Free images</div>}

      {status === 'rejected' && <h1>{error.message}</h1>}

      {status === 'resolved' && (
        <>
          <ImageGallery dataImages={dataImages} onOpenModal={handleOpenModal} />

          {dataImages.length !== 0 && (
            <Button onLoadMore={() => setPage(prevState => prevState + 1)} />
          )}
        </>
      )}

      {status === 'pending' && (
        <>
          <ImageGallery dataImages={dataImages} onOpenModal={handleOpenModal} />{' '}
          <Loader />
        </>
      )}

      {showModal && (
        <Modal onCloseModal={handleCloseModal}>
          <img src={largeImageURL} alt={tagImageAlt} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
