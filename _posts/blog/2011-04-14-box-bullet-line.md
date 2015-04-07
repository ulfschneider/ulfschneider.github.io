---
layout: post
title:  The Box-Bullet-Line (BBL)
permalink: /bbl/
date:   2011-04-17
message: 
banner: /i/blog/bbl.jpg
bottomline: 
author: 
abstract: An intuitive and natural diagram type to communicate control and data flows by enhancing the UML activity diagram type.
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

One UML diagram that I find very useful for communicating process logic between people of different backgrounds, is the [UML activity diagram](http://agilemodeling.com/artifacts/activityDiagram.htm), because to me it is the most natural way of explaining components and their dependencies by drawing boxes and connecting them with lines.

The UML activity diagram allows to model flow of data. By using a simple trick it can be enhanced to even indicate the control flow of a process. But let´s start with the basic data flow. In the example below the directed connection from A to B has the meaning of „data flows from A to B“. This is a convention of the UML activity diagram. 

![Data flow](/i/blog/data_flow.jpg)

Figure: The directed connection between A and B models a data flow from A to B.
{:.figcaption}

By enhancing the diagram with a tiny bullet for the control flow indication, we can 

* still visualize data flow
* still easily draw by hand.
* indicate control flow
* have calling sequences
* use synchronous and asynchronous communication patterns.

<h3>Flow of control</h3>
The flow of control, in other words, who is calling whom, can be marked with a tiny bullet at the caller.

![Control and data flow](/i/blog/control_and_data_flow.jpg)

Figure: A is calling B and handing over data to B
{:.figcaption}

<h3>Sequences</h3>

By using numbers beside the connections, calling sequences can be modeled.

![Control and data flow with sequence](/i/blog/control_and_data_flow_sequence.jpg)

Figure: Modeling control and data flow with a calling sequence
{:.figcaption}

<h3>Synchronous and asynchronous communication</h3>

Synchronous and asynchronous communication can be modeled with single and double connections.

![Synchronous request and response](/i/blog/sync_request_response.jpg)

Figure: A request initiated by A, giving data to B and getting a synchronous response from B
{:.figcaption}


![Request with asynchronous response](/i/blog/request_async_response.jpg)

Figure: A call initiated by A, giving data to B. The asynchronous response from B follows.
{:.figcaption}

This simple box-bullet-line notation can grow with your needs. For example you can start modeling only undirected connections, add data flows by giving your connections a direction and extend even more by adding control flow indication with calling sequences later. 

Of course the entire notation language of the UML activity diagram is at hand for you to model more complex flows. Just use the tiny bullet for an enhancement towards control flow and sequence indication.
