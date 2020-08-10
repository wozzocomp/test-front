import React, { useState, useEffect } from 'react';
import { GenericBackoffice, GenericBackofficeElement, GENERIC_TYPES, SureModal } from '@wozzocomp/base-comps';
import { translate } from '../../../utils/translate/translator';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';
import forms from '../../../utils/forms';
import Page from '../../../components/base/Page';
import {
  createSong,
  searchSongByFilter,
  updateSong,
  deleteSong,
  disableSong,
  enableSong,
  restoreSong,
} from '../../../actions/song';
import { isFunction } from '../../../utils/functions';
import { showSuccessToast, showErrorToast } from '../../../utils/toasts';
import './index.scss';

const BackofficeSongPage = () => {
  const [ songs, setSongs ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ selectedSong, setSelectedSong ] = useState(null);
  const [ showSure, setShowSure ] = useState(false);
  const [ sureMode, setSureMode ] = useState(null);

  const SURE_MODES = {
    DELETE: 'delete',
    DISABLE: 'disable',
    ENABLE: 'enable',
    RESTORE: 'restore',
  };

  const getExtraActions = (song) => {
    let res = [];
    if (song && song._id) {
      res = [
        {
          text: song.active ? translate('common.disable') : translate('common.enable'),
          icon: song.active ? 'fas fa-user-times' : 'fas fa-user-check',
          onClick: () => {
            setSelectedSong(song);
            setShowSure(true);
            setSureMode(song.active ? SURE_MODES.DISABLE : SURE_MODES.ENABLE);
          },
        },
      ];
    }

    if (song.deleted) {
      res.push({
        text: translate('common.restore'),
        icon: 'fas fa-trash-restore-alt',
        onClick: () => {
          setSelectedSong(song);
          setShowSure(true);
          setSureMode(SURE_MODES.RESTORE);
        },
      });
    } else {
      res.push({
        text: translate('common.remove'),
        icon: 'fas fa-trash',
        onClick: () => {
          setSelectedSong(song);
          setShowSure(true);
          setSureMode(SURE_MODES.DELETE);
        },
      });
    }

    return res;
  };

  useEffect(() => {
    if (!showSure) {
      setSelectedSong(null);
    }
  }, [ showSure ]);

  const onSearch = (filter = {}) => {
    setLoading(true);
    searchSongByFilter(filter)
      .then((newSongs) => {
        setSongs(newSongs);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSave = (song, cb) => {
    setLoadingUpdate(true);
    let saveFunction = createSong;
    let okMessage = 'song.createOk';
    let koMessage = 'song.createKo';

    if (song?._id) {
      saveFunction = updateSong;
      koMessage = 'song.updateKo';
      okMessage = 'song.updateOk';
    }

    saveFunction(song, song.imgUrl, song.songUrl)
      .then(() => {
        cb();
        onSearch();
        showSuccessToast(translate(okMessage));
        setLoadingUpdate(false);
      })
      .catch(() => {
        showErrorToast(translate(koMessage));
        setLoadingUpdate(false);
      });
  };

  const onAcceptSure = () => {
    setLoadingUpdate(true);
    let call = null;

    if (SURE_MODES.DELETE === sureMode) {
      call = deleteSong;
    }
    if (SURE_MODES.DISABLE === sureMode) {
      call = disableSong;
    }
    if (SURE_MODES.ENABLE === sureMode) {
      call = enableSong;
    }
    if (SURE_MODES.RESTORE === sureMode) {
      call = restoreSong;
    }

    if (isFunction(call)) {
      call(selectedSong._id)
        .then(() => {
          onSearch();
          setShowSure(false);
          showSuccessToast(translate('song.updateOk'));
          setLoadingUpdate(false);
        })
        .catch(() => {
          showErrorToast(translate('song.updateKo'));
          setLoadingUpdate(false);
        });
    }
  };

  return (
    <Page id="backoffice-songs-page" backoffice title={translate('navbar.songs')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        tableProps={{
          ...forms.backoffice.table.tableProps,
          csvFileName: translate('song.songs'),
        }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('song.noSongsFound') }}
        entity={translate('song.song')}
        extraActions={getExtraActions}
        loading={loading}
        objects={songs}
        showDelete={false}
        title={translate('song.songs')}
        onSave={onSave}
        onSearch={onSearch}
        previousLoad>
        <GenericBackofficeElement
          field="_id"
          filterField="_id"
          filterType={GENERIC_TYPES.input}
          hideOnModal
          icon="fas fa-fingerprint"
          isKey
          label={translate('common.id')}
        />
        <GenericBackofficeElement
          field="name"
          filterField="name"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-signature"
          label={translate('song.name')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="artistId"
          filterField="artistId"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-user-music"
          label={translate('song.artist')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="genreId"
          filterField="genreId"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-list-music"
          label={translate('song.genre')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="releaseDate"
          filterField="releaseDate"
          filterType={GENERIC_TYPES.datepicker}
          icon="fad fa-calendar-alt"
          label={translate('song.releaseDate')}
          modalType={GENERIC_TYPES.datepicker}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="album"
          filterField="album"
          filterType={GENERIC_TYPES.input}
          icon="far fa-album"
          label={translate('song.album')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="imgUrl"
          filterField="imgUrl"
          hideOnFilter
          icon="far fa-file-image"
          label={translate('song.image')}
          modalProps={{ showPreview: true, accept: 'image/*' }}
          modalType={GENERIC_TYPES.dropzone}
          tableFormatter={(image) => <img style={{ width: '100%' }} src={image} alt={image} />}
        />
        <GenericBackofficeElement
          field="songUrl"
          filterField="songUrl"
          hideOnFilter
          hideOnTable
          icon="fal fa-file-music"
          label={translate('song.songUrl')}
          modalProps={{ showPreview: true, accept: 'audio/*' }}
          modalType={GENERIC_TYPES.dropzone}
        />
        <GenericBackofficeElement
          field="active"
          filterField="active"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('song.active')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
        <GenericBackofficeElement
          field="deleted"
          filterField="deleted"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('song.deleted')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
      </GenericBackoffice>
      {selectedSong?._id && showSure && (
        <SureModal
          {...forms.modals.sure}
          header={translate(`song.${sureMode}`)}
          loading={loadingUpdate}
          onAccept={onAcceptSure}
          onHide={() => setShowSure(false)}
          show={showSure}>
          <p>
            {translate(`song.${sureMode}Sure`)}: <strong>{selectedSong.name}</strong>
          </p>
        </SureModal>
      )}
    </Page>
  );
};

export default BackofficeSongPage;
