---
layout: post
title:  The Box-Bullet-Line Notation (BBL)
permalink: /bbl/
date:   2011-04-17
message: 
banner: 
bottomline: 
author: 
abstract: An intuitive and natural notation to communicate control and data flows.
---
Many important aspects of software development are invisible. When creating software we work through different abstraction layers by analyzing symbols and writing code. 

Writing software can be compared to the work of an author writing a book. Of course there are engineering elements and creative and social aspects that characterize the work of a software developer, but the contemplative articulation of a model into code is authoring to me. The better we can communicate the underlying model, the better the system can grow. Indeed the ability of the system to grow is coupled to our *shared* mental model about the system.

Often a model is communicated by using graphical- or diagram techniques. But there is no single diagram type that covers all aspects of a software system model. Instead we use different diagrams to explain and communicate different aspects of the system. The Unified Modeling Language (UML) is a standardized language that reflects this fact by providing many different diagram types, which are grouped into structure- and behavior diagrams.

![UML diagrams overview](/i/blog/uml-24-diagrams.png)

Figure: UML diagrams overview [Source: http://www.uml-diagrams.org/uml-24-diagrams.html](http://www.uml-diagrams.org/uml-24-diagrams.html)
{:.figcaption}

> In case you are a business domain expert, software developer, requirements engineer, tester or architect - do you know your UML diagram types?

UML diagrams have their value, but only if the ones who work with them have a shared understanding about how to read and write this language. 

Until now I have only worked in projects where a shared understanding about UML diagrams did not exist. To me it seems that UML diagrams are often used by specialists for special meanings and sometimes only being created and consumed by the same single author.

Instead of fostering communication among different members (with different skills) of a software development project, these diagrams may have the opposite effect, because 

* they are not understood well enough or 
* they are not up to date because their creation is too time consuming or 
* the software to maintain them is not available to all project members. 

I´m not against UML, but as laid-out before, in my projects the described communication problems were a reality.

I want to speak for a natural and generic way of explaining components and their dependencies by drawing boxes and connecting them with lines. This is not to replace UML-models, but to have an easy drawing and modeling technique that all members of the project team can immediately use. We are intuitively capable to draw and understand such figures.

![Data flow](/i/blog/data_flow.jpg)

Figure: A dependency between A and B
{:.figcaption}

This type of drawing can be used to model structures as well as behaviors. In the example above, the directed connection from A to B could have the meaning of „A is dependent of B“, or there is some „data flow from A to B“, or even „A is calling B“. Without convention and context the simple figure has too much degree of freedom.

When modeling systems by using this notation, I use the following convention, that allows to

* visualize data flow
* indicate control flow
* have calling sequences
* use synchronous and asynchronous communication patterns.

<h3>The directed connection between A and B models the data flow from A to B. </h3>

![Data flow](/i/blog/data_flow.jpg)

Figure: Data is flowing from A to B
{:.figcaption}

<h3>The flow of control, in other words, who is calling whom, can  be marked with a tiny bullet at the caller.</h3>

![Control and data flow](/i/blog/control_and_data_flow.jpg)

Figure: A is calling B and handing over data to B
{:.figcaption}

<h3>By using numbers beside the connections, calling sequences can be modeled.</h3>

![Control and data flow with sequence](/i/blog/control_and_data_flow_sequence.jpg)

Figure: Modeling control and data flow with a calling sequence
{:.figcaption}

<h3>Synchronous and asynchronous communication can be modeled with single and double connections.</h3>

![Synchronous request and response](/i/blog/sync_request_response.jpg)

Figure: A request initiated by A, giving data to B and getting a synchronous response from B
{:.figcaption}


![Request with asynchronous response](/i/blog/request_async_response.jpg)

Figure: A request initiated by A by giving data to B. The asynchronous response from B follows.
{:.figcaption}

This simple BBL notation can grow with your needs. For example you can start modeling only undirected connections, add data flows by giving your connetions a direction and extend even more by adding control flow indication with calling sequences later. 
