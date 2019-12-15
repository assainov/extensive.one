import { createPages } from './src/gatsby-hooks/create-pages';
import { addSlugToPage } from './src/gatsby-hooks/add-slug-to-page';

exports.createPages = createPages;

exports.onCreateNode = addSlugToPage;
