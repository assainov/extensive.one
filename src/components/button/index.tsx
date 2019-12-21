import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.scss';

interface IGenericButton {
  color?: '--color-primary' | '--color-secondary' | '--color-tertiary' | '--color-text-secondary';
  opaque: boolean;
  type: 'link' | 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  children: string;
  to?: string;
  onClick?: () => void;
}

const Button: React.FC<IGenericButton> = ({ color, opaque, type, to, children, onClick, className, disabled }) => {
  //  Give opaque styles by default
  let backgroundColor = `var(${color})`;

  let textColor =
    color === '--color-primary' || color === '--color-tertiary'
      ? 'var(--color-text-secondary)'
      : 'var(--color-primary)';

  let borderColor = backgroundColor;

  if (!opaque) {
    backgroundColor = 'transparent';
    textColor = `var(${color})`;
    borderColor = `var(${color})`;
  }

  const buttonStyles = { backgroundColor, color: textColor, border: `1px solid ${borderColor}` };

  const renderLink = (
    <Link to={to || `#`} style={buttonStyles} className={`${styles.button} ${className}`}>
      {children}
    </Link>
  );

  const renderButton = (
    <button style={buttonStyles} onClick={onClick} disabled={disabled} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );

  const renderInput = (
    <input style={buttonStyles} type="submit" value={children} className={`${styles.button} ${className}`} />
  );

  if (type === 'link' && to !== undefined) {
    return renderLink;
  }

  if (type === 'button' && onClick !== undefined) {
    return renderButton;
  }

  return renderInput;
};

export default Button;
