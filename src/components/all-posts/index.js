import React from "react"
import { connect } from 'react-redux'

import PostTitle from '../post-title';
import Button from '../button';
import styles from './styles.module.scss'
import truncate from '../../utils/truncate'
import { isMobileSSR } from '../../utils/device-detect'

const Posts = ({ articles, addArticle, removeArticle, notifyPostExists, heading='Latest Posts', isReadingList, onRemovePost }) => {

    const addToReadingList = article => {
        let posts = JSON.parse(localStorage.getItem('posts')) || []

        const postExists = posts.some(post => post.title === article.title)

        if (postExists) {
            notifyPostExists()
        } else {
            posts.push(article)
        }
        localStorage.setItem('posts', JSON.stringify(posts))
        
        addArticle()
    }
    const removeFromReadingList = title => {
        let posts = JSON.parse(localStorage.getItem('posts'))

        if (posts) {
            posts = posts.filter(post => post.title !== title)
        }

        localStorage.setItem('posts', JSON.stringify(posts))
        
        removeArticle()
        onRemovePost(title) // pass to parent to rerender the list
    }
    
    const maxAbstractChars = isMobileSSR ?  250 : 300;
    
    return (
        <div className={styles.allPosts}>
            {articles.length > 0 ? (
                <h2 dangerouslySetInnerHTML={{__html: heading}} />
            ) : (
                isReadingList && (
                    <>
                        <h2>No articles in the list...</h2>
                        <p className={styles.noResults}>Articles are added when you press Read Later.</p>
                    </>
                )
            )}
            {articles.map(post => (
                <article key={post.link}>
                    <hr />
                    <PostTitle {...post} />
                    <div className={styles.abstract}>
                        <p>{truncate.apply(post.abstract, [maxAbstractChars, true])}</p>
                    </div>
                    <div className={styles.panel}>
                        <Button type='link' to={post.link} color='--color-primary' opaque>Read on</Button>
                        {isReadingList && <Button type='button' onClick={() => removeFromReadingList(post.title)} color='--color-primary' opaque={false}>Remove from list</Button>}
                        {!isReadingList && <Button type='button' onClick={() => addToReadingList(post)} color='--color-primary' opaque={false}>Read later</Button>}
                    </div>
                </article>
            ))}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      addArticle: () => dispatch({ type: 'ADD_POST_START' }),
      removeArticle: () => dispatch({ type: 'REMOVE_POST' }),
      notifyPostExists: () => dispatch({ type: 'POST_ALREADY_EXISTS' })
    }
}

export default connect(null, mapDispatchToProps)(Posts)