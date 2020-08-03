import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

// https://quilljs.com/docs/formats/
export const TOOLBAR_TYPES = {
  ALIGN: 'ql-align',
  BACKGROUND: 'ql-background', // background color
  BLOCKQUOTE: 'ql-blockquote',
  BOLD: 'ql-bold',
  BULLET: 'ql-bullet',
  CLEAN: 'ql-clean',
  CODE: 'ql-code',
  CODE_BLOCK: 'ql-code-block',
  COLOR: 'ql-color', // text color
  FONT: 'ql-font',
  HEADER: 'ql-header', // h1, h2, h3..
  IMAGE: 'ql-image',
  INDENT: 'ql-indent',
  ITALIC: 'ql-italic',
  LINK: 'ql-link',
  LIST: 'ql-list',
  SCRIPT: 'ql-script',
  SIZE: 'ql-size',
  STRIKE: 'ql-strike',
  UNDERLINE: 'ql-underline',
  VIDEO: 'ql-video',
  UPLOAD: 'ql-upload',
};

export const TOOLBAR_OPTIONS = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strike: 'strike',
  blockquote: 'blockquote',
  code_block: 'code-block',
  list_ordered: 'ordered',
  list_bullet: 'bullet',
  script_sub: 'sub',
  script_super: 'super',
  indent_minus: '-1',
  indent_plus: '+1',
  h1: '1',
  h2: '2',
  h3: '3',
  image: 'image',
  normal: 'normal',
  font_default: 'default',
  font_serif: 'serif',
  font_monospace: 'monospace',
  align_left: 'left',
  align_right: 'right',
  align_justify: 'justify',
  align_center: 'center',
  clean: 'clean',
  text_color: 'color',
  background_color: 'background',
};

