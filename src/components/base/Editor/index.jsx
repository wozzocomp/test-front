import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import DefaultToolbar from './defaultToolbar';
import { uploadImage } from '../../../actions/general';
import { showErrorToast } from '../../../utils/toasts';
import { translate } from '../../../utils/translate/translator';

export const FORMAT_TYPES = {
  ALIGN: 'align',
  BACKGROUND: 'background',
  BLOCKQUOTE: 'blockquote',
  BOLD: 'bold',
  BULLET: 'bullet',
  CODE_BLOCK: 'code-block',
  COLOR: 'color',
  FONT: 'font',
  HEADER: 'header',
  IMAGE: 'image',
  INDENT: 'indent',
  ITALIC: 'italic',
  LINK: 'link',
  LIST: 'list',
  SCRIPT: 'script',
  SIZE: 'size',
  STRIKE: 'strike',
  UNDERLINE: 'underline',
};

const Editor = ({
  value,
  onChange,
  id,
  readOnly,
  toolbarId,
  handlers,
  customFormats,
  customToolbar,
  toolbalAdditionalContent,
  ...rest
}) => {
  const refEditor = useRef();

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      const editor = refEditor.current.getEditor();

      // Save current cursor state
      const range = editor.getSelection(true);

      uploadImage(file)
        .then((image) => {
          // Insert uploaded image
          editor.insertEmbed(range.index, 'image', image);
        })
        .catch((err) => {
          const message = err?.message.includes(
            'GraphQL error: File truncated as it exceeds the 10000000 byte size limit.',
          ) ?
            translate('common.imageTooLarge') :
            translate('common.imageError');
          showErrorToast(message);
        });
    };
  };

  // Quill modules to attach to editor See https://quilljs.com/docs/modules/
  const modules = {
    toolbar: {
      container: `#${toolbarId}`,
      handlers,
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = customFormats || [
    FORMAT_TYPES.ALIGN,
    FORMAT_TYPES.BACKGROUND,
    FORMAT_TYPES.BLOCKQUOTE,
    FORMAT_TYPES.BOLD,
    FORMAT_TYPES.BULLET,
    FORMAT_TYPES.CODE_BLOCK,
    FORMAT_TYPES.COLOR,
    FORMAT_TYPES.FONT,
    FORMAT_TYPES.HEADER,
    FORMAT_TYPES.IMAGE,
    FORMAT_TYPES.INDENT,
    FORMAT_TYPES.ITALIC,
    FORMAT_TYPES.LINK,
    FORMAT_TYPES.LIST,
    FORMAT_TYPES.SCRIPT,
    FORMAT_TYPES.SIZE,
    FORMAT_TYPES.STRIKE,
    FORMAT_TYPES.UNDERLINE,
  ];

  return (
    <>
      {customToolbar || (
        <DefaultToolbar additionalContent={toolbalAdditionalContent} uploadImage={imageHandler} {...rest} />
      )}
      <ReactQuill
        ref={refEditor}
        id={id}
        value={value}
        formats={formats}
        modules={modules}
        onChange={onChange}
        readOnly={readOnly}
        className="wozzo-editor"
        theme="snow"
      />
    </>
  );
};

Editor.defaultProps = {
  customFormats: null,
  customToolbar: null,
  handlers: undefined,
  id: 'editor',
  readOnly: false,
  toolbalAdditionalContent: null,
  toolbarId: 'defaultToolbar',
  value: null,
  onChange: () => true,
};

Editor.propTypes = {
  customFormats: PropTypes.array, // Quill editor formats See https://quilljs.com/docs/formats/
  customToolbar: PropTypes.any, // Custom toolbar component
  handlers: PropTypes.object, // https://quilljs.com/docs/modules/toolbar/#handlers
  id: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  toolbalAdditionalContent: PropTypes.any, // Custom toolbar component
  toolbarId: PropTypes.string,
  value: PropTypes.string,
};

export default Editor;
