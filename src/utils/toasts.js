import { TOAST_TYPES } from '@wozzocomp/base-comps';

let toast = null;

export const setToast = (t) => (toast = t);

/**
 * Shows a Success toast
 * @param {string} message text to show
 */
export const showSuccessToast = (message) => {
  toast.add(message, TOAST_TYPES.success);
};

/**
 * Shows a Error toast
 * @param {string} message text to show
 */
export const showErrorToast = (message) => {
  toast.add(message, TOAST_TYPES.error);
};

/**
 * Shows a Warning toast
 * @param {string} message text to show
 */
export const showWarningToast = (message) => {
  toast.add(message, TOAST_TYPES.warning);
};

/**
 * Shows a Info toast
 * @param {string} message text to show
 */
export const showInfoToast = (message) => {
  toast.add(message, TOAST_TYPES.info);
};

/**
 * Shows a Default toast
 * @param {string} message text to show
 */
export const showDefaultToast = (message) => {
  toast(message);
};