const DefaultToolbar = ({
  additionalContent,
  alignCenter,
  alignJustify,
  alignLeft,
  alignRight,
  backgroundColor,
  blockquote,
  bold,
  clean,
  codeBlock,
  fontDefault,
  fontMonospace,
  fontSerif,
  h1,
  h2,
  h3,
  image,
  indentMinus,
  indentPlus,
  italic,
  listBullet,
  listOrdered,
  normal,
  scriptSub,
  scriptSuper,
  strike,
  textColor,
  underline,
  textColorsArray,
  backgroundColorsArray,
  uploadImage,
}) => {
  const getDefaultFont = () => {
    if (fontDefault) {
      return '';
    }

    if (fontSerif) {
      return TOOLBAR_OPTIONS.font_serif;
    }

    if (fontMonospace) {
      return TOOLBAR_OPTIONS.font_monospace;
    }

    return null;
  };

  return (
    <div id="defaultToolbar" className="default-toolbar">
      {(bold || italic || underline || strike) && (
        <span className="ql-formats">
          {bold && <button className={TOOLBAR_TYPES.BOLD} label={TOOLBAR_OPTIONS.bold} type="button" />}
          {italic && <button className={TOOLBAR_TYPES.ITALIC} label={TOOLBAR_OPTIONS.italic} type="button" />}
          {underline && <button className={TOOLBAR_TYPES.UNDERLINE} label={TOOLBAR_OPTIONS.underline} type="button" />}
          {strike && <button className={TOOLBAR_TYPES.STRIKE} label={TOOLBAR_OPTIONS.strike} type="button" />}
        </span>
      )}

      {(blockquote || codeBlock) && (
        <span className="ql-formats">
          {blockquote && (
            <button className={TOOLBAR_TYPES.BLOCKQUOTE} label={TOOLBAR_OPTIONS.blockquote} type="button" />
          )}
          {codeBlock && (
            <button className={TOOLBAR_TYPES.CODE_BLOCK} label={TOOLBAR_OPTIONS.code_block} type="button" />
          )}
        </span>
      )}

      {(listOrdered || listBullet) && (
        <span className="ql-formats">
          {listOrdered && (
            <button
              className={TOOLBAR_TYPES.LIST}
              value={TOOLBAR_OPTIONS.list_ordered}
              label={TOOLBAR_OPTIONS.list_ordered}
              type="button"
            />
          )}
          {listBullet && (
            <button
              className={TOOLBAR_TYPES.LIST}
              value={TOOLBAR_OPTIONS.list_bullet}
              label={TOOLBAR_OPTIONS.list_bullet}
              type="button"
            />
          )}
        </span>
      )}

      {(scriptSub || scriptSuper) && (
        <span className="ql-formats">
          {scriptSub && (
            <button
              className={TOOLBAR_TYPES.SCRIPT}
              value={TOOLBAR_OPTIONS.script_sub}
              label={TOOLBAR_OPTIONS.script_sub}
              type="button"
            />
          )}
          {scriptSuper && (
            <button
              className={TOOLBAR_TYPES.SCRIPT}
              value={TOOLBAR_OPTIONS.script_super}
              label={TOOLBAR_OPTIONS.script_super}
              type="button"
            />
          )}
        </span>
      )}

      {(indentMinus || indentPlus) && (
        <span className="ql-formats">
          {indentMinus && (
            <button
              className={TOOLBAR_TYPES.INDENT}
              value={TOOLBAR_OPTIONS.indent_minus}
              label={TOOLBAR_OPTIONS.indent_minus}
              type="button"
            />
          )}
          {indentPlus && (
            <button
              className={TOOLBAR_TYPES.INDENT}
              value={TOOLBAR_OPTIONS.indent_plus}
              label={TOOLBAR_OPTIONS.indent_plus}
              type="button"
            />
          )}
        </span>
      )}

      {(h1 || h2 || h3 || normal) && (
        <span className="ql-formats">
          <select className={TOOLBAR_TYPES.HEADER} defaultValue="">
            {h1 && <option value={TOOLBAR_OPTIONS.h1} label={TOOLBAR_OPTIONS.h1} />}
            {h2 && <option value={TOOLBAR_OPTIONS.h2} label={TOOLBAR_OPTIONS.h2} />}
            {h3 && <option value={TOOLBAR_OPTIONS.h3} label={TOOLBAR_OPTIONS.h3} />}
            {normal && <option value="" label={TOOLBAR_OPTIONS.normal} />}
          </select>
        </span>
      )}

      {(textColor || backgroundColor) && (
        <span className="ql-formats">
          {textColor && textColorsArray && (
            <select className={TOOLBAR_TYPES.COLOR} defaultValue="">
              <option value="" label="#000000" />
              {textColorsArray.map((color) => (
                <option key={color} value={color} label={color} />
              ))}
            </select>
          )}
          {backgroundColor && backgroundColorsArray && (
            <select className={TOOLBAR_TYPES.BACKGROUND} defaultValue="">
              <option value="" label="#ffffff" />
              {backgroundColorsArray.map((color) => (
                <option key={color} value={color} label={color} />
              ))}
            </select>
          )}
        </span>
      )}

      {(fontDefault || fontSerif || fontMonospace) && (
        <span className="ql-formats">
          <select className={TOOLBAR_TYPES.FONT} defaultValue={getDefaultFont()}>
            {fontDefault && <option value="" label={TOOLBAR_OPTIONS.font_default} />}
            {fontSerif && <option value={TOOLBAR_OPTIONS.font_serif} label={TOOLBAR_OPTIONS.font_serif} />}
            {fontMonospace && <option value={TOOLBAR_OPTIONS.font_monospace} label={TOOLBAR_OPTIONS.font_monospace} />}
          </select>
        </span>
      )}

      {(alignLeft || alignRight || alignJustify || alignCenter) && (
        <span className="ql-formats">
          <select className={TOOLBAR_TYPES.ALIGN} defaultValue="">
            {alignLeft && <option value="" label={TOOLBAR_OPTIONS.align_left} />}
            {alignRight && <option value={TOOLBAR_OPTIONS.align_right} label={TOOLBAR_OPTIONS.align_right} />}
            {alignJustify && <option value={TOOLBAR_OPTIONS.align_justify} label={TOOLBAR_OPTIONS.align_justify} />}
            {alignCenter && <option value={TOOLBAR_OPTIONS.align_center} label={TOOLBAR_OPTIONS.align_center} />}
          </select>
        </span>
      )}

      {image && !uploadImage && (
        <span className="ql-formats">
          <button
            className={TOOLBAR_TYPES.IMAGE}
            value={TOOLBAR_OPTIONS.image}
            label={TOOLBAR_OPTIONS.image}
            type="button"
          />
        </span>
      )}
      {image && !!uploadImage && (
        <span className="ql-formats">
          <button
            className={TOOLBAR_TYPES.UPLOAD}
            value={TOOLBAR_OPTIONS.image}
            label={TOOLBAR_OPTIONS.image}
            type="button"
            onClick={(e) => {
              uploadImage();
              e.preventDefault();
              e.stopPropagation();
            }}>
            <i className="fas fa-image" />
          </button>
        </span>
      )}

      {clean && (
        <span className="ql-formats">
          <button
            className={TOOLBAR_TYPES.CLEAN}
            value={TOOLBAR_OPTIONS.clean}
            label={TOOLBAR_OPTIONS.clean}
            type="button"
          />
        </span>
      )}

      {additionalContent}
    </div>
  );
};

