---
title: Hello World
date: "2015-05-01T22:12:03.284Z"
abstract: Simple post about Hello world!
categories: ["Lol"]
---

This is my first post on my new fake blog! How exciting!

```jsx
{articles.map(post => (
    <article key={post.link}>
        <hr />
        <PostTitle {...post} />
        <div className={styles.abstract}>
            <p>{truncate.apply(post.abstract, [maxAbstractChars, true])}</p>
        </div>
        <div className={styles.panel}>
            <Button type='link' to={post.link} color='--color-primary' opaque>Read on</Button>
            {isReadingList && <Button type='button' onClick={() => removeFromReadingList(post.title)}>Remove from list</Button>}
            {!isReadingList && <Button type='button' onClick={() => addToReadingList(post)}>Read later</Button>}
        </div>
    </article>
))}
```

I'm sure I'll write a lot more interesting things in the future.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](http://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

![Chinese Salty Egg](./salty_egg.jpg)
