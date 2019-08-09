import React from 'react';
import '../../css/font.css'
import '../../css/Text.css';

type TextProps = {
  value?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  onChange?: (value: string | null) => void;
  onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
  isMobile?: boolean;
}

const Text = ({value, isDisabled = false, isVisible = true, onChange, onClick, isMobile}: TextProps) => {
  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  if (isVisible === false) {
    return null;
  }
  const _getClassName = () => {
    return isMobile ? 'kuc-input-text-mobile' : 'kuc-input-text';
  };

  return (
    <input
      type="text"
      value={value}
      className={_getClassName()}
      onClick={onClick}
      onChange={_onChange}
      disabled={isDisabled}
    />
  );
};

export default Text;