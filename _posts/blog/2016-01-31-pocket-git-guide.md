---
layout: post
title: Pocket Git Guide
subtitle: 
date:   2016-01-31
permalink: 
author:
abstract: A brief description why and how to use Git.
---
Git will help you doing the following things with a computer:

<div class="grid"><div class="col-1-2 first">
<strong>Personal</strong>
<ul>
<li>Keep track of file revisions when working iteratively (this is often referred to as version control).</li>
<li>Safely experiment because you can always step back to the previous save version.</li>
<li>No need to give your files version indicating names, like essay_v1.txt, essay_v2.txt and so on.</li>
<li>It doesn´t play a role if you want to work on a single file or a multi-file project organized in many folders.</li>
<li>Convert any file or folder structure into a project that is under version control.</li>
<li>Work consistently on multiple different operating systems, like MacOS, Linux and Windows.</li>
</ul>
</div>
<div class="col-1-2 last">
<strong>Team</strong>
<ul>
<li>Share your work with others and keep track of their changes by enforcing the same set of rules for managing versions. This will work even with thousands of persons on a big project, like the Linux operating system kernel, but also scales down nicely for a small team.</li>
<li>When sharing your work with others, you can work on your local computer without being always connected to a shared repository, only synchronizing eventually.</li>
<li>No centralized locking of files - all team members have their own working copy on their own computers which allows each of them to work independently.</li>
</ul>
</div>
</div>

Git is free and nowadays there are services to share your work with other persons, like for example via [GitHub](http://github.com).

Convenient commands to achieve something with Git are:

<div class="grid">
<div class="col-1-3 first"><hr><strong>Create new local repository</strong><br>
Move to the folder which should be the parent folder of you project
<pre><code>cd /path/to/repo/</code></pre>
Then initialize the Git repository with 
<pre><code>git init</code></pre></div>
<div class="col-2-3 last"><hr><strong>Clone existing repository to local</strong><br>
Move to the folder under which the new project should be cloned <pre><code>cd /path/to/parent/</code></pre>Then clone the existing repository into the parent <pre><code>git clone &lt;repo&gt;</code></pre>Where &lt;repo&gt; is any of the following:<div class="extra-small">
ssh://[user@]host.xz[:port]/path/to/repo.git/<br>
git://host.xz[:port]/path/to/repo.git/<br>
http[s]://host.xz[:port]/path/to/repo.git/<br>
ftp[s]://host.xz[:port]/path/to/repo.git/<br>
rsync://host.xz/path/to/repo.git/
</div>
</div>

<div class="col-1-1 first last"><hr><strong>Stage contents</strong>
<pre><code>git add</code></pre></div>

<div class="col-1-1 first last"><hr><strong>Commit contents</strong>
<pre><code>git commit</code></pre></div>
</div>



