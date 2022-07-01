import React, { useState } from 'react';
import { FS18 } from '../../../../rules/index';

interface ButtonProps {
  text: string;
  className?: string;
  isDisable?: boolean;
  isCancel?: boolean;
  onImage?: boolean;
  isWhite?: boolean;
  isOrange?: boolean;
  isEdit?: boolean;
  isNoneBorder?: boolean;
  onClick: () => void;
}

const Button: (props: ButtonProps) => JSX.Element = (props: ButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisable ? true : false}
      style={{
        fontSize: 18,
        lineHeight: '130%',
        textTransform: 'uppercase',
        transition: 'all 0.5s ease',
        border:
          (hover && props.isCancel) || (hover && props.onImage)
            ? '1px solid #FF5631'
            : hover && props.isNoneBorder
            ? 'none'
            : (hover && props.isWhite) || (hover && props.isOrange)
            ? '1px solid #252525'
            : hover
            ? 'none'
            : props.isNoneBorder
            ? 'none'
            : props.isCancel || props.isWhite
            ? '1px solid #252525'
            : props.onImage || props.isOrange
            ? '1px solid #fff'
            : 'none',
        backgroundColor:
          hover && props.isEdit
            ? '#252525'
            : hover && props.isOrange
            ? '#fff'
            : hover
            ? '#FF5631'
            : props.isCancel
            ? 'inherit'
            : props.isDisable
            ? '#AAADB2'
            : props.onImage
            ? 'inherit'
            : props.isWhite
            ? '#ffffff'
            : props.isOrange
            ? '#FF5631'
            : '#252525',
        color:
          hover && props.isOrange
            ? '#252525'
            : hover
            ? '#fff'
            : props.isCancel || props.isWhite
            ? '#252525'
            : props.onImage
            ? '#fff'
            : '#fff',
        cursor: props.isDisable ? 'default' : 'pointer',
      }}
      className={props.className} //передаются только значения высоты, ширины и внутренних отступов
      onMouseOver={(): void => setHover(true)}
      onMouseOut={(): void => setHover(false)}
    >
      {props.text}
    </button>
  );
};

export default Button;
