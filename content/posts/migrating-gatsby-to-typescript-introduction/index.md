---
title: "Introduction: Migrating Gatsby Site to TypeScript"
date: "2019-12-23T01:13:03.284Z"
abstract: My reflections on migrating Gatsby to TypeScript. Why and when one must consider migrating. Where to look for resources.
categories: ["Gatsby", "TypeScript"]
featured: true
---

For the past year, I've been working on a few medium-large scale [Gatsby](https://www.gatsbyjs.org/) projects. While Gatsby itself and the surrounding ecosystem have been amazing, with every new change request or feature for a project, it felt like the system was becoming more and more fragile.

Gatsby itself is a JavaScript framework, which is based on [React](https://reactjs.org/). React, in turn, has a huge ecosystem and community around it. It's easy to *fine-tune* your project with trending libraries and packages. Then, there are various data sources, each having their integration challenges and fragile content. Add to the mix multiple developers with different background, and you can easily blow up your project introducing accidental complexity.

Is Gatsby really enterprise ready? - I was asking myself.

Fortunately, I was about to launch this blog powered by Gatsby and just before going live, I decided to convert it to TypeScript. The intention was curiosity and challenge rather than objective reasoning. I had already worked on a few TypeScript + React + Redux projects before, and I thought Gatsby + TypeScript must be an easy one.

Having converted this blog, I concluded two things:

1. TypeScript + Gatsby is the future of enterprise headless CMS
2. The common ground of Gatsby + TypeScript is yet to be established

I suggest we briefly go over them. Shall we?

## The future of enterprise headless CMS

Let's take a look [why corporates usually choose expensive traditional CMS](https://www.npgroup.net/blog/why-enterprise-organizations-choose-expensive-cms-platforms-off-the-shelf-liabilities/) systems today:

1. They often need to outsource accountability - someone else needs to be responsible to reduce organizational complexity (much like in programming). This suggests why agencies exist.
2. Technical benefits such as customization, personalization, performance, development speed and quality.

It just so happens that the listed benefits perfectly play with headless CMS and Gatsby! Well... Except maybe the last two: speed of development and quality.

As I mentioned in the beginning, it's quite easy to make Gatsby site complex as it grows - and with complexity come bugs, and with bugs come slow iterations.

> It's easy to make Gatsby site complex as it grows - and with complexity come bugs, and with bugs come slow iterations.

Now, let's check how TypeScript can help.

TypeScript introduces strict type checking. Type checking catches most of your runtime errors early during development. Runtime errors cause build errors. How much time have you wasted this year waiting for the build only to get an error: `TypeError: Cannot read property 'split' of undefined` ? Don't even ask me..

TypeScript can safe guard your components from unreliable content coming from the CMS, given you enable strict mode. There is a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-codegen/) that automatically generates interfaces for your GraphQL queries. Those interfaces have nullable properties by default - because you never know what can come from the CMS. And TS compiler's strict mode simply won't let you compile the code unless you provide default prop values. This in turn makes your components more robust.

As the application becomes data-intensive, there are dozens of props and state values flying around. You never know what the prop can actually be - you must either go up the component stream and check the graphql query or console.log it. With TypeScript, all you need is to hover on the prop to see its type and possibly the structure. TypeScript helps you understand your website's data flow better.

Working with multiple developers becomes easier as every one now follows strict type-checking and maintains inherent quality.

But what do the benefits above really mean for your overall project success? Overall, TypeScript helps you sustain the quality and development speed as your application grows.

> TypeScript helps you sustain the quality and development speed as your application grows.

Now, some people are always reluctant of introducing new technologies. They might say something like:

1. Let's not introduce new technology. It will slow down the recruitment and onboarding process.
2. It will be harder to find resources in case we face challenges.
3. How will we integrate TypeScript with legacy code?

The first two points mean they haven't worked with TypeScript.

It takes only 3-5 days to learn the features of TypeScript, because it's a superset of JavaScript - you already know 90%.

TypeScript has a grown community that works will all sorts of JavaScript technologies be it Node.js, React or React Native.

Third point is also debatable. If you're reading this article, maybe you're already experiencing problems with extendibility and maintainablity of your Gatsby project, in which case you need to make some design decisions, and if so, why not rewrite core modules in TypeScript such as Gatsby API files?

You can also rewrite the entire app in TypeScript. We aren't talking about the full stack application here. It's a frontend with several dozens of components, pages and templates altogether at most. The question is, how much more are you going to maintain the project?

With that being said, I believe Gatsby is a great solution for the decoupled frontend website as long as it stays small. Once it starts growing, at some point maintainability becomes a bottleneck.   That's why if enterprises choose headless CMS and Gatsby, they should consider TypeScript as well.

## Gatsby + TypeScript usage is yet to be established

When I had just started migrating my blog to TypeScript, I had certain expectations from the community in regards to TypeScript + Gatsby integration. And while I found a lot of resources, they were scattered throughout the net based on a problem at hand.

There was no a defacto way of the migration. 100% of all the Gatsby starters and tutorials did not use TypeScript for Gatsby files, which is very unfortunate since they play an integral role in the whole project! `gatsby-node.js` for example can easily reach 300 lines of code, collecting data from hundreds of endpoints. It needs to be type-checked! 

I also had other questions for the migration:

- How to setup Gatsby to work with TypeScript?
- How to convert gatsby files to TypeScript?
- How to resolve Sass module imports with TypeScript?
- How not to write redundant interfaces for already typed GraphQL queries?
- How to validate GraphQL result coming from CMS to avoid getting crashing the build if CMS content is missing?
- How to recover from errors during the build in Gatsby + TypeScript project?

With all the questions above, I decided to tackle them one by one, and to share the highlights in the upcoming series Migrating Gatsby to TypeScript:

- [Part 1: Setting up Gatsby project with TypeScript](https://www.extensive.one/setting-up-gatsby-project-with-typescript)
- [Part 2: Converting Gatsby Config and Node Modules to TypeScript](https://www.extensive.one/converting-gatsby-config-and-node-api-to-typescript/)
- Part 3: Converting Gatsby Pages to TypeScript
- Part 4: Testing Gatsby + TypeScript Project with Jest & Cypress
- Part 5: Centralized Error Handling with Gatsby and TypeScript
- Part 6: Dynamic CMS Page Generation with Gatsby and TypeScript
- Part 7: Optimizing CMS Images with Gatsby Image and TypeScript

To complement the series with real life examples, I have migrated a regular [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) to the TypeScript version: [gatsby-extensive-starter-typescript](https://github.com/assainov/gatsby-extensive-starter-typescript), which you can you as a boilerplate for your next Gatsby + TypeScript project.

In this introductory article, you saw why TypeScript is a necessary choice when working with enterprise Gatsby projects. TypeScript brings back the iteration speed and quality to large data-driven websites. However, at the time of writing this article, there is no defacto way of building Gatsby sites with TypeScript. That's what I attempt to change in my upcoming series and the [Gatsby Extensive Starter with TypeScript.](https://github.com/assainov/gatsby-extensive-starter-typescript)

I hope you are stocked for the series, and if so, consider subscribing!

Next part: [Setting up Gatsby project with TypeScript](https://www.extensive.one/setting-up-gatsby-project-with-typescript)