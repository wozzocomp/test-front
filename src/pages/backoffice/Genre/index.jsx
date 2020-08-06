import React, { useState, useEffect } from 'react';
import { GenericBackoffice, GenericBackofficeElement, GENERIC_TYPES, SureModal } from '@wozzocomp/base-comps';
import { translate } from '../../../utils/translate/translator';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';
import forms from '../../../utils/forms';
import Page from '../../../components/base/Page';

const BackofficeGenrePage = () => {
  const [ genres, setGenres ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ selectedGenre, setSelectedGenre ] = useState(null);
  const [ showSure, setShowSure ] = useState(false);
  const [ sureMode, setSureMode ] = useState(null);

  const SURE_MODES = {
    DELETE: 'delete',
    DISABLE: 'disable',
    ENABLE: 'enable',
    RESTORE: 'restore',
  };

  const getExtraActions = (genre) => {
    let res = [];
    if (genre && genre._id) {
      res = [
        {
          text: genre.active ? translate('common.disable') : translate('common.enable'),
          icon: genre.active ? 'fas fa-user-times' : 'fas fa-user-check',
          onClick: () => {
            setSelectedGenre(genre);
            setShowSure(true);
            setSureMode(genre.active ? SURE_MODES.DISABLE : SURE_MODES.ENABLE);
          },
        },
      ];
    }

    if (genre.deleted) {
      res.push({
        text: translate('common.restore'),
        icon: 'fas fa-trash-restore-alt',
        onClick: () => {
          setSelectedGenre(genre);
          setShowSure(true);
          setSureMode(SURE_MODES.RESTORE);
        },
      });
    } else {
      res.push({
        text: translate('common.remove'),
        icon: 'fas fa-trash',
        onClick: () => {
          setSelectedGenre(genre);
          setShowSure(true);
          setSureMode(SURE_MODES.DELETE);
        },
      });
    }

    return res;
  };

  useEffect(() => {
    if (!showSure) {
      setSelectedGenre(null);
    }
  }, [ showSure ]);

  return (
    <Page id="backoffice-genres-page" backoffice title={translate('navbar.genres')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        tableProps={{
          ...forms.backoffice.table.tableProps,
          csvFileName: translate('genre.genres'),
        }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('genre.noGenresFound') }}
        //  customValidator={validateGenre}
        entity={translate('genre.genre')}
        extraActions={getExtraActions}
        loading={loading}
        objects={genres}
        showDelete={false}
        title={translate('genre.genres')}
        //  onSave={onSave}
        //  onSearch={onSearch}
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
          label={translate('genre.name')}
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
          label={translate('genre.active')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
        <GenericBackofficeElement
          field="deleted"
          filterField="deleted"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('genre.deleted')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
      </GenericBackoffice>
      {selectedGenre?._id && showSure && (
        <SureModal
          {...forms.modals.sure}
          header={translate(`genre.${sureMode}`)}
          loading={loadingUpdate}
          //  onAccept={onAcceptSure}
          onHide={() => setShowSure(false)}
          show={showSure}>
          <p>
            {translate(`genre.${sureMode}Sure`)}: <strong>{selectedGenre.name}</strong>
          </p>
        </SureModal>
      )}
    </Page>
  );
};

export default BackofficeGenrePage;
