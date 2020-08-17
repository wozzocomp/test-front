import React, { useEffect, useState } from 'react';
import { AlertBox } from '@wozzocomp/base-comps';
import { useLocation, useHistory } from 'react-router-dom';
import './index.scss';
import { findSongsBySearch } from '../../../actions/song';
import { RESULTS_URL } from '../../../utils/urls';
import { translate } from '../../../utils/translate/translator';
import Loading from '../../../components/base/Loading';
import MusicGallery from '../../../components/base/MusicGallery';
import Searcher from '../../../components/base/Searcher';

const Result = () => {
  const [ results, setResults ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (searchParam) {
      setLoading(true);
      setSearch(searchParam);
      findSongsBySearch(searchParam).then((newResults) => {
        setLoading(false);
        setResults(newResults);
      });
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader">
          {' '}
          <Loading />
        </div>
      ) : (
        <div className="results">
          <div className="results-searcher">
            <Searcher
              value={search}
              onChange={(newSearch) => {
                setSearch(newSearch);
              }}
              onClick={() => {
                setLoading(true);
                findSongsBySearch(search)
                  .then((newResults) => {
                    setLoading(false);
                    setResults(newResults);
                    history.replace({
                      pathname: RESULTS_URL,
                      search: `?search=${search}`,
                    });
                  })
                  .catch(() => {
                    setLoading(false);
                    setResults([]);
                  });
              }}
              disabled={!search.trim().length}
            />
          </div>
          {results.length ? (
            <MusicGallery songs={results} />
          ) : (
            <div className="not-found">
              <AlertBox text={translate('song.noSongsFound')} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Result;
