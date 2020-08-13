import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Searcher from '../../../components/base/Searcher';
import { RESULTS_URL } from '../../../utils/urls';
import './index.scss';

const Search = () => {
  const [ search, setSearch ] = useState('');
  const history = useHistory();

  return (
    <div className="search">
      <div className="search-text-container">
        <h1>Some text</h1>
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
        />
      </div>
    </div>
  );
};

export default Search;
