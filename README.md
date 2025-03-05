  <h3 align="center">Beginner Astro Starter Kit</h3>

  <p align="center">
    This beginner kit includes a pre-configured Astro setup, along with five pages filled with CodeStitch components. Everything is ready to go right from the start, offering a fantastic introduction to the advantages of a Static Site Generator, complete with LESS preprocessing. This kit also leverages the power of a few Astro tools such as Astro components, scoped styling and scripting etc.
    <br/>
    <br/>
    <a href="https://beginner-astro-kit.netlify.app/" target="_blank">View Live Result</a>
  </p>

  <p align="center">
    Created and maintained by <a href="https://github.com/BuckyBuck135" target="_blank">BuckyBuck135</a>
  </p>

## Table of Contents

- [Overview](#overview)
- [Getting Started](#gettingStarted)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Project Structure](#projectStructure)
  - [Project Tree](#projectTree)
  - [Source Files and Folders](#sourceFilesAndFolders)
- [Expanding the Project](#expandingTheProject)
  - [Reusing Code](#reusingCode)
  - [Adding More Pages](#addingMorePages)
  - [Navigation via Front Matter](#navigationViaFrontMatter)
  - [Built-in Astro components](#builtinastrocomponents)
  - [Preloading Images](#preloadingimages)
  - [CSS](#css)
  - [Adding View Transitions](#addingViewTransitions)
  - [Adding Netlify Forms](#netlifyforms)

- [Deployment](#deployment)
- [Acknowledgments](#acknowledgments)
- [Conclusion](#conclusion)

<a name="overview"></a>

## Overview

This beginner kit includes a pre-configured <a href="https://www.astro.build">Astro</a> environment, which
allows for repeated components, centralized data and greater room to scale as your clients grow. The kit runs the latest major Astro version, v5.

An example website has also been provided, with easy substitution of website sections possible through the use of <a href="https://codestitch.app/">CodeStitch's
vanilla component library</a>. This kit aims to get any project off the ground in as little time as possible, with deployment being possible in as little as two
minutes.

<a name="gettingStarted"></a>

## Getting Started

1. At the top right of the <a href="https://github.com/ItsEthanH/intermediate-starter-less">GitHub Repository</a>, click the green _Use this template_ button,
   then click _Create a new repository_.
2. Follow the instructions to create a new repository, using this repo as a template.
3. When created, clone the repository to your local machine.
4. Run `npm install` to install all dependencies.
5. Run `npm run dev` to start the project and spin up a development server on `localhost:4321`.


Next, it is recommended to update `data/client.json` with some new information about this project. Through the power of templating, the
project's `<head>` and contact information will automatically be filled out, providing a first peek into some of the benefits of SSGs.

You can find all of CodeStitches `:root` variables, as well as .cs-topper, .cs-title and .cs-text, within the `root` stylesheet. Feel free to adjust these, or use our Content Flair micro-stitches, to update site-wide styles quickly.

<a name="prerequisites"></a>

## Prerequisites

Only the vanilla web technologies are _required_ before using this kit, with some familiarity with Astro and React-style Components and props also recommended, but not essential. A lot of the leg-work for the non-vanilla technologies has been done for you. If you would like to read up on some of these things, we recommend the following resources:

1. [Astro's Documentation](https://docs.astro.build/en/getting-started/)
2. [Astro Crash Course in 20 Minutes!](https://www.youtube.com/watch?v=zrPVTf761OI)

<a name="features"></a>

## Features

* Runs on Astro v5
* Leveraging components, props and scoped styles, as demonstrated in `/src/components/Landing.astro` for example
* Leveraging Astro's built-in components such as `<Picture />`, as demonstrated in `/src/components/Landing.astro` for example
* Automatically generates `sitemap-index.xml` and `sitemap-0.xml` thanks to the [Astro Sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)


This kit ships the following packages:
* [LESS](https://www.npmjs.com/package/less) - Less makes a few convenient additions to the CSS language, but you can also simply write standard CSS if you wish.
* [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/#_top) - Automatically generates `sitemap-index.xml` and `sitemap-0.xml`. Make sure to replace `https://yourwebsite.com` with your actual site URL in `astro.config.mjs` and `robots.txt`.

* 
<a name="projectStructure"></a>

## Project Structure

Astro leverages an opinionated folder layout for your project. Every Astro project root should include the following directories and files:
* `src/*` - Your project source code (components, pages, styles, scripts etc.)
* `public/*` - Your non-code, unprocessed assets (fonts, icons, etc.)
* `package.json` - A project manifest.
* `astro.config.mjs` - An Astro configuration file. (recommended)

<a name="projectTree"></a>

### Project Tree
```
.
├── public/
|   |—— assets/
|   |   |—— favicons/
|   |   |—— fonts/
|   |   |—— images/
|   |   └── svgs/
|   |—— _redirects
|   |—— robots.txt
├── src/
|   ├── assets/
|   |   └── images/
|   ├── js/
|   |   └── nav.js
|   ├── components/
│   ├── data/
│   │   ├── client.json
│   │   └── navData.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
|   └── styles/
├── .astro.config.mjs
└── .postcss.config.cjs
```

<a name="sourceFilesAndFolders"></a>

### Source Files and Folders

#### `public/*`
The `public/` directory is for files and assets in your project that do not need to be processed during Astro’s build process. The files in this folder will be copied into the build folder untouched, and then your site will be built.

This behavior makes `public/` ideal for common assets like images and fonts, or special files such as`_redirects` and `robots.txt`.

- \_redirects - To configure redirects. Read more on <a href="https://docs.netlify.com/routing/redirects/">Netlify</a>
- content/ - Data to render pages from, such as the blog.
- robots.txt - Instructions for site crawlers. Make sure to replace `https://yourwebsite.com` with your actual site URL

You can place CSS and JavaScript in your public/ directory, but be aware that those files will not be bundled or optimized in your final build.


#### `src/*`
The `src/` folder is where most of your project source code lives. This includes:

* Pages
* Layouts
* Astro components
* UI framework components (React, etc.)
* Styles (CSS, Sass)
* Markdown

Astro processes, optimizes, and bundles your src/ files to create the final website that is shipped to the browser. Unlike the static public/ directory, your src/ files are built and handled for you by Astro.

##### `src/assets`
Contains all assets you want optimized by Astro (such as assets used in `<Picture />` components for example) must be placed in `src`.

`public/assets/images/blog` is where the images uploaded on the CMS will be stored.

##### `src/components`
Components are reusable units of code for your HTML pages. These could be Astro components, or UI framework components like React or Vue. It is common to group and organize all of your project components together in this folder.

##### `src/data`
This directory contains data files that are accessible within any template throughout the project. 
* `client.js` holds some information you may wish to define for a client. It's important to fill this file out with the correct information for your client, as many HTML meta tags, the sitemap, and robots.txt all use data from this file.

* `navData.json` holds data to create the navigation of your site. See more information in the [navigation via navData.json section](#navigationViaFrontMatter)


##### `src/layouts`
Layouts are Astro components that define the UI structure shared by one or more pages. The `BaseLayout.astro` file acts as a giant wrapper for each individual page, where the content is injected through the `<slot /> `component.


##### `src/pages`
Pages are a special kind of component used to create new pages on your site. A page can be an Astro component, or a Markdown file that represents some page of content for your site.

##### `src/styles`
It is a common convention to store your CSS, Less or Sass files in a `src/styles` directory.

#### `package.json` and `package-lock.json`
The project's manifest. Standard NodeJS package files, containing the dependencies needed for the project to work.

#### `node_modules/*`
Created after you run `npm install`. This directory contains the code for all the dependencies that power this kit. It comes as standard with any NodeJS-powered project, much like the `package.json` and `package-lock.json` files. You can safely ignore this directory in your day-to-day work.


<a name="expandingTheProject"></a>

## Expanding the Project

Aimed towards freelancers, this kit was made with scalability and flexibility in mind, suiting a range of websites and client needs. As such, it is your choice
whether you'd rather make small tweaks to the existing site, or clear all the page content and build a site all over again. Outlined below are some best
practices for when it comes to building on top of this kit:

<a name="reusingCode"></a>

### Reusing Code

The main advantage to using an SSG is it brings **components**, popularized by JavaScript-heavy frameworks like React or Vue, to vanilla HTML. As Astro is being used, componentization can be achieved through JSX-like syntax within .astro files.
Components are located inside the `src/components` folder.
For example, there is a call to action at the bottom of most pages. As the text content or styles don't need to change, `<CTA />` was
used. 
To create a component, create a file in `src/components`. For example `src/components/CTA.astro`. Copy the HTML and CSS over from CodeStitch. Your component is now ready to use.
Import it in the page where you need it: 
```JSX
---
import BaseLayout from "../layouts/BaseLayout.astro";
import CTA from "../components/CTA.astro";
---
```

And call it in the JSX markup with `<CTA />`.

As the text content or styles don't need to change, a simple component was used. If this wasn't the case, and we wanted the CTA text to change, we'd start to think about passing props to `<CTA />`.

An example of passing props to components is `Landing />`.

In `about.astro`:

```JS
---
// import the component
import Landing from "@components/Landing.astro";
---

<BaseLayout
  // props
>
  // Use the <Landing /> component
  <Landing 
    title="About Us" // pass a `title` prop to the component
    image={optimizedImage} // pass an 'image' prop to the component
  />
```

In `Landing.astro`
```JS
---
const { title } = Astro.props // Destructure the incoming props. Note the `Astrop.props` syntax
---

<h1 id="home-h">{title}</h1> // Consumme the title prop in the JSX markup

```

<a name="addingMorePages"></a>

### Adding More Pages

Thanks to Astro Navigation, adding new pages is as simple as adding a file to src/pages/ and including it in the `data/navData.json` file:

```
---
// optional JavaScript frontmatter
---

<BaseLayout
  title="Page title for <title> and OG tags"
  description="Description for <meta> and OG tags"
  preloadImg={import("/assets/images/imagename.format")}
>
    <!-- Page HTML goes here, without a <main> wrapper -->
</BaseLayout>
```

Starting from the top, you can see some data enclosed in --- tags. This is known as the page's front matter, which provides additional data to when it comes to
rendering your pages.

<a name="navigationViaFrontMatter"></a>

### Navigation via navData.json

The header navigation in the project is powered by the `navData.json` file. Each page in the navigation should be included as an item with a `key` property (page title to be displayed) and a `url` property (include a trailing slash). 

To add subpages, include a `children` property. The `children` property should be an array that contains more page objects (i.e., object containing a `key` and `url` property.) If a page has a `children` array property is specified, a dropdown will be created, providing
a Navigation + Dropdown Stitch is being used (see below). Navigations will render in order.

> If you wish to use an alternative Navigation stitch, you are welcome to swap out the .cs-ul-wrapper div in the Stitch for the one in the Starter Kit. This
> will allow you to continue to reap the benefits of eleventyNavigation. You can find the .cs-ul-wrapper div below

```
<div class="cs-ul-wrapper">
  <ul id="cs-expanded" class="cs-ul" aria-expanded="false">
    {
      navData.map((entry) => (
        <li
          class:list={[
            "cs-li",
            { "cs-dropdown": entry.children?.length > 0 },
          ]}
          tabindex={entry.children?.length > 0 ? "0" : ""}
        >
          <a
            href={entry.url}
            class:list={[
              "cs-li-link",
              { "cs-active": Astro.url.pathname === entry.url },
            ]}
          >
            {entry.key}
          </a>
          {entry.children?.length > 0 && (
            <ul class="cs-drop-ul">
              {entry.children.map((child) => (
                <li class="cs-drop-li">
                  <a href={child.url} class="cs-li-link cs-drop-link">
                    {child.key}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))
    }
  </ul>
</div>
```

Should you wish to use your own method of rendering the navigation, you can still take advantage of applying the "active" class styles by using a smaller amount of code within the class attribute of the link:

```
<li class="cs-li">
  <a href="/about" class:list={["cs-li-link, {"cs-active": "/about/" === Astro.url.pathname }]}>About</a>
</li>
```

In this case, if the page slug is "about", the .cs-active class will be applied. You're welcome to adjust the page slug value to whatever you require ("blog", "/", "services", etc)

For dropdowns, you can use a similar philosophy on the parent dropdown's class attribute, checking to see if any of the child pages are active before applying the styles. An example of this is shown below:

```
<li class="nav-link cs-li cs-dropdown">
  <span class:list={["cs-li-link nav-link",
    { 'cs-active': '/annapolis-custom-closets/' === Astro.url.pathname },
    { 'cs-active': '/bowie-custom-closets/' === Astro.url.pathname },
    { 'cs-active': '/severna-park-custom-closets/' === Astro.url.pathname },
    { 'cs-active': '/odenton-custom-closets/' === Astro.url.pathname },
  ]}>
    Areas Served
    <img class="cs-drop-icon" src="/assets/images/down.svg" alt="dropdown icon" width="15" height="15" decoding="async" aria-hidden="true">
  </span>
  <ul class="cs-drop-ul">
    <li class="cs-drop-li">
      <a href="/annapolis-custom-closets" class="cs-drop-link">Annapolis</a>
    </li>
    <li class="cs-drop-li">
      <a href="/bowie-custom-closets" class="cs-drop-link">Bowie</a>
    </li>
    <li class="cs-drop-li">
      <a href="/severna-park-custom-closets" class="cs-drop-link">Severna Park</a>
    </li>
    <li class="cs-drop-li">
      <a href="/odenton-custom-closets" class="cs-drop-link">Odenton</a>
    </li>
  </ul>
</li>
```

In the above example, we're checking to see if the active page slug matches any of the four that are listed (annapolis, bowie, severna or odenton) and applying the .cs-active style to the parent if it does.

Below the front matter is the page content. Any code that should be sent to a layout should be enclosed in the layout's component:

```
<BaseLayout>
  <!-- Your html/jsx code here -->
</BaseLayout>
```

This code will be inserted into the `<slot />` component in BaseLayout.astro.

<a name="builtinastrocomponents"></a>

### Built-in Astro components: `<Image />` and `<Picture />`
This kit demonstrates the use of the built-in `<Picture />` component, [for which you can read the documentation here](https://docs.astro.build/en/guides/images/#picture-). However, not all native HTML `<picture>` elements from CodeStitch blocks have been replaced with Astro's `<Picture />` components. CodeStich users will have to decide which one they want to use:
 * CodeStich blocks already have fully-functionning `<picture>` elements that perform very well. However, the developper will have to do a time-consumming job with resizing and reformatting assets.
 * Astro's `<Picture />` components must be manually written to replace stitches. On the other hand, they automatically process and optimize assets, which allows the developper to skip the resizing and reformatting preparation work.


<a name="preloadingimages"></a>

### Preloading images
THis kit takes advantage of the [preload attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload) to fetch images above the fold with higher priority, resulting in improved performances and reducing flashes of unstyled content. Preloaded images are used on the index page for the hero image as well as on all other pages in the Landing component.

You will notice this snippet at the top of every `.astro` page:

```jsx
---
// Optimize our landing image and pass it as props to the BaseLayout (for preloading) and Landing (for rendering)
import {getOptimizedImage} from "../js/utils"
import landingImage from "../assets/images/landing.jpg" // <-- THE PATH TO THE ASSET YOU WANT TO PRELOAD - The asset must live in src
const optimizedImage = await getOptimizedImage(landingImage)
---
```

You only need to change the path of the asset you want to preload. The rest is managed behind the scenes.

<a name="css"></a>

### CSS

Most CSS will be written within the components it's styling via **scoping**. Scoped styles are compiled behind-the-scenes to only apply to HTML written inside of that same component. The CSS that you write inside of an Astro component is automatically encapsulated inside of that.

As this kit runs `less`, we can use the `<style lang="less"></style>` tags to write our nested CSS. If you prefer non-nested, traditional CSS you can use standard `<style></style>` tags in your `.astro` files.

You can also use standalone `less` or `.css` stylesheets, located in `src/styles`. Don't forget to import them in your component.

<a name="addingViewTransitions"></a>

### Adding View Transitions
Opt in to using view transitions on individual pages by importing and adding the <ViewTransitions /> routing component to <head> in <BaseLayout />.

```html
---
import { ViewTransitions } from 'astro:transitions';
---
<html lang="en">
  <head>
    <title>My Homepage</title>
    <ViewTransitions />
  </head>
  <body>
    <h1>Welcome to my website!</h1>
  </body>
</html>
```

#### Using scripts with View Transitions enabled
When you add view transitions to an existing Astro project, some of your scripts may no longer re-run after page navigation like they did with full-page browser refreshes. 

The <ViewTransition /> router fires a number of events on the document during navigation. These events provide hooks into the lifecycle of navigation, allowing you to do things like show indicators that a new page is loading, override default behavior, and restore state as navigation is completing.

You can use the `astro:page-load` event to run code on every page navigation, for example to set up event listeners that would otherwise be lost during navigation.

```js
<script>
  document.addEventListener('astro:page-load', () => {
    // This runs on first page load and after every navigation.
    setupStuff(); // e.g. add event listeners
  });
</script>
```

For an in-depth explanation, please refer <a href="https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions">to the documentation.

<a name="netlifyforms"></a>

### Adding Netlify Forms
We recommend hosting your site on Netlify to enjoy some of their perks, like automatic form detection.

Netlify’s serverless form handling allows you to manage forms without extra API calls or additional JavaScript. Once enabled, the built-in form detection feature allows our build system to automatically parse your HTML at deploy time, so there’s no need for you to make an API call or include extra JavaScript on your site.

Learn how to set them up on [Netlify documentation](https://docs.netlify.com/forms/setup/)


<a name="deployment"></a>

## Deployment

1. Ensure the astro.config.mjs, client.json, robots.txt and \_redirects have been filled out. 
2. Navigate to your Netlify Admin Panel, click _Add new site | Import an existing project_
3. Follow the instructions to connect your GitHub repository to Netlify.

<a name="acknowledgments"></a>

## Acknowledgments

The author would like to acknowledge:
* [Cedar Studios](https://github.com/cedar-studios) - Their [Intermediate-Astro-Kit-LESS](https://github.com/cedar-studios/Intermediate-Astro-Kit-LESS/tree/master) is the base of this template.
* [CodeStitch](https://codestitch.app/) - Some of their free stitches were used in this template.
<a name="Conclusion"></a>

## Conclusion
I hope that this kit will prove useful to you. If you have any questions or would like to connect, feel free to reach out on [Twitter](https://twitter.com/BuckyBuck135) or at `buckybuck` on Discord.

Happy coding!
***Geoffrey***
