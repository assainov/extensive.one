import { IArticle } from '../pages';

export function deleteFromReadingList(title: string): void {
  let serializedPosts = localStorage.getItem('posts');

  if (!serializedPosts || !serializedPosts.length) {
    serializedPosts = '[]';
  }

  let posts = JSON.parse(serializedPosts) as IArticle[];

  if (posts) {
    posts = posts.filter(post => post.title !== title);
  }

  localStorage.setItem('posts', JSON.stringify(posts));

  // @ts-ignore
  this.props.removeArticle();

  // @ts-ignore
  if (this.props.onRemovePost) {
    // should find better solution
    // @ts-ignore
    this.props.onRemovePost(title); // pass to parent to rerender the list
  }
}

export function saveToReadingList(article: IArticle): void {
  let serializedPosts = localStorage.getItem('posts');

  if (!serializedPosts || !serializedPosts.length) {
    serializedPosts = '[]';
  }

  const posts = JSON.parse(serializedPosts) as IArticle[];

  const postExists = posts.some(post => post.title === article.title);

  if (postExists) {
    // @ts-ignore
    this.props.notifyPostExists();
  } else {
    posts.push(article);
  }
  localStorage.setItem('posts', JSON.stringify(posts));

  // @ts-ignore
  this.props.addArticle();
}
