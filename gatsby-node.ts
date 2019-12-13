import { createPages } from './src/gatsby-api/create-pages';
import { addSlugToPage } from './src/gatsby-api/add-slug-to-page';

exports.createPages = createPages;

exports.onCreateNode = addSlugToPage;
