import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.scss';

interface IGenericButton {
  type: 'link' | 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  children: string;
  to?: string;
  onClick?: () => void;
}

const Button: React.FC<IGenericButton> = ({ type, to, children, onClick, className, disabled }) => {
  const renderLink = (
    <Link to={to || `#`} className={`${styles.button} ${className}`}>
      {children}
    </Link>
  );

  const renderButton = (
    <button onClick={onClick} disabled={disabled} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );

  const renderInput = <input type="submit" value={children} className={`${styles.button} ${className}`} />;

  if (type === 'link' && to !== undefined) {
    return renderLink;
  }

  if (type === 'button' && onClick !== undefined) {
    return renderButton;
  }

  return renderInput;
};

export default Button;
