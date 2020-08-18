import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { RESULTS_URL } from '../../../utils/urls';
import { translate } from '../../../utils/translate/translator';
import SearchBox from '../../../components/base/SearchBox';

const Search = () => {
  const [ search, setSearch ] = useState('');
  const history = useHistory();

  const onSearch = () => {
    history.push({
      pathname: RESULTS_URL,
      search: `?search=${search}`,
    });
  };

  return (
    <div className="search">
      <div className="search-text-container">
        <h1>{translate('search.title')}</h1>
      </div>
      <div className="search-container">
        <SearchBox
          value={search}
          onChange={(newSearch) => {
            setSearch(newSearch);
          }}
          onClick={onSearch}
          onEnter={onSearch}
          disabled={!search.trim().length}
        />
      </div>
    </div>
  );
};

export default Search;
