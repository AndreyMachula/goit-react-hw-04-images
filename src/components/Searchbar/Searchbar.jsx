import { useState } from 'react';
import { PropTypes } from 'prop-types';

import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './Searchbar.module.css';

const Searchbar = ({ onFormSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = event => {
    event.preventDefault();

    const { value } = event.currentTarget;

    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() !== '') {
      onFormSubmit(searchQuery);
      setSearchQuery(searchQuery);
    } else toast.error('Input field must not be empty');
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__button_label}>Search</span>
          <AiOutlineSearch />
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
