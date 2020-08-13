import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Searcher from '../../components/base/Searcher';
import { RESULTS_URL } from '../../utils/urls';

const Search = () => {
  const [ search, setSearch ] = useState('');
  const history = useHistory();

  return (
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
  );
};

export default Search;
