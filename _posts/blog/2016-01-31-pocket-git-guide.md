---
layout: post
title: Pocket Git Guide
subtitle: 
date:   2016-01-31
permalink: 
author:
abstract: A brief description why and how to use Git.
---
**Contents**

* Reasons to use Git
* Tell Git who you are
* Create new local repository
* Clone existing repository to local
* Status of your Git repository
* Stage contents
* Commit contents
* Branch
* Merge
{:.toc}

Reasons to use Git
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
<li>No centralized locking of files. All team members have their own working copy on their own computers which allows each of them to work independently.</li>
</ul>
</div>
</div>

Git is free. When you try to use Git for the first time on a Mac (my preferred environment), you will be asked to install the command line tools, which will subsequently bring Git on your Mac. On other platforms you have to run some setup routine to get Git installed.

Convenient commands to achieve something with Git are:

<div class="grid">
<div class="col-1-1 first last"><hr><strong>Tell Git who you are</strong><br>
<pre><code>git config --global user.name "your name" </code></pre>
<pre><code>git config --global user.email "your email address" </code></pre>
Use the <code>--global</code> option to tell Git that the given configuration will be the default for all projects on your computer. After these settings have been made, they will be added to any of your commits. And when you push your commits to a shared server, your name and email address will also appear on that server.</div>

<div class="col-1-3 first"><hr><strong>Create new local repository</strong><br>
Move to the folder which should contain your project
<pre><code>cd /path/to/prj/</code></pre>
Then initialize the Git repository for the project with 
<pre><code>git init</code></pre></div>
<div class="col-2-3 last"><hr><strong>Clone existing repository to local</strong><br>
The alternate to creating a new repository from scratch is to clone an already existing. In order to do it, move to the folder under which the existing repository should be cloned <pre><code>cd /path/to/parent/</code></pre>Then clone the existing repository into the parent <pre><code>git clone &lt;repo&gt; [new folder name]</code></pre>
<code>&lt;repo&gt;</code> is the path to the existing repository and has any of the following structures:
<ul style="word-break:break-all;">
<li>ssh://[user@]host.xz[:port]/path/to/repo/</li>
<li>git://host.xz[:port]/path/to/repo/</li>
<li>http[s]://host.xz[:port]/path/to/repo/</li>
<li>ftp[s]://host.xz[:port]/path/to/repo/</li>
<li>rsync://host.xz/path/to/repo/</li>
</ul>
<code>[new folder name]</code> is the optional folder name of the cloned project on your computer.
</div>

<div class="col-1-1 first last"><hr><strong>Status of your Git repository</strong><br>
When inside of a local Git repository
<pre><code>git status</code></pre>
will tell you what branch you are currently working on and give you an overview about untracked changes and outstanding commits.
</div>


<div class="col-1-1 first last"><hr><strong>Stage contents</strong><br>
To make a snapshot of your current work, which will be stored in the Git repository, call
<pre><code>git add [pathspec] [-A]</code></pre></div>
If a version of a file is not staged, Git doesn´t know how to refer to that version and therefore can´t commit it. Staged and uncommitted content remains only on your local computer. <code>[pathspec]</code> specifies the files to be included into the snapshot. Wildcards are allowed. If you omit the <code>[pathspec]</code>, the <code>[-A]</code> option will ensure a snapshot of all untracked files in your current project is being added to your local Git repository. 

<div class="col-1-1 first last"><hr><strong>Commit contents</strong><br>
Contents which have been staged must be committed in order to reference them. Any commit is self-contained, it does not only reference your current changes, but everything which makes up the state of your current project at the time you are committing. And each commit contains a reference to its direct predecessor, the parent comit. Beginning at the last commit, the tip, the list of commits is a sequence pointing to the past.
<pre><code>git commit [-a] -m "your commit message"</code></pre>
<code>[-a]</code> is a nice shorthand option to avoid the staging of content with a separate <code>git add</code> command. By using the option <code>[-a]</code> you don´t need the <code>git add</code> command, because all modified files will automatically be staged and subsequently committed. With <code>-m "your commit message"</code> you tell your co-workers and probably yourself why you made the commit.
</div>

<div class="col-1-2 first"><hr><strong>Branch</strong><br>
While commits point to the past, a branch is a concept for the future. A branch is a virtual copy of your project, where commits can be made freely in isolation from whatever else may happen in the repository.
<pre><code>git branch</code></pre>
will display a list of current branches.
<pre><code>git branch</code></pre>

</div>
<div class="col-1-2 last"><hr><strong>Merge</strong>
<pre><code>git merge</code></pre></div>
</div>

git log
git rm
git mv



