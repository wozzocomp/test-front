import React, { useState, useEffect } from 'react';
import { GenericBackoffice, GenericBackofficeElement, GENERIC_TYPES, SureModal } from '@wozzocomp/base-comps';
import { translate } from '../../../utils/translate/translator';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';
import forms from '../../../utils/forms';
import Page from '../../../components/base/Page';
import { isFunction } from '../../../utils/functions';

const BackofficeSongPage = () => {
  const [ songs, setSongs ] = useState([]);
  const [ loading, setLoading ] = useState(false);
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
        // onSave={onSave}
        // onSearch={onSearch}
      >
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
          // loading={loadingUpdate}
          // onAccept={onAcceptSure}
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