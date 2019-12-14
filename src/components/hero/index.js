import React from 'react'
import Slider from "react-slick"
import { connect } from 'react-redux'

import { isMobileSSR } from '../../utils/device-detect'
import Button from '../button'
import styles from './styles.module.scss'
import CategoryLinks from '../shared/CategoryLinks'
import truncate from '../../utils/truncate';

const Hero = ({ articles, addArticle, notifyPostExists }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        // autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }

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

    const clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let heroHeight = clientHeight;

    if (clientHeight < 520) {
        heroHeight = 620;
    }
    const maxTitleChars = isMobileSSR ? 50 : 70;


    return (
        <div className={styles.hero} style={isMobileSSR ? { height: `calc(${heroHeight}px - var(--header-height))`} : {}}>
            <Slider {...settings}>
            {
                articles.map(({title, abstract, link, author, categories, date}) => (
                    <div key={title}>
                        <div className='container'>
                            <article className={styles.slide} style={isMobileSSR ? { height: `calc(${heroHeight}px - var(--header-height))`} : {}}>
                                <h2
                                    className={styles.title} 
                                    to={link}
                                >{truncate.apply(title, [maxTitleChars, true])}</h2>
                                <small>By {author} / {date} / In <CategoryLinks categories={categories}></CategoryLinks></small>
                                <div className={styles.panel}>
                                    <Button 
                                        type='link' 
                                        to={link} 
                                        color='--color-secondary' 
                                        opaque
                                    >Read on</Button>
                                    <Button
                                        type='button' 
                                        onClick={() => addToReadingList({title, abstract, link, author, categories, date})}
                                        color='--color-secondary' 
                                        opaque={false}
                                    >Read later</Button>
                                </div>
                                <div className={styles.letter}>{title[0].toUpperCase()}</div>
                            </article>
                        </div>
                    </div>
                ))
            }
            </Slider>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      addArticle: () => dispatch({ type: 'ADD_POST_START' }),
      notifyPostExists: () => dispatch({ type: 'POST_ALREADY_EXISTS' })
    }
}

export default connect(null, mapDispatchToProps)(Hero)