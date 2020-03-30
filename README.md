My personal site, to be found at [ulf.codes](http://ulf.codes). Built and maintained by using Jekyll for site generation. Hosted on GitHub Pages.

The following directories and their contents are Copyright Ulf Schneider. You may not reuse anything therein without my permission:

-   `/_pages`
-   `/_posts`
-   `/i`

Some configurations, like site title for example, can be made in `/_config.yml`.

Feel free to use all other HTML and CSS as you like. If you do use them, a link back to <https://github.com/ulfschneider/ulfschneider.github.io> would be appreciated, but is not required.

## Explanation of used Front Matter variables

**layout:** list|default

-   _list_ will summarize posts or pages which have a front matter variable _tags_ that contains a value which is equal to the entry _tags_ inside of the list layout
-   _default_ may be used for any page or any post to be shown inside of the _list_ layout

**title:** notitle|A text string
The title of a page or a post. Any post of layout type _post_ and a value in title will appear on the _blog_ page.  And any _post_ of layout-type _gallery_ or _image_ will also appear in the navigation structure. A value of _notitle_ or _false_ or just empty will hide the display of the title.

**subtitle:** A text string

The sub title of a page or a post.

**topnav:** A text string

Only pages with _topnav_ entry will appear on the top-navigation.

**abstract:** A paragraph.

A short abstract for posts of layout type _post_. Will appear in the blog summary for those posts.

**forward:** A forward URL

To be used in posts of layout type _post_. Will produce an entry in the blog overview but forward not to the post but to the given forward address when clicking on the title.

**categories:** A comma-separated text string list

Tagging for the content. When you specify a category for a post of type _gallery_, the gallery will display all posts of type _image_ that contain the same category.

