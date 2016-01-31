---
layout: post
title: Pocket Git Guide
subtitle: Why and how
date:   2016-01-31
permalink: 
author:
abstract: A brief description why and how to use Git.
---
Git will help you doing the following things with your computer:

* Keep track of file revisions when working iteratively (this is often referred to as version control).
* Safely experiment and modify your work because you can always step back to the previous *save* version.
* No need to give your files version indicating names, like essay_v1.txt, essay_v2.txt.
* It doesn´t play a role if you want to work on a single file or a multi-file project organized in many folders.
* Convert any file or folder structure into a project that is under version control.
* Work consistently on multiple different operating systems, like MacOS, Linux and Windows.
* Share your work with other persons and keep track of their changes by enforcing the same set of rules for managing versions. This will work even with thousands of persons on a big project, like the Linux operating system kernel, but also scales down nicely for a small team.
* When sharing your work with other persons, you can work on your local computer without being always connected to a shared repository, only synchronizing eventually.
* No centralized locking of files - all team members have their own working copy on their own computers which allows each of them to work independently.

Git is free and nowadays there are services to share your work with other persons, like for example with [GitHub](http://github.com).

Convenient commands to achieve something with Git are:

<table>

<tr>
<td><hr><strong>Create new local repository</strong></td>
<td><hr><strong>Clone existing repository to local</strong></td>
</tr>

<tr>
<td>Move to the folder which should be the parent folder of you project
<pre><code>cd /path/to/repo/</code></pre>
Then initialize the Git repository with 
<pre><code>git init</code></pre></td>

<td>Move to the folder under which the new project should be cloned <pre><code>cd /path/to/parent/</code></pre>Then clone the existing repository into the parent <pre><code>git clone &lt;repository&gt;</code></pre>Where &lt;repository&gt; is any of the following:<br>
ssh://[user@]host.xz[:port]/path/to/repo.git/<br>
git://host.xz[:port]/path/to/repo.git/<br>
http[s]://host.xz[:port]/path/to/repo.git/<br>
ftp[s]://host.xz[:port]/path/to/repo.git/<br>
rsync://host.xz/path/to/repo.git/<br>
</td>
</tr>

<tr><td colspan="2"><hr><center><strong>Stage contents</strong></center></td></tr>
<tr><td colspan="2"><center><code>git add</code></center></td></tr>
<tr><td colspan="2"><hr><center><strong>Commit contents</strong></center></td></tr>
<tr><td colspan="2"><center><code>git commit</code></center></td></tr>
</table>

possibly use https://adrai.github.io/flowchart.js/ 