DefaultToolbar.defaultProps = {
  additionalContent: null,
  alignCenter: true,
  alignJustify: true,
  alignLeft: true,
  alignRight: true,
  backgroundColor: true,
  blockquote: true,
  bold: true,
  clean: true,
  codeBlock: true,
  fontDefault: true,
  fontMonospace: true,
  fontSerif: true,
  h1: true,
  h2: true,
  h3: true,
  image: true,
  indentMinus: true,
  indentPlus: true,
  italic: true,
  listBullet: true,
  listOrdered: true,
  normal: true,
  scriptSub: true,
  scriptSuper: true,
  strike: true,
  textColor: true,
  underline: true,
  uploadImage: null,
  textColorsArray: [
    '#e60000',
    '#ff9900',
    '#ffff00',
    '#008a00',
    '#0066cc',
    '#9933ff',
    '#ffffff',
    '#facccc',
    '#ffebcc',
    '#ffffcc',
    '#cce8cc',
    '#cce0f5',
    '#ebd6ff',
    '#bbbbbb',
    '#f06666',
    '#ffc266',
    '#ffff66',
    '#66b966',
    '#66a3e0',
    '#c285ff',
    '#888888',
    '#a10000',
    '#b26b00',
    '#b2b200',
    '#006100',
    '#0047b2',
    '#6b24b2',
    '#444444',
    '#5c0000',
    '#663d00',
    '#666600',
    '#003700',
    '#002966',
    '#3d1466',
  ],
  backgroundColorsArray: [
    '#e60000',
    '#ff9900',
    '#ffff00',
    '#008a00',
    '#0066cc',
    '#9933ff',
    '#000000',
    '#facccc',
    '#ffebcc',
    '#ffffcc',
    '#cce8cc',
    '#cce0f5',
    '#ebd6ff',
    '#bbbbbb',
    '#f06666',
    '#ffc266',
    '#ffff66',
    '#66b966',
    '#66a3e0',
    '#c285ff',
    '#888888',
    '#a10000',
    '#b26b00',
    '#b2b200',
    '#006100',
    '#0047b2',
    '#6b24b2',
    '#444444',
    '#5c0000',
    '#663d00',
    '#666600',
    '#003700',
    '#002966',
    '#3d1466',
  ],
};

DefaultToolbar.propTypes = {
  additionalContent: PropTypes.any,
  alignCenter: PropTypes.bool,
  alignJustify: PropTypes.bool,
  alignLeft: PropTypes.bool,
  alignRight: PropTypes.bool,
  backgroundColor: PropTypes.bool,
  blockquote: PropTypes.bool,
  bold: PropTypes.bool,
  clean: PropTypes.bool,
  codeBlock: PropTypes.bool,
  fontDefault: PropTypes.bool,
  fontMonospace: PropTypes.bool,
  fontSerif: PropTypes.bool,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  image: PropTypes.bool,
  indentMinus: PropTypes.bool,
  indentPlus: PropTypes.bool,
  italic: PropTypes.bool,
  listBullet: PropTypes.bool,
  listOrdered: PropTypes.bool,
  normal: PropTypes.bool,
  scriptSub: PropTypes.bool,
  scriptSuper: PropTypes.bool,
  strike: PropTypes.bool,
  textColor: PropTypes.bool,
  underline: PropTypes.bool,
  textColorsArray: PropTypes.array,
  backgroundColorsArray: PropTypes.array,
  uploadImage: PropTypes.func,
};

export default DefaultToolbar;
