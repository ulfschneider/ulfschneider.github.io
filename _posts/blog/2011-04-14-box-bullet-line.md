---
layout: post
title:  The Box-Bullet-Line (BBL)
permalink: /bbl/
date:   2011-04-17
message: 
banner: /i/blog/bbl.jpg
bottomline: 
author: 
abstract: An intuitive and natural notation to communicate flows  between components.
---
Many important aspects of software development are invisible. When creating software we work through different abstraction layers by analyzing symbols and writing code. 

Writing software is comparable to the work of an author writing a book. Of course there are engineering elements and creative and social aspects that characterize the work of a software developer, but the contemplative articulation of a model into code is authoring to me. The better we can communicate the underlying model, the better the system can grow. Indeed the ability of the system to grow is coupled to our *shared* mental model about the system.

Often a model is communicated by using graphical- or diagram techniques. But there is no single diagram type that covers all aspects of a software system model. Instead we use different diagrams to explain and communicate different aspects of the system. The Unified Modeling Language (UML) is a standardized language that reflects this fact by providing many different diagram types, which are grouped into structure- and behavior diagrams.

> In case you are a business domain expert, software developer, requirements engineer, tester or architect - do you know your UML diagram types?

UML diagrams have their value, but only if the ones who work with them have a shared understanding about how to read and write this language. If the diagrams are only used by specialists for special meanings and sometimes only being created and consumed by the same single author, they do not foster communication among different members (with different skills) of a software development project but instead have the opposite effect, because

* they are not understood well enough or 
* they are not up to date because their creation is too time consuming or 
* the software to maintain and read the diagrams is not available to all project members. 

Therefore the usage of the UML diagrams should be decided with care and insight.

The here proposed box-bullet-line notation is an easy to use drop in, that allows to  

* model data flow
* see components and their dependencies
* indicate callers
* have calling sequences
* use synchronous and asynchronous communication patterns
* still be able to draw easily by hand.

<h3>Dependency</h3>

Let´s start with the basics. A line between two boxes indicates a dependency between two system components. A box is a component. In early phases, when you explore an existing system or design a new one, when directions of communication are not of highest importance, the undirected dependency between components is a good starting point.

![Dependency](/i/blog/bbl_dependency.jpg)

Figure: A dependency between A and B

<h3>Flow</h3>

The directed connection from A to B has the meaning of „data flows from A to B“. 

![Flow](/i/blog/bbl_flow.jpg)

Figure: The directed connection between A and B models a data flow from A to B.
{:.figcaption}

<h3>Caller</h3>
The caller can be marked with a tiny bullet.

![Caller pushing](/i/blog/bbl_caller_push.jpg)

Figure: A is calling B and handing over data to B
{:.figcaption}

![Caller pulling](/i/blog/bbl_caller_pull.jpg)

Figure: B is calling A and requesting data
{:.figcaption}

<h3>Sequences</h3>

By using numbers beside the connections, calling sequences can be modeled.

![Caller and flow with sequence](/i/blog/bbl_caller_and_flow_sequence.jpg)

Figure: Modeling data flow with a calling sequence
{:.figcaption}

<h3>Synchronous and asynchronous</h3>

Synchronous and asynchronous communication can be modeled with single and doubled connections.

![Synchronous request and response](/i/blog/bbl_sync.jpg)

Figure: A request initiated by A, synchronous communication. If A writes first and gets a response or A reads first and writes back is not defined.
{:.figcaption}

![Request with asynchronous response](/i/blog/bbl_async.jpg)

Figure: A call initiated by A, giving data to B. The asynchronous response with data from B follows.
{:.figcaption}

This simple box-bullet-line notation can grow with your needs. For example you can start modeling only undirected connections, add data flows by giving your connections a direction and extend even more by adding caller indication with calling sequences later. 


[![BBL model natural](/i/blog/bbl_model_natural.jpg)](/r/blog/bbl.pdf)

Click on the image above to get a short presentation laying out the BBL concepts.
