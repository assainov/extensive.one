import * as React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import { config } from '../../../content/website/config';

const {
  themeModes: { darkMessage, lightMessage },
} = config;

interface IThemeRenderProps {
  theme: 'light' | 'dark';
  toggleTheme: (newTheme: string) => void;
}

const ThemeSwitcher: React.FC = () => (
  <ThemeToggler>
    {({ theme, toggleTheme }: IThemeRenderProps): JSX.Element => (
      <span onClick={(): void => toggleTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? darkMessage : lightMessage}
      </span>
    )}
  </ThemeToggler>
);

export default ThemeSwitcher;
