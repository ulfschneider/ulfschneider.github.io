---
title: A customizable Jekyll RSS feed which can be used with GitHub Pages
categories: journal
---
RSS is a good thing. It simplifies to overview information that is produced by potentially many different sources. If someone has an RSS feed on her blog, you can easily subscribe to that feed and have all her published contents in your RSS reader – along with the published contents of other creators.

I´m building my blog with Jekyll, and hosting it via GitHub Pages. Out of the box, Jekyll doesn´t have RSS feed support. One way to publish a feed is to use the <code>jekyll-feed</code> plugin, which is supported by GitHub Pages. You only need to activate it in your <code>_config.yml</code>:

~~~
plugins:
  - jekyll-feed
~~~

Once Jekyll rebuilds your site with the plugin activated, your RSS feed is available under the URL path <code>/feed.xml</code>.

## Limitations of jekyll-feed
However, <code>jekyll-feed</code> has some limitations:
- It makes all pages and posts available in your feed. You cannot exclude anything, or have different feeds, like for links, a reading list, and maybe your journal.
- Even posts that have a front matter setting of <code>published: no</code> are immediately visible in your feed.
- I´m referencing things inside of my blog with relative URLs. E.g., <code>/tools</code>, or <code>/images/we-are-riding-the-bullitt.jpg</code>. Those relative links remain so in your feed. But a relative link doesn´t work inside of an RSS reader, which means an image is not displayed or a link to an article is not functioning. In the RSS reader, you need absolute links.

## My own feed generator
To overcome those limitations, I decided not to use <code>jekyll-feed</code> and instead write my own tiny RSS generator. My generator is publishing posts and no pages. Here is what you have to do to use it:

For each feed you want to publish, you have to create a markdown file inside of the <code>_pages</code> folder – for example, a feed with the name <code>/feed.rss</code> that publishes the categories *thoughts, tools, reading, and journal* is represented by a file <code>feed.md</code> with the following front matter contents:

~~~
---
layout: postfeed
permalink: /feed.rss
categories: [thoughts, tools, reading, journal]
---
~~~

The address of the published feed, <code>/feed.rss</code> in this case, doesn´t need to correspond to the name of the feed definition file, <code>feed.md</code> in our example. You define the feed address with the <code>permalink</code> setting inside of the feed definition file. 

You can have multiple feed definition files with different content filters and subsequently different feed addresses.

The filtering of posts is not only working for categories. You can also filter for tags. The following feed definition is valid:

~~~
---
layout: postfeed
permalink: /feed.rss
tags: [thoughts, tools, reading, journal]
---
~~~

A logical OR filter combination of categories and tags is in the form:

~~~
---
layout: postfeed
permalink: /feed.rss
categories: [tools]
tags: [reading, journal]
---
~~~

In the above <code>feed.md</code> file, a layout named <code>postfeed</code> is referenced. The layout file needs to be available under the name <code>postfeed.html</code> in the <code>_layouts</code> folder. The content of <code>postfeed.html</code> is the tiny programm that creates the feed. It is this:

~~~
{% raw %}<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
 <channel>
   <title>{{ site.title }}</title>
   <description></description>
   <link>{{ site.url }}{{ site.baseurl }}</link>
   <pubDate>{{ site.time | date_to_rfc822 }}</pubDate>
   <lastBuildDate>{{ site.time | date_to_rfc822 }}</lastBuildDate>
   <generator>Jekyll v{{ jekyll.version }}</generator>

   {% assign imageUrl = "src=&quot;" %}
   {% assign imageUrl = imageUrl | append: site.url %}
   {% assign imageUrl = imageUrl | append: site.baseurl %}
   {% assign imageUrl = imageUrl | append: "/" %}

   {% assign posturl = "href=&quot;" %}
   {% assign postUrl = postUrl | append: site.url %}
   {% assign posturl = postUrl | append: site.baseurl %}
   {% assign posturl = postUrl | append: "/" %}

   {% assign pageMeta = "" | split: ""%}
   {% assign pageMeta = pageMeta | push: page.tags %}
   {% assign pageMeta = pageMeta | push: page.categories %}
   {% assign pageMeta = pageMeta | uniq %}

   {% for meta in pageMeta %}
     {% for p in site.posts %}
       {% if p.published != false%}
         {% if meta == "." or p.tags contains meta or p.categories contains meta %}
           <item>
             <title>{{ p.title | xml_escape }}</title>
             <author>{{ p.author }}</author>
             <description>
               {% if p.subtitle %}&lt;p&gt;{{ p.subtitle }}&lt;/p&gt;{% endif %}
               {{ p.content | xml_escape | replace: "src=&quot;/",imageUrl | replace: "href=&quot;/",postUrl}}
             </description>
             <pubDate>{{ p.date | date_to_rfc822 }}</pubDate>
             <link>{{ p.url | prepend: site.baseurl | prepend: site.url }}</link>
             <guid isPermaLink="true">{{ p.url | prepend: site.baseurl | prepend: site.url }}</guid>
             {% for tag in p.tags %}
               <category>{{ tag | xml_escape }}</category>
             {% endfor %}
             {% for c in p.categories %}
               <category>{{ c | xml_escape }}</category>
             {% endfor %}
           </item>
         {% endif %}
       {% endif %}
     {% endfor %}
   {% endfor %}
 </channel>
</rss>{% endraw %}
~~~

Just copy the code above, store it inside of <code>_layouts/postfeed.html</code> and you are ready to use your new RSS feed.
