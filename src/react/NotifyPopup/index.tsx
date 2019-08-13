import React from 'react';

import '../../css/font.css'
import '../../css/NotifyPopup.css';
import IconButton from '../IconButton/index';

type NotifyPopupProps = {
  text?: string;
  type?: string;
  isMobile: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const NotifyPopup = ({text, type, isDisabled, isVisible, onClick, onClose, isMobile}: NotifyPopupProps) => {
  const _handleClosePopup = () => {
    if (isDisabled) {
      return false;
    }
    onClose && onClose();
    return true;
  };

  const _getStyleByType = () => {
    const style = {
      bgClass: '',
      color: ''
    };
    switch (type) {
      case 'success':
        style.bgClass = 'bg-success';
        style.color = 'green';
        break;
      case 'infor':
        style.bgClass = 'bg-infor';
        style.color = 'blue';
        break;
      default:
        style.bgClass = 'bg-danger';
        style.color = 'red' ;
    }
    return style;
  };

  const _getClassName = () => {
    if (isMobile) {
      return 'kuc-notify-mobile';
    }

    const className = [
      'kuc-notify',
      _getStyleByType().bgClass
    ];
    return className.join(' ').trim();
  };

  const _onClick = () => {
    if (isDisabled) {
      return false;
    }
    onClick && onClick();
    return true;
  };

  if (isVisible === false) {
    return null;
  }

  return (
      <div className={_getClassName() + (isVisible && ' show')}>
        <div className={isMobile ? '' : 'kuc-notify-title'} onClick={_onClick}>
          {
            isMobile ? <ul><li>{text}</li></ul> : text
          }
        </div>
        <div className="kuc-close-button">
          <IconButton onClick={_handleClosePopup} type="close" color={isMobile ? 'transparent' : _getStyleByType().color} />
        </div>
      </div>
  );
};

export default NotifyPopup;