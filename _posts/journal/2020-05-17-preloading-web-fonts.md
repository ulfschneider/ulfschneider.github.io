---
title: Preloading web fonts
categories: journal
---
I learned about preloading web fonts! On my website, I´m loading fonts via `@font-face` with `font-display:swap`. Like so:

```
@font-face {
    font-family: 'IBM Plex Serif';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/ibm-plex-serif-v8-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
         url('/fonts/ibm-plex-serif-v8-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */    
    font-display: swap;
  }
```

`swap` means, the browser will use a fallback font to display the text until the web font has fully downloaded. The behavior is named “flash of unstyled text”, or FOUT. It makes the initial display of information to the user fast, but creates an annoying *flash*, once the custom font is downloaded and injected into the page.

*What I want to have* is an immediate stable rendering and no flicker when a user transitions between pages of my website. Therefore I was investigating the options of `font-display`, which are `block`, `swap`, `fallback`, `optional`, and `auto`. 

- `block` will hide *(block)* the text until the webfont is fully downloaded. This creates an effect named "flash of invisible text", or FOIT.
- `swap` will use the fallback font to display and swap it with the custom font once its downloaded. This is likely to create a page reflow. The effect is named "flash of unstyled text", of FOIT.
- `fallback` is a compromise between `swap` and `block`. The browser hides *(blocks)* the text for about 100ms. If the webfont has not been downloaded to that point, the browser will display a fallback font and replace it later when the custom font has been downloaded.
- `optional` is like `fallback` but allows the browser to decide whether to use the custom font at all. It might be, the custom font is not swapped in. This is useful in situations of slow network connection.
- `auto` means the browser will decide about the the font display strategy.

Any of the `font-display` options can create FOUT or FOIT. FOUT will disturb the experience of the design and both, FOUT and FOIT, interrupt of the readers flow. 

The amount of FOUT or FOIT can be reduced by preloading the fonts. It will increase the initial render time of a page, but the flicker of fonts is not recognizable anymore. When you are using a service worker in your page you will probably anyway cache the fonts (still with caching, I found you have FOUT or FOIT if you don´t use the preload strategy).

Preload a web font by putting the following link in the head of your web page:

```
<link rel="preload" href="/fonts/ibm-plex-serif-v8-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
```

I´m using multiple of those links for my site now, though it´s considered best practice to limit the amount of preload-fonts to keep bandwidth requirements low and speed high (as always). I´m very satisfied with the resulting user experience.

Refer to [Zach´s explanation of preload](https://www.zachleat.com/web/preload/) to get some statistics of initial render times on his website. There is also [this article](https://ashton.codes/preload-google-fonts-using-resource-hints/) by Chris Ashton, where he describes his difficulties with preloading Google web fonts. But I didn´t went to deep into Chris´ article because I´m [self-hosting](/journal/google-webfonts-helper/) the fonts used on my website.