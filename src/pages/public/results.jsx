import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MusicGallery from '../../components/base/MusicGallery';
import Searcher from '../../components/base/Searcher';
import { RESULTS_URL } from '../../utils/urls';
import { findSongsBySearch } from '../../actions/song';

const Result = () => {
  const [ results, setResults ] = useState([]);
  const [ search, setSearch ] = useState('');
  const history = useHistory();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam);
      findSongsBySearch(searchParam).then((newResults) => {
        setResults(newResults);
      });
    }
  }, []);

  return (
    <>
      <Searcher
        value={search}
        onChange={(newSearch) => {
          setSearch(newSearch);
        }}
        onClick={() => {
          findSongsBySearch(search).then((newResults) => {
            setResults(newResults);
            history.replace({
              pathname: RESULTS_URL,
              search: `?search=${search}`,
            });
          });
        }}
      />
      <MusicGallery songs={results} />{' '}
    </>
  );
};

export default Result;
