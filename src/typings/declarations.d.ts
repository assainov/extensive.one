declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'gatsby-plugin-dark-mode' {
  export const ThemeToggler: React.FC;
  export default ThemeToggler;
}
