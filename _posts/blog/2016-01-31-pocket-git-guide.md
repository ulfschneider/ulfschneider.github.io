---
layout: post
title: Pocket Git Guide
subtitle: 
date:   2016-01-31
permalink: 
author:
abstract: A brief approach on why and how to use Git. Mainly inspired by "Git for Humans".
---
* Reasons to use Git
* Tell Git who you are
* Init 
* Clone
* Status 
* Stage 
* Commit 
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
<li>Have the advantage of powerful version control without the need to setup a server or creating an account somewhere.</li>
<li>Work consistently on multiple different operating systems, like MacOS, Linux and Windows.</li>
</ul>
</div>
<div class="col-1-2 last">
<strong>Team</strong>
<ul>
<li>Share your work with others and keep track of their changes by enforcing the same set of rules for managing versions. This will work even with thousands of persons on a big project, but also scales down nicely for a small team.</li>
<li>When sharing your work with others, you can work on your local computer without being always connected to a shared repository, only synchronizing eventually.</li>
<li>No centralized locking of files. All team members have their own working copy on their own computers which allows each of them to work independently.</li>
</ul>
</div>
</div>

Git is free. When you try to use Git for the first time on a Mac (my preferred environment), you will be asked to install the command line tools, which will subsequently bring Git on your Mac. On other platforms you have to run some setup routine to get Git installed.

Convenient commands to achieve something with Git in the command shell are:

Tell Git who you are
---
{% highlight bash %}
git config [--global] user.name ["your name"]
git config [--global] user.email ["your email address"]
{% endhighlight %}
Use the <code>--global</code> option to tell Git that the given configuration will be the default for all of your projects on your computer. After these settings have been made, they will be added to your commits. When you then push commits to a shared server, your name and email address will also appear on that server. 

Detect your configuration settings with 
{% highlight bash %}
git config --list
{% endhighlight %}

Create new local repository
---
Move to the folder which should contain your project
{% highlight bash %}
cd /path/to/your/prj/
{% endhighlight %}
Then initialize the Git repository for the project with 
{% highlight bash %}
git init
{% endhighlight %}

Clone existing repository to local
---
The alternate to creating a new repository from scratch is to clone an already existing. In order to do it, move to the folder under which the existing repository should be cloned 
{% highlight bash %}
cd /path/to/parent/
{% endhighlight %}
Then clone the existing repository into the parent 
{% highlight bash %}
git clone <repo> [new folder name]
{% endhighlight %}
<code>&lt;repo&gt;</code> is the path to the existing repository and has any of the following structures:
{% highlight bash linenos %}
ssh://[user@]host.xz[:port]/path/to/repo/
git://host.xz[:port]/path/to/repo/
http[s]://host.xz[:port]/path/to/repo/
ftp[s]://host.xz[:port]/path/to/repo/
rsync://host.xz/path/to/repo/
{% endhighlight %}
<code>new folder name</code> is the optional folder name of the cloned project on your computer.

Status of your Git repository
---
When inside of a local Git repository
{% highlight bash %}
git status
{% endhighlight %}
will tell you what branch you are currently working on and give you an overview about untracked changes and outstanding commits.

Stage contents
---
To make a snapshot of your current work, which will be stored in the Git repository, call
{% highlight bash %}
git add [<pathspec>]
{% endhighlight %}
<code>&lt;pathspec&gt;</code> specifies the files to be included into the snapshot. Wildcards are allowed. 

If a version of a file is not staged, Git doesn´t know how to refer to that version and therefore can´t commit it. Staged but uncommitted content remains only on your local computer and will not be send to a shared repository somewhere else. 

If you omit the <code>&lt;pathspec&gt;</code>, use
{% highlight bash %}
git add -all
{% endhighlight %}
which will ensure a snapshot of all untracked files in your current project is being added to your local Git repository. 

Commit contents
---
Contents which have been staged must be committed in order to reference them. Any commit is self-contained, it does not only reference your current changes, but everything which makes up the state of your current project at the time you are committing. This is because each commit contains a reference to its direct predecessor, the parent comit. Beginning at the last commit, the tip, the list of commits is a sequence pointing to the past.
{% highlight bash %}
git commit [-a] [-m "your commit message"]
{% endhighlight %}
<code>-a</code> is a nice shorthand option to avoid the staging of content with a previous <code>git add</code> command. By using the option <code>-a</code> you don´t need the <code>git add</code> command, because all modified files will automatically be staged and subsequently committed. With <code>-m "your commit message"</code> you tell your co-workers and probably yourself why you made the commit.

