My personal site, to be found at [ulf.codes](http://ulf.codes). Built and maintained by using Jekyll for site generation. Hosted on GitHub Pages.

The following directories and their contents are Copyright Ulf Schneider. You may not reuse anything therein without my permission:

* `/_posts`
* `/i`

The blog is using the font [Input Sans](http://input.fontbureau.com). This font is not for free. I´ve purchased it at [Webtype](http://webtype.com) and included a CSS provided by them into `_includes/head.html`.
You have to remove this CSS and purchase the font on your own or simply use a different font. In any case you need to remove the link to `//cloud.webtype.com` from the file `/_includes/head.html`. You have to add your own link to Webtype or use an entirely different font. Additional adjustments need to be taken in `/css/main.css`, here you find some variable settings for the font, font-sizes and line-heights.

The favicon is referred to from the file '/_includes/head.html`. 

Some configurations, like site title for example, can be made in `/_config.yml`.

Feel free to use all other HTML and CSS as you please. If you do use them, a link back to https://github.com/ulfschneider/ulfschneider.github.io would be appreciated, but is not required.

Explanation of used Front Matter variables
---

**layout:** blog|collection|default|gallery|image|index|post|tweets

* *blog* will summarize posts which are of layout type *post*
* *collection* will summarize all posts which are of layout type *image* or of type *gallery*
* *default* may be used for any page
* *gallery* will summarize posts of layout type *image*
* *index* is meant for a single page which will be the start or index page of the site
* *post* is for blog posts
* *tweets* is for a page to display the twitter timeline of the user who is specified in the _config.yml by twitter_username.

**title:** A text string
The title of a page or a post. Any page with a title will appear  in the top navigation. Any post of layout type *post* and a value in title will appear on the *blog* page. And any *post* of layout-type *gallery* or *image* will also appear in the navigation structure.

**subtitle:** A text string

The sub title of a page or a post.

**menu:** A text string

Even a page without a *title* will appear on the top-navigation, if it has a value that describes what the menu entry will be for the page.

**index:** A text string

Only pages with an *index* entry will appear on the site *index*.

**nofooter:** true|false|empty

If true, no footer navigation will be displayed for the post or page.

**nositenav:** true|false|empty

To be used in pages. If true, no site navigation will be displayed for the page.

**nonav:** true|false|empty

If true for any page or post, that page or post will not appear as a part inside of the site navigation. But *nonav* will not override the *index* setting.

**abstract:** A paragraph.

A short abstract for posts of layout type *post*. Will appear in the blog summary for those posts.

**autoplay:** true|false|empty

To be used in posts of type *gallery*. Will display all images inside of the gallery as an auto playing slide animation.

**reversed:** true|false|empty

To be used in posts of type *gallery*. Will order the images in reversed order, which means oldest first.

**thumburl:** A path to an image

To be used in posts of type *image*. Will be used inside of a gallery to display a thumb image link to the post.

**slideurl:** A path to an image

To be used in posts of type *image*. Will be displayed when the image is part of a slide show in a gallery, no matter if autoplay or not.

**tags:** A comma-separated text string list

Tagging for the content. When you specify a tag for a post of type *gallery*, the gallery will display all posts of type *image* that contain the same tag.

**noslides:** true|false|empty

To be used in galleries to indicate if a slide show is allowed or not. By default slide shows are allowed.
 



