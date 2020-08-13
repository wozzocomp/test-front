import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MusicGallery from '../../components/base/MusicGallery';
import Searcher from '../../components/base/Searcher';
import { RESULTS_URL } from '../../utils/urls';

const data = () =>
  new Promise((resolve) =>
    resolve({
      data: {
        songs: [
          {
            _id: '5f2d32efd4fce43b6441d809',
            name: 'Rap god',
            songUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/7e76d0489d3b496483b231aa1ce9ebae61d83ebe0f234537a7c70e637e2f78e5.mpeg',
            imgUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/f47470004d0e4eda991a8eace2cc78961b097e12a904483aaadb8e9770c536c0.jpeg',
            artist: {
              name: 'Eminem',
            },
            genre: {
              name: 'Rap',
            },
          },
          {
            _id: '5f2d3c343233bb2624ee5cf7',
            name: 'Physical',
            songUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/05b9fb1023a84e9c86262f6d74885e897950812b88934720afd8fa3f209966ba.mpeg',
            imgUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/3c806eb395b24ca69722439f88651dc3226adad5c4b84b0fa064b7a80c53045d.jpeg',
            artist: {
              name: 'Dua Lipa',
            },
            genre: {
              name: 'Pop',
            },
          },
          {
            _id: '5f30e30d0a88dc1b88ad65f1',
            name: 'Jeremías 17:5',
            songUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/8368710c5d0a4ff281aa36092a60ab1e25616052efcc468e9a07ac24f7198aee.mpeg',
            imgUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/1c63f5f7873443b5a320504ed1dd7779098ce128b2804efbb6f6b7513ebb1b3e.jpeg',
            artist: {
              name: 'Canserbero',
            },
            genre: {
              name: 'Rap',
            },
          },
          {
            _id: '5f328cbe98938c4414a465d6',
            name: 'Mi colega',
            songUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/702665ea7a4946708de52af05a779aa93cad97d6abdf44979bea975736f4a7e7.mpeg',
            imgUrl:
              'https://s3.amazonaws.com/test-bucket-wozzo/bb7a22ff39d84fd7ad22232bd199396e8a3af33fc75e4d4e92fa6d56440845a3.jpeg',
            artist: {
              name: 'Tote King',
            },
            genre: {
              name: 'Rap',
            },
          },
        ],
      },
    }),
  );

const Result = () => {
  const [ results, setResults ] = useState([]);
  const [ search, setSearch ] = useState('');
  const history = useHistory();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam);
      data().then((newResults) => {
        setResults(newResults.data.songs);
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
          data().then((newResults) => {
            setResults(newResults.data.songs);
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
