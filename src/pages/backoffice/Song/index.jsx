import React, { useState, useEffect } from 'react';
import {
  Button,
  BUTTON_TYPES,
  Dropzone,
  GenericBackoffice,
  GenericBackofficeElement,
  GENERIC_TYPES,
  Input,
  Modal,
  Selector,
  SureModal,
  Search,
  Datepicker,
} from '@wozzocomp/base-comps';
import moment from 'moment';
import {
  createSong,
  deleteSong,
  disableSong,
  enableSong,
  restoreSong,
  searchSongByFilter,
  updateSong,
} from '../../../actions/song';
import './index.scss';
import { DATE_FORMAT_TO_SHOW } from '../../../utils/constants';
import { isFunction } from '../../../utils/functions';
import { searchArtists } from '../../../actions/artist';
import { searchGenreByFilter } from '../../../actions/genre';
import { showSuccessToast, showErrorToast } from '../../../utils/toasts';
import { translate } from '../../../utils/translate/translator';
import ActiveInactiveIcon from '../../../components/base/ActiveInactiveIcon';
import forms from '../../../utils/forms';
import Page from '../../../components/base/Page';

const BackofficeSongsPage = () => {
  const [ filtered, setFiltered ] = useState([]);
  const [ filteredModal, setFilteredModal ] = useState([]);
  const [ genres, setGenres ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false);
  const [ modalArtistInputError, setModalArtistInputError ] = useState(false);
  const [ modalArtistCreateInputError, setModalArtistCreateInputError ] = useState(false);
  const [ modalGenreInputError, setModalGenreInputError ] = useState(false);
  const [ modalNameInputError, setModalNameInputError ] = useState(false);
  const [ selected, setSelected ] = useState([]);
  const [ selectedArtistModal, setSelectedArtistModal ] = useState([]);
  const [ selectedSong, setSelectedSong ] = useState({});
  const [ showModal, setShowModal ] = useState(false);
  const [ showSure, setShowSure ] = useState(false);
  const [ songs, setSongs ] = useState([]);
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
          text: translate('common.edit'),
          icon: 'fal fa-edit',
          onClick: () => {
            setSelectedSong(song);
            setShowModal(true);
            setSelectedArtistModal([ song?.artist ]);
          },
        },
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
      setSelectedSong({});
    }
  }, [ showSure ]);

  useEffect(() => {
    searchGenreByFilter().then((newGenres) => {
      setGenres(newGenres);
    });
  }, []);

  const onSearch = (filter = {}) => {
    setLoading(true);
    filter.artist = selected[0] ? selected[0] : null;

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

    song.artist = selectedArtistModal[0] || song.artist;

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

  const onHide = () => {
    setShowModal(false);
    setModalNameInputError(false);
    setModalGenreInputError(false);
    setModalArtistInputError(false);
    setSelectedArtistModal([]);
    setSelectedSong({});
  };

  const validateSong = ({ name, artist, genre }) => {
    const errs = { hasErrors: false };

    if (!name || 1 > name?.trim().length) {
      errs.hasErrors = true;
      errs.name = true;
      setModalNameInputError(true);
    }

    if (!artist || !artist._id) {
      errs.hasErrors = true;
      errs.artist = true;
      if (selectedSong?._id) {
        setModalArtistInputError(true);
      } else {
        setModalArtistCreateInputError(true);
      }
    }

    if (!genre || !genre._id) {
      errs.hasErrors = true;
      errs.genre = true;
    }

    return errs;
  };

  return (
    <Page id="backoffice-songs-page" backoffice title={translate('navbar.songs')}>
      <GenericBackoffice
        {...forms.backoffice.table}
        customValidator={validateSong}
        tableProps={{
          ...forms.backoffice.table.tableProps,
          csvFileName: translate('song.songs'),
        }}
        translations={{ ...forms.backoffice.table.translations, noItems: translate('song.noSongsFound') }}
        entity={translate('song.song')}
        extraActions={getExtraActions}
        loading={loading}
        objects={songs}
        showEdit={false}
        showDelete={false}
        title={translate('song.songs')}
        onSave={onSave}
        onSearch={onSearch}
        previousLoad>
        <GenericBackofficeElement
          field="_id"
          filterType={GENERIC_TYPES.input}
          hideOnModal
          icon="fas fa-fingerprint"
          isKey
          label={translate('common.id')}
        />
        <GenericBackofficeElement
          field="name"
          filterType={GENERIC_TYPES.input}
          icon="fas fa-signature"
          label={translate('song.name')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="artist"
          filterFormatter={() => (
            <Search
              addOptionTooltip={null}
              inputIcon="fas fa-user-music"
              maxSelected={1}
              noResultsText={translate('song.noArtistsFound')}
              noSearchText={translate('song.noSearchText')}
              onAddOption={(option, idx, newOptions) => {
                setFiltered(filtered.filter((el) => el._id !== option._id));
                setSelected(newOptions);
              }}
              onRemoveSelected={() => {
                setSelected([]);
              }}
              onSearch={(val) => {
                searchArtists(val).then((newArtists) => {
                  setFiltered(newArtists);
                });
              }}
              optionImageIcon="fas fa-user-music"
              optionKey="_id"
              optionTextKey="name"
              placeholder={translate('song.artist')}
              removePlayerTooltip={null}
              results={filtered}
              selectedOptions={selected}
              selectedOptionImageIcon="fas fa-user-music"
            />
          )}
          label={translate('song.artist')}
          modalField="artist"
          modalFormatter={() => (
            <Search
              addOptionTooltip={null}
              error={modalArtistCreateInputError}
              inputIcon="fas fa-user-music"
              maxSelected={1}
              noResultsText={translate('song.noArtistsFound')}
              noSearchText={translate('song.noSearchText')}
              onAddOption={(option, idx, newOptions) => {
                setFilteredModal(filteredModal.filter((el) => el._id !== option._id));
                setSelectedArtistModal(newOptions);
                setModalArtistCreateInputError(false);
              }}
              onRemoveSelected={() => {
                setSelectedArtistModal([]);
              }}
              onSearch={(val) => {
                searchArtists(val).then((newArtists) => {
                  setFilteredModal(newArtists);
                });
              }}
              optionImageIcon="fas fa-user-music"
              optionKey="_id"
              optionTextKey="name"
              placeholder={translate('song.artist')}
              removePlayerTooltip={null}
              results={filteredModal}
              selectedOptions={selectedArtistModal}
              selectedOptionImageIcon="fas fa-user-music"
            />
          )}
          tableProps={{ sort: true }}
          tableFormatter={(artist) => <p>{artist?.name}</p>}
        />
        <GenericBackofficeElement
          field="genre"
          filterType={GENERIC_TYPES.selector}
          filterProps={{ labelKey: 'name', valueKey: '_id', options: genres }}
          icon="fas fa-list-music"
          label={translate('song.genre')}
          modalField="genre"
          modalType={GENERIC_TYPES.selector}
          modalProps={{ labelKey: 'name', valueKey: '_id', options: genres }}
          tableFormatter={(genre) => <p>{genre?.name}</p>}
        />
        <GenericBackofficeElement
          field="releaseDate"
          filterType={GENERIC_TYPES.datepicker}
          icon="fad fa-calendar-alt"
          label={translate('song.releaseDate')}
          modalType={GENERIC_TYPES.datepicker}
          modalProps={{ dateFormat: DATE_FORMAT_TO_SHOW }}
          tableProps={{ sort: true }}
          tableFormatter={(releaseDate) => <p>{moment(releaseDate).format(DATE_FORMAT_TO_SHOW)}</p>}
        />
        <GenericBackofficeElement
          field="album"
          filterType={GENERIC_TYPES.input}
          icon="far fa-album"
          label={translate('song.album')}
          modalType={GENERIC_TYPES.input}
          tableProps={{ sort: true }}
        />
        <GenericBackofficeElement
          field="imgUrl"
          hideOnFilter
          icon="far fa-file-image"
          label={translate('song.image')}
          modalProps={{ showPreview: true, accept: 'image/*' }}
          modalType={GENERIC_TYPES.dropzone}
          tableFormatter={(image, element) => <img className="table-img" src={image} alt={element.name} />}
        />
        <GenericBackofficeElement
          field="songUrl"
          hideOnFilter
          hideOnTable
          icon="fal fa-file-music"
          label={translate('song.songUrl')}
          modalProps={{ showPreview: true, accept: 'audio/*' }}
          modalType={GENERIC_TYPES.dropzone}
        />
        <GenericBackofficeElement
          field="active"
          filterProps={{ enableHalfChecked: true }}
          filterType={GENERIC_TYPES.checkbox}
          hideOnModal
          icon="fas fa-phone-alt"
          label={translate('song.active')}
          tableProps={{ formatter: (cell) => <ActiveInactiveIcon active={cell} />, sort: true }}
        />
        <GenericBackofficeElement
          field="deleted"
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

      <Modal
        footer={
          <>
            <Button
              {...forms.buttons.save}
              onClick={() => {
                if (!validateSong(selectedSong).hasErrors) {
                  onSave(selectedSong, () => setShowModal(false));
                }
              }}
              disabled={loadingUpdate}
            />
            <Button
              {...forms.buttons.cancel}
              onClick={onHide}
              type={BUTTON_TYPES.gray}
              inverted
              disabled={loadingUpdate}
            />
          </>
        }
        header={translate('song.editSong')}
        loading={loadingUpdate}
        onHide={onHide}
        show={showModal}>
        <form>
          <Input
            error={modalNameInputError}
            icon="fas fa-signature"
            placeholder={translate('song.name')}
            type="text"
            value={selectedSong?.name}
            onChange={(name) => {
              setSelectedSong({ ...selectedSong, name });
              setModalNameInputError(false);
            }}
          />
          <Search
            addOptionTooltip={null}
            error={modalArtistInputError}
            inputIcon="fas fa-user-music"
            maxSelected={1}
            noResultsText={translate('song.noArtistsFound')}
            noSearchText={translate('song.noSearchText')}
            onAddOption={(option, idx, newOptions) => {
              setFilteredModal(filteredModal.filter((el) => el._id !== option._id));
              setSelectedArtistModal(newOptions);
              setSelectedSong({ ...selectedSong, newOptions });
              setModalArtistInputError(false);
            }}
            onRemoveSelected={() => {
              setSelectedArtistModal([]);
              setSelectedSong({ ...selectedSong, artist: null });
            }}
            onSearch={(val) => {
              searchArtists(val).then((newArtists) => {
                setFilteredModal(newArtists);
              });
            }}
            optionImageIcon="fas fa-user-music"
            optionKey="_id"
            optionTextKey="name"
            placeholder={translate('song.artist')}
            removePlayerTooltip={null}
            results={filteredModal}
            selectedOptions={selectedArtistModal}
            selectedOptionImageIcon="fas fa-user-music"
          />
          <>
            <Selector
              error={modalGenreInputError}
              labelKey="name"
              valueKey="_id"
              value={selectedSong?.genre}
              icon="fas fa-list-music"
              placeholder={translate('song.genre')}
              onChange={(genre) => {
                setSelectedSong({ ...selectedSong, genre });
                setModalGenreInputError(false);
              }}
              options={genres}
            />
          </>
          <Datepicker
            dateFormat={DATE_FORMAT_TO_SHOW}
            placeholder={translate('song.releaseDate')}
            value={selectedSong?.releaseDate}
            onChange={(releaseDate) => {
              setSelectedSong({ ...selectedSong, releaseDate });
            }}
          />
          <Input
            icon="far fa-album"
            value={selectedSong?.album}
            placeholder={translate('song.album')}
            onChange={(album) => {
              setSelectedSong({ ...selectedSong, album });
            }}
          />
          <Dropzone
            accept="image/*"
            icon="far fa-file-image"
            onFilesChange={(imgUrl) => {
              setSelectedSong({ ...selectedSong, imgUrl });
            }}
            showPreview
            text={translate('song.image')}
            value={selectedSong?.imgUrl}
          />
          <Dropzone
            accept="audio/*"
            icon="fal fa-file-music"
            showPreview
            onFilesChange={(songUrl) => {
              setSelectedSong({ ...selectedSong, songUrl });
            }}
            text={translate('song.songUrl')}
            value={selectedSong?.songUrl}
          />
        </form>
      </Modal>
    </Page>
  );
};

export default BackofficeSongsPage;