An even shorter form of committing is:
{% highlight bash %}
git commit -am "your commit message"
{% endhighlight %}
Here the option to stage all unstaged contents and the option to provide a commit message are combined in <code>-am</code>. You can combine multiple options in a single one like here, the only restriction is that only the last option can take an argument, like the commit message. 

If you don´t specify a commit message when firing the commit command, an editor will be opened where you have to provide the message. You can configure what editor to use with 
{% highlight bash %}
git config --global core.editor <editor-name>
{% endhighlight %}

To see the currently configured editor, type
{% highlight bash %}
git config --global core.editor
{% endhighlight %}

To see the history of commits use
{% highlight bash %}
git log
{% endhighlight %}

Branch
---
Anything in Git is a branch. The first branch of a Git repository is the master branch. Technically it is a branch like all other branches, but conceptually it is the primary, stable version of whatever is stored in the repository. 

A commit will always be done inside of a particular branch. But while commits point to the past, a branch is a concept for the future. A branch is a virtual copy of your project, where commits can be made freely in isolation from whatever else may happen in the repository. You would make a branch to experiment with some new feature inside of your project, to fix a bug or to do other things which you want to have separated from everything else until you have truly found what you are after in your branch. 

While you can have multiple branches in your repository, there is always exact one working branch, which is the one you are currently working on. Any commit you make, will be against the working branch.
{% highlight bash %}
git branch <your-branch-name>
{% endhighlight %}
Will create a new branch for you. Choose a short descriptive branch name.

<code>git branch &lt;your-branch-name&gt;</code> will not make the new branch your current working copy, therefore your next commit would not be against the new branch. In order to make the new branch the active working copy, you need to
{% highlight bash %}
git checkout <your-branch-name>
{% endhighlight %}
after you have created your branch. Whatever you commit from that point on will be inside of your new branch and nowhere else.

Again, there is a shorthand command for creating a branch and making it the current working copy all at once:
{% highlight bash %}
git checkout -b <your-branch-name>
{% endhighlight %}
will create a new branch and make it the current working copy.
{% highlight bash %}
git branch
{% endhighlight %}
will show you the current list of branches with a * in front of the new created and now active branch.

To see the history of commits in a branch-oriented tree format, use
{% highlight bash %}
git log --graph --oneline
{% endhighlight %}
The <code>--graph</code> option will produce the branch tree and the <code>--oneline</code> option leads to each commit being displayed in a single line of the tree structure.

Merge
---
Sometimes the work which has been done in a branch will be thrown away. You delete the branch and everything is as if the branch never existed. If you don´t want to throw away your work, you probably have to bring the contents of your branch into the master branch. That´s what merge is for. All commits that have been made in your source branch have to be merged into your master branch.

To merge any branch into your master branch, you have to
{% highlight bash linenos %}
git checkout master
git merge <your-source-branch>
{% endhighlight %}
The first command will bring you into the master branch, the second command will pull in the changes from the source branch into the master branch. The principle is always the same - make the branch into which you want to merge the working copy and then pull changes from any other branch into your working copy by
{% highlight bash linenos %}
git checkout <your-destination-branch>
git merge <your-source-branch>
{% endhighlight %}
To be more precise, all commits from your source branch will be merged into your working copy.

The simplest kind of merge is, if nothing had been changed in the destination branch while you were working inside of the source branch. In this case any changes made in the source branch will entirely be added to the destination branch, which is called **fast-forward**. The head or tip of the destination branch and the head of the source branch will point to the same commit then, which is the last commit that was made in the source branch. After that, both branches, the source branch and the destination branch, are identical except in their branch names.

A **true merge** is something different. That´s when both, the source branch and the destination branch, have been modified before doing the merge. This will lead to a  so called **merge commit**.

todo
---
* fast  forward
* merge commit
* merge conflict
* remove branch
* Meaning of HEAD
* files not to track
* git diff
* git merge
* git rm
* git mv




