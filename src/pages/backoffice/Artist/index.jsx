import React, { useState, useEffect } from 'react';
import { GenericBackoffice, GenericBackofficeElement, GENERIC_TYPES, SureModal } from '@wozzocomp/base-comps';

import './index.scss';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';
import forms from '../../../utils/forms';
import getArtists from '../../../actions/artist';
import Page from '../../../components/base/Page';
import { translate } from '../../../utils/translate/translator';

const BackofficeArtistsPage = () => {
  const [ loading, setLoading ] = useState(false);
  const [ artists, setArtists ] = useState([]);
  const [ selectedArtist, setSelectedArtist ] = useState(null);

  const getExtraActions = (artist) => {
    const isActive = artist.active;

    return [
      {
        text: translate(isActive ? 'common.disable' : 'common.activate'),
        icon: isActive ? 'fas fa-ban' : 'fas fa-trash-restore-alt',
        onClick: () => {
          setSelectedArtist(artist);
        },
      },
    ];
  };

  const onSearch = (filter) => {
    // eslint-disable-next-line no-console
    console.log(filter);
    setLoading(true);
    getArtists(filter)
      .then((newArtists) => {
        setArtists(newArtists);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Page id="backoffice-artists-page" backoffice title={translate('navbar.artist')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        tableProps={{
          ...forms.backoffice.table.tableProps,
          csvFileName: translate('artist.artists'),
        }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('artist.noArtistsFound') }}
        entity={translate('artist.artist')}
        extraActions={getExtraActions}
        loading={loading}
        objects={artists}
        title={translate('artist.artists')}
        onSearch={onSearch}>
        <GenericBackofficeElement field="_id" hideOnFilter hideOnModal isKey label={translate('common.id')} />
        <GenericBackofficeElement
          field="name"
          filterField="name"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-signature"
          label={translate('artist.name')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="description"
          hideOnFilter
          icon="fas fa-signature"
          label={translate('artist.description')}
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
          label={translate('artist.active')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
        <GenericBackofficeElement
          field="deleted"
          filterField="deleted"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('artist.deleted')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
      </GenericBackoffice>
    </Page>
  );
};
export default BackofficeArtistsPage;
