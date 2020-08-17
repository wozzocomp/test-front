import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { RESULTS_URL } from '../../../utils/urls';
import { translate } from '../../../utils/translate/translator';
import Searcher from '../../../components/base/Searcher';

const Search = () => {
  const [ search, setSearch ] = useState('');
  const history = useHistory();

  return (
    <div className="search">
      <div className="search-text-container">
        <h1>{translate('search.title')}</h1>
      </div>
      <div className="search-container">
        <Searcher
          value={search}
          onChange={(newSearch) => {
            setSearch(newSearch);
          }}
          onClick={() => {
            history.push({
              pathname: RESULTS_URL,
              search: `?search=${search}`,
            });
          }}
          disabled={!search.trim().length}
        />
      </div>
    </div>
  );
};

export default Search;
