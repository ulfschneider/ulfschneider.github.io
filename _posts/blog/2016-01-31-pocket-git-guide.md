---
layout: post
title: Git Guidance
subtitle: Why and how
date:   2016-01-31
permalink: 
author:
abstract: A brief description why and how to use Git.
---
Git will help you doing the following things:

* Keep track of file revisions when working iteratively (this is often referred to as version control).
* Safely experiment and modify your work because you can always step back to the previous *save* version.
* No need to give your files version indicating names, like essay_v1.txt, essay_v2.txt.
* It doesn´t play a role if you want to work on a single file or a multi-file project organized in many folders.
* Make any file/folder structure a project that is under version control.
* Work consistently on multiple different operating systems, like MacOS, Linux and Windows.
* Share your work with other persons and keep track of their changes by enforcing the same set of rules for managing versions. Even with thousands of persons working on a big project, like the Linux operating system kernel, but also scaling down nicely for a small team.
* When sharing your work with other persons, you can work on your local computer without being connected to a shared repository, only synchronizing eventually.
* No centralized locking of files - all team members have their own working copy on their own computers which allows each of them to work independently.

Git is free and nowadays you can use free services to share your work with other persons, like for example [GitHub](http://github.com).

Working with Git
---

<table>
<tr><td><hr>Create new local repository</td><td><hr>Clone existing repository to local</td></tr>
<tr><td><code>git init</code></td><td><code>git clone </code></td></tr>
<tr><td colspan="2">No matter which of the above commands you will use, Git keeps your project in a local repository, which is a hidden folder inside of the folder you want to have under Git version control.</td></tr>
<tr><td colspan="2"><hr><center>Stage contents</center></td></tr>
<tr><td colspan="2"><center><code>git add</code></center></td></tr>
<tr><td colspan="2"><hr><center>Commit contents</center></td></tr>
<tr><td colspan="2"><center><code>git commit</code></center></td></tr>
</table>



