---
layout: post
title: Slicing User Stories
date:   2016-06-02
permalink: 
author:
abstract: A reveal.js presentation about patterns to slice User Stories into smaller pieces.
---
A collection of patterns to slice User Stories into smaller pieces. Please open the [presentation here]({{site.url}}/assets/slicing-user-stories).

Content Reference
---
* User Stories are about users, like cashier, shopper, store admin.
* The User Story Syntax is: As a &lt;user&gt; I want a &lt;function&gt;, so that I can &lt;value&gt;.
	* The user is put into focus.
	* A story written in a way “As a user I want to be able to change the database system” does not make sense. Is the user a shopper? A retailer? A cashier? The shop admin? To explain who will use the function provides the context to do the story right.
	* Make it short. The story tells what, not how. The important part about a User Story is the conversation between Dev team, QA and the Product Owner.
	* Answer why the User Story should be implemented. Where does the value come from?
* The ideal story fulfills the INVEST criterias.
	* Independent - to be ranked independent.
	* Negotiable - a token for a conversation.
	* Valuable - the Why-question is answered.
	* Estimable - know if it´s small, medium, huge.
	* Small - to be delivered within a Sprint.
	* Testable - validate if the Story is really done.
* INVEST not fulfilled? Try these patterns:
	* **Workflow**
		* Implement thin slice through workflow.
		* Do beginning and end first, work to middle.
	* **CRUD**
		* Slice into create, read, update and delete parts.
	* **Simple/Complex**
		* Do simple core first, enhancements later.
	* **Data**
		* Do one kind of data first, enhance with other kinds later.
	* **Data entry**
		* Do simple data entry first, enrichtments later.
	* **Non-functional**
		* Do functional part first, non-functional later.
	* **Interface**
		* Split the story into handling the data over one interface first, enhance later with other interfaces.
	* **Breakout a spike**
		* Last resort







