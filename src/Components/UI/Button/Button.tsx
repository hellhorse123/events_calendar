import React from 'react';

interface ButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

const Button: (props: ButtonProps) => JSX.Element = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} style={{ border: 'none' }} className={props.className}>
      {props.text}
    </button>
  );
};

export default Button;
