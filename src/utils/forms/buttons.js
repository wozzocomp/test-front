import { BUTTON_TYPES } from '@wozzocomp/base-comps';
import { translate } from '../translate/translator';

const cancel = {
  iconLeft: 'fas fa-times',
  inverted: true,
  text: translate('common.cancel'),
  type: BUTTON_TYPES.gray,
};

const changePassword = {
  text: translate('user.changePassword'),
  icon: 'fas fa-lock',
};

const save = {
  iconLeft: 'fas fa-save',
  text: translate('common.save'),
};

export default {
  cancel,
  changePassword,
  save,
};
