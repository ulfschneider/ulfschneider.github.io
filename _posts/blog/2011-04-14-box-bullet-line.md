---
layout: post
title:  The Box-Bullet-Line (BBL)
permalink: /bbl/
date:   2011-04-17
message: 
banner: /i/blog/bbl.jpg
bottomline: 
author: 
abstract: An intuitive and natural notation to communicate flows and indicate callers.
---
Many important aspects of software development are invisible. When creating software we work through different abstraction layers by analyzing symbols and writing code. 

Writing software is comparable to the work of an author writing a book. Of course there are engineering elements and creative and social aspects that characterize the work of a software developer, but the contemplative articulation of a model into code is authoring to me. The better we can communicate the underlying model, the better the system can grow. Indeed the ability of the system to grow is coupled to our *shared* mental model about the system.

Often a model is communicated by using graphical- or diagram techniques. But there is no single diagram type that covers all aspects of a software system model. Instead we use different diagrams to explain and communicate different aspects of the system. The Unified Modeling Language (UML) is a standardized language that reflects this fact by providing many different diagram types, which are grouped into structure- and behavior diagrams.

> In case you are a business domain expert, software developer, requirements engineer, tester or architect - do you know your UML diagram types?

UML diagrams have their value, but only if the ones who work with them have a shared understanding about how to read and write this language. If the diagrams are only used by specialists for special meanings and sometimes only being created and consumed by the same single author, they do not foster communication among different members (with different skills) of a software development project but instead have the opposite effect, because

* they are not understood well enough or 
* they are not up to date because their creation is too time consuming or 
* the software to maintain the diagrams is not available to all project members. 

Therefore the usage of the UML diagrams should be decided with care and insight.

One UML diagram that I find very useful for communicating process logic between people of different backgrounds is the [UML activity diagram](http://agilemodeling.com/artifacts/activityDiagram.htm), because to me it is the most natural way of explaining activities and their dependencies by drawing boxes and connecting them with lines.

The UML activity diagram allows to model flow of control and data. I used it as a starting point and made some modifications that lead to the box-bullet-line notation.

But let´s start with the basics. In the example below the directed connection from A to B has the meaning of „control flows from A to B“. This is a convention of the UML activity diagram. 

![Flow](/i/blog/flow.jpg)

Figure: The directed connection between A and B models flow from A to B.
{:.figcaption}

Now the modifications: When I draw BBL diagrams I do not differentiate control and data flow. Although the UML activity diagram has a slightly different notation for „data flow“, which uses so called „pins“ at both ends of the connection. Let´s assume it is all about „flow“.

Furthermore in the UML activity diagram a rounded rectangle stands for an activity. I interpret the rectangles as components, so that components and flow dependencies between components will be modeled. And when I draw by hand, it is time-consuming to draw rectangles with rounded corners, therefore I do not draw the rounding. This again is a difference to the original activity diagram, because not-rounded corners and rounded corners have a different meaning of: rounded = activity, not rounded = data object. By enhancing the diagram with a tiny bullet to indicate the caller in a flow, we can 

* still visualize flow
* still easily draw by hand
* indicate callers
* have calling sequences
* use synchronous and asynchronous communication patterns.

<h3>Caller</h3>
The caller can be marked with a tiny bullet.

![Caller and flow](/i/blog/caller_and_flow.jpg)

Figure: A is calling B and handing over flow to B
{:.figcaption}

<h3>Sequences</h3>

By using numbers beside the connections, calling sequences can be modeled.

![Caller and flow with sequence](/i/blog/caller_and_flow_sequence.jpg)

Figure: Modeling flow with a calling sequence
{:.figcaption}

<h3>Synchronous and asynchronous communication</h3>

Synchronous and asynchronous communication can be modeled with single and double connections.

![Synchronous request and response](/i/blog/sync_request_response.jpg)

Figure: A request initiated by A, giving data to B and getting a synchronous response from B
{:.figcaption}


![Request with asynchronous response](/i/blog/request_async_response.jpg)

Figure: A call initiated by A, giving flow to B. The asynchronous response from B follows.
{:.figcaption}

This simple box-bullet-line notation can grow with your needs. For example you can start modeling only undirected connections, add flows by giving your connections a direction and extend even more by adding caller indication with calling sequences later. 

