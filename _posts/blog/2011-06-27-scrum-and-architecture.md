---
layout: post
title:  
subtitle: The architect and his tools in the Scrum process
permalink: /saa
date: 2011-06-27
message: 
author: 
abstract: Making architectural decisions in a cooperative way at a point in time when they are needed - and not earlier, is a quality-improving paradigm in Agile software development. My thesis is, that conceptual integrity will only be achieved for the software if one person has the final word regarding those decisions. This is the architect, serving the delivery team and the product and whose rights and obligations in context of the Scrum process are being reflected in this essay.
---
This text was first published in OBJEKTspektrum, issue 4/2011, under the title [„Scrum und Architektur, konzeptionelle Integrität im Scrum Prozess“][schneider2011]. I have enhanced and translated the initial document to publish it here.

Making architectural decisions in a cooperative way at a point in time when they are needed - and not earlier, is a quality-improving paradigm in Agile software development. My thesis is, that conceptual integrity will only be achieved for the software if one person has the final word regarding those decisions. This is the architect, serving the delivery team and the product and whose rights and duties in context of the Scrum process are being reflected in this essay.

Iterations
---
Scrum is team-oriented and separates the delivery process into subsequent iterations, so called sprints. The question rises how  a conceptual integer architecture, an architecture that is intuitively understandable for users, developers and operators and easy to use even after many iterations, can be achieved while the team is focusing on the microcosmos and solution patterns of current iterations. 

To achieve conceptual integrity it has to be considered during the entire design and delivery process of a software solution. I will make organizational and manual suggestions with the purpose to support this in the Scrum process. I will emphasize the role of the architect as an important player with strong responsibilities for the conceptual integrity of the software product.

Scrum and architecture
---
The Agile Manifesto [agilemanifesto] values „responding to change over following a plan“. By taking this statement serious, we accept that it makes sense to inspect our behavior and our achievements in a continuous manner. We do this to learn, to adopt and to come to better and more appropriate solutions while delivering results. 

Scrum is a team-oriented management framework for Agile product development that creates transparency and has this kind inspect and adopt built in because work is being „done“ every two or four weeks and at the end of these so called sprints a process inspection and a product inspection is being held by the delivery team.

Software development is a learning process. After finishing a project we normally know more than we did when we started the endeavor. This includes to make architectural decisions as late as possible to leverage the knowledge that has been obtained while delivering results. The decision quality can be enhanced by following this guidance. In addition to late decisions we deliver working software as early as possible to avoid endless discussions and to use the momentum of done work. Putting these two behaviors together, we have an approach that can be called „deliver early and decide late“. Ken Schwaber and Mike Beedle coined in this connection the statement „cut through the noise by taking action“ [schwaber2004].

Architectural decisions are of strategic nature for the solution space. They have an effect for many aspects of the solution and will be recognized by the users of the product. Architectural decisions define the solution space for a given problem and bridge the gap between the requirements and the implementation. It is the architecture that allows to adopt a software system with reasonable effort for changing requirements.

Architectural decisions are being taken under two premises [friedrichsen2010]:

> Represent and balance the interests of all stakeholders over the entire system lifecycle and
>
> Minimize the total cost of ownership for the system over the entire lifecycle

Here the balancing aspect of the interests of all stakeholders is emphasized. The famous Frederick Brooks states, that 

> The architect of a system, like the architect for a building, is the user´s agent [brooks1995:45]

My impression is, both quotes are true.

To me, design decisions, compared to architectural decisions, are of tactical or operational nature for the solution space. Design decisions make a structure inside of the solutions space, and the solution space is spanned by the architectural decisions. The transition between architecture and design might be flowing.

![]({{site.url}}/i/blog/architecture_bridge.jpg)

Figure: Architecture as a bridge between the problem- and the solution space
{:.figcaption}

The cooperative role model of Scrum does not explicitly mention the architect role. Except of the Product Owner, the Scrum Master and the Development Team no other roles are named. It is supposed that the members of the Scrum Team will self-organize and find suitable solutions. 

But in that model, how will architectural decisions being taken? Are they a result of a team-oriented brainstorming and is the decision „emergent“, as long as the decision is being taken „late“? How is ensured that the decisions follow a consistent concept and lead to conceptual integrity? My thesis is, that the cooperative derivation of architectural decisions improve decision quality, but that conceptual integrity can only be achieved for the system if the final decision-making competency is in the hand of one or at a maximum two closely collaborating persons.

Human and process
---
A good architecture leads to conceptual integrity. One question is, can this be achieved by organizational measures, like processes and organizational structures, or is the expertise of an experienced and inspired architect of higher importance?

From the perspective of Agile software development the answer is easy to find. The first value statement of the Agile Manifesto states, that „individuals and interactions are valued higher than processes and tools“ [agilemanifesto]. Therefore in an Agile environment the architect always has a higher significance  than any architecture process.

![architect decision tree]()

And there is even another reason to favor the person over the process. Software development requires social and communicating skills as well as engineering excellence and creativity. For an innovative product is creativity an important solution ingredient. Humans are creative, not so processes. Creativity can be supported by organizational structures but any organization will only help if creative people in general and especially creative architects are high valued in the context of software development.

This does not mean that organization can be overlooked when design the fields of work. Organization is in service to make the communicative and social aspects of software development efficient. The structures we chose will be reflected by the product we create. „Conway´s Law“ [conway1968] gives us the essential point of view: 

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization´s communication structure.

Rephrased: Our communication structures will be found again in the product.

A complex organization with many empoyees and unclear responsibilities will lead to a bloat product. A lean organization with competent employess and clear responsibilities will produce a sharp and focused product.

Scrum with it´s underlying reduction-minded, team-oriented and result-oriented setup is a good tool to create sharp and focused products. The architect in Scrum is the helping hand to keep conceptual integrity in the product.

Multi-team setup
---
In multi-team projects it is likely that your teams are traditionally formed around architectural components. You may have a frontend and a backend team or a mobile and a web team with team leaders and the like. 

This grouping of teams by components helps to bundle component know-how and to keep the components intact but normally it does not help to deliver end-to-end features fast and without friction, because the teams are waiting for each other and blocking themselves. Communication is more difficult, takes more time and if the component teams are placed in different locations the hurdles are even higher. 

With the only perspective of component teams the project can easily get into the fallacy of delivering only component parts without end-to-end integration in each Sprint. A feature that can be inspected by a customer or a Product Owner will then only be visible after some Sprints.

Therefore I suggest the following approach: stay with the component teams - they help to bundle component know-how. But for the delivery of features have in addition *virtual* feature teams that consist of people from several component teams - simply those people who anyway need to come together to make the end-to-end feature real. For these feature teams often a Daily Scrum makes much more sense than for a component team, because they are hunting for a feature and use the Daily Scrum to ensure the end-to-end readiness and delivery of the feature. 

In such an organization component teams and the architect will discuss from time to time difficult changes (and for example API changes) that belong to the component. These changes may be required and indicated by a *virtual* feature team. And it may be the same person who indicates the need for a change from inside of the feature team, bringing it to his *home* component team, participates in the discussion and come back with a solution approach to the feature team.

The *virtual* feature teams may change from time to time - whenever the next feature to be delivered requires a different team setup.   

This multi-team organization, which forms a matrix with the axes *feature* and *component* will support both dimensions: the component architecture and fast, communication oriented end-to-end feature delivery.

In the text below, when examining some tools for the architect, please refer to the End-to-End-Skeleton. This is a technique that supports feature delivery even in multi-team setups.


The architect in Scrum
---
Coming from the organization to the individual, we have to think about the architects role. Here are some suggestions to embed the architect into a Scrum endeavor:

* *Embedded:* If the architect is embedded into the development team or if more separate positon is needed, depends on the size of the project. If the entire project is made up of a single Scrum team, the architect will simply take his role inside of the development team. In case more than one Scrum Team is needed, the architect will have a more exposed position which is comparable to the exposure of the Product Owner. 
* *Decision competency:* Analogous the decision competency of the Product Owner regarding business decisions, the architect has the final word regarding architecture decisions. He helps to define the product.
* *Member of the project:* The architect is proactively responsible for the architecture of the solution space. And she is expected to have the same willingness to collaborate and drive to improve the development process as it is expected from all other team members.
* *Coding skills:* The architect is accepted by the Scrum Team. His contributions enrich the product and he provides benefits to the team. For software development projects it is inevitable that the architect is able to write code in order to understand technical details and working dynamics. In most cases the background of an architect is of technical nature. This requires him to be open and to be willing to learn the important aspects of the business domain.

This is a lot to expect from an architect. But the same is true for all other members of a Scrum Team. A developer is expected to be on top of his craft, a Product Owner must be able to influence his organization and have a high competence in making business relevant decisions to serve the product. The business experts need to be able to develop concise requirements and even testcases. Vice versa the architect must be able to fill out his role or at least has to learn the relevant aspects over the course of the project.

Architecture by comittee
---
Don´t do it. Companywide architecture comittees that are being feed with decisions from underordinated projects and that guard, release or reject architectural decisions are a bottleneck for the enterprise and for the involved projects. The parties are blocking themselves on the search for synergy. Responsibility is being carved out of the projects into the superordinated comittee where focus, involvement, competence and understanding are not bound to the projects that need the decisions. Because of too many players with different interests the decisions being taken are often not focused enough and for none of the involved projects optimal.

> Architecture by comittee is the guarantee for a bloated product.

A companywide architecture comittee should instead define constraints and architectural goals for the enterprise architecture and refrain from interventing the project work - except the project architect asks for it. To achieve results for real world situations it is helpful to have the same architects that work in delivery projects inside of the architecture comittee. But it is important to distinct comittee goals and project work clearly.

Project architects on the other hand have to follow the architecture constraints and goals given by the comittee. Within this given space she derives architectural decisions on behalf of her project and in cooperation with her team. The architect is responsible for her decisions - this includes the decision about how and when to involve the architecture comittee.

Avoid architecture by comittee. The architecture is in the hand of the architect and not in the many hands of the comittee. Architecture by comittee is the guarantee for a bloated product.

Tools
---
In the following I will propose some concrete tools that help the architect and the team to drive the architecture. These tools are mainly known from the IT architecture domain and I will only make suggestions how to use them inside of the Scrum process.

Start with the vision
---
The product vision contains and communicates the strategic goals  of the endeavor. The vision will give self-organizational forces a direction. Whenever during the project course a decision needs to be taken, it must not contradict the goals of the vision. 

ELEVATOR PITCH

One approach for developing such a vision is Geoffrey Moore´s elevator pitch. To go even one step further and anchor the vision within your business model, the [Business Model Canvas][Osterwalder and Pigneur] by Alexander Ostervalder and Yves Pigneur may be of use. 

> It is one of the Product Owners obligations to prepare a convincing product vision. 

The architect has an interest in the vision, too. Often architectural goals are bound to the product vision. These often non-functional goals may be explicit or implicit, but they are by definition of strategic nature. To identify and make them explicit is in the responsibility of the architect. 

In addition to the business goals that are given by the Product Owner, the architect has to identify the relevant stakeholders and find the architectural goals by deriving them from the business goals. But keep in mind, the architect does not invent the architectural goals - she only makes them visible by deriving them from the business goals. 

Architecture vision
---
The architect will work closely together with the Product Owner to align the goals. Once identified, they will be listed in a architecture vision statement or be embedded into the product vision. 

As an architect you should not jump into a project if this work can not be done, otherwise chances for a project success are limited from the start. It is like the saying: „A shirt will never fit right if you miss the first buttonhole.“

How important the knowledge of architectural goals is, can be seen in the following figures, that show different architectural goals:

ARCHITECTURAL GOALS

Sometimes an architecture overview diagram is part of the architecture vision. The [Box-Bullet-Line]({{site.url}}/bbl) notation can be of help to visualize process flows between architecture components.

Constraints
---
Technical or organizational constraints are to be considered in any project. Constraints limit the solution space that can be spanned by the architect. At the same time constraints provide anchoring points for the solution architecture.

Constraints may be given by the presetting to use an enterprise wide directory service, or by a time frame that is available for batch processing of data entries, or by queueing interfaces to existing systems. A given cost limit is a constraint, too.

The list of relevant constraints has to be maintained by the architect. This list can be a part of the architecture vision or be a separate document. 

System context diagram
---
The system context diagram explains the environment of your system. The system itself will be seen as a black box. The important part is to understand the surrounding forces that affect the system with their input- and output-interfaces, system boundaries and responsibilities. Such forces are users as well resources and other systems.

![]()
Figure: Context diagram. Understand the environmental forces that are affecting the system.
{:.figcaption}

The system itself will be drawn as a circle in the middle of the diagram. All surrounding components, systems and resources acting upon the system will be drawn as boxes and users will be drawn as stick figures. Communication and data streams will be drawn as arrows between the system and the environmental forces. 

Non-functional requirements, like the number of data records that have to be transmitted in a specific amount of time over a communication line or the number of users hitting the system at peak times, can be placed as weights beside the arrows or at the component boxes.

The context diagram is of value in early project stages and through out the entire project. It is best be developed in a group effort together with the stakeholders of the system. By group-working, the different perspectives on the system can be visualized quickly and you have a hook to communicate with the stakeholders. Just draw the system in the middle (use a metaplan board or a whiteboard). The surrounding elements can be placed by using sticky notes or moderation cards. When leveraging this technique you can easily move the environmental elements around and develop your system context. 

Non-functional requirements
---
Non-functional requirements often are system-wide and can therefore not be attached to a single user story.

The strategic non-functional requirements lead to the architecture goals that will be documented in the product vision or the architecture vision.

But there are also non-functional requirements that will influence the system architecture and do not find their way into the vision statements. A good entry point to identify those non-functional requirements is the system context diagram. It helps to identify requirements regarding reliability, performance, scaleability, security, maintainability. 

Because of the system-spanning nature of non-functional requirements the architect has the obligation to identify, document and communicate these requirements. 

Only in case a non-functional requirement can be directly attached to a specific user story, it should be documented besides the story (e.g. in the acceptance criteria). In other cases a separate document that collects all non-functional requirements serves the purpose better to understand the system stressors.

> The architect has to transform the non-functional requirements into measurable quantities that allow the easy observance of compliance or violation. This gives all actors a direction and makes it easier to fulfill the requirement during development.

In particular the technique of the constraining resource needs this kind of measurable quantities.

Constraining resource
---
When crafting a system, the non-functional requirements, constraints and the architecture goals will lead the project team to the limiting or constraining resources. These are key limits that determine the performance of the system. The architect has to identify this scarce resources and derive allowable targets that the project team can use to measure and compare.

As an example:
2,500,000 data records need to be processed within one hour. Currently achieved value is 1,800,000. 

> To identify the key limit, make it visible and establish an environment to measure continuously the current ability of the system to achieve the target is a major task for the architect.

The achievement of the target should be checked and communicated on a daily basis. This information will give direction for the delivery team and will foster self-organization towards the achievement of the target.

Box-Bullet-Line (BBL)
---
The Box-Bullet-Line diagram is a pragmatic way to visualize flows between components. It can be used to model the architecture overview (see above, product vision or architecture vision) or to model some details of the system.

> The strength of the notation is, that it is intuitively understandable by the members of the project team, so that the diagram can foster communication and is supporting a shared understanding of the inner system structure and behavior.

Unlike the system context diagram, which gives a blackbox perspective on the system, the BBL is a whitebox view. We want to understand what parts are important and how the data and control flows between these parts.

Please refer to [Box-Bullet-Line]({{site.url}}/bbl) to get more details.

The BBL diagram can be used as a starting point for storyboards and End-To-End-Skeletons.

Storyboard
---
In Scrum we handle requirements in the form of user stories. The product backlog is an ordered list of user stories.

A user story does not explain how to build it. That is intentional. The user story says what, why and gives context, but it does not explain the how, in order to give room for self-organization. 

> The storyboard supports the mapping from the „what“ to the „how“. The relevant tasks for a specific story will be visualized in the context of the components they belong to. 

You start with a BBL diagram that contains the components that you think are needed to build the story. Draw the BBL on a flipchart or whiteboard. Now you break down the story into tasks by writing down each task on a sticky note and placing it on the component it belongs to in the BBL diagram.

This visualization helps all involved team members to identify the connection of the tasks. The mapping from user story to tasks supports the goal of any architecture as an intermediary between business requirements and the concrete solution structure. The storyboard improves the understanding of the solution structure for your user stories. 

End-To-End-Skeleton (ETES)
---
In multi-team setups an integrated proceed with feature delivery can be achieved by using the End-to-End-Skeleton technique. By following this approach all components that are needed for a specific feature will be involved right from the start of development. 

Important is an initial interface definition between the components. Even this definition may change later, but you have to use a technical contract right from the start to model the end-to-end flow and make the programming efforts operational.

For sure it will occur that some functionalities will be developed later and some earlier. The later ones need to be represented by test doubles (like a stunt double in movies). These test doubles can produce some results for specific datasets but are no productive implementation of the needed functionality. Test doubles allow to test early some end-to-end flows.

The purpose of the End-to-End-Skeleton is a full-length flow through all components that are touched by the new feature. This ensures from the start an integrated view of all actors and the development is being bound to concrete interfaces. It becomes immediately visible if the full-length flow is interrupted at any point.

The technical specification of the interfaces should be in the hand of the architect or at least he should be part of the discussions that lead to interfaces, so that an over-arching understanding can be kept up and the data flows and interfaces can be brought into the simplest possible format without duplicate or missing structures and attributes.

Architecture decisions
---
Architecture decisions represent the deliberate spanning of the solution space. Architecture decisions are anchoring points for further decisions. Being anchoring points makes them difficult to change later on. With Stefan Zörner we can say 

> „The one who is in charge of deriving architecture decisions in a comprehensible manner develops the architecture.“ [Zörner, 2010]

All aspects and tools that we have touched so far influence the way in which architecture decisions are being taken.

Architecture decisions need to be communicated. Besides the spoken language, which is a central part, the written form can not be omitted. By writing down architecture decisions, the entire team or project will be enabled to trace even long in the past taken decisions. Stefan Zörner has a real practical approach for the derivation and documentation of architecture decisions, which simply goes by writing down the answers to the following questions:

* Problem  
	* What in detail is the problem?
	* Why is it of relevance for the architecture?
	* Which impacts has the decision?
* Constraints
	* What constraints need to be considered?
	* What influencing factors need to be considered?
* Assumptions
	* What assumptions have been made?
	* What assumptions can be validated?
	* What risks exist?
* Alternatives
	* What alternatives will be examined?
	* How should each of the alternatives be assessed?
	* What alternatives are consciously being skipped?
* Decision
	* What is the decision?
	* Who took the decision?
	* How is the decision being reasoned?
	* When was the decision made?

I always find it helpful to go through these questions. It helps to clear the mind.

Conclusion
---
The here made suggestions are explicitly not meant to make the Scrum framework more complicated or to inject an additional hierarchical level just for the architect. Also classical architecture tools, of which only some are being mentioned here, should not be replaced by the here mentioned. Instead these elaborations should describe what the architects role is about in context of the Scrum role model and what concepts and tools are of use in that case.

The essay is a plea for the rights and obligations of the architect acting inside of the Scrum process; towards collaboration in the Scrum Team and against architecture by comittee. I hope you can use some of the here made suggestions in your current or your next endeavor.

References
---
* [Aicher 1992] O. Aicher, analog und digital, Ernst & Sohn, 1992
* [agilemanifesto]: http://agilemanifesto.org 
[K. Beck et al.] Agile Manifesto, 2001, <http://agilemanifesto.org>
* [craftsmanship]: http://manifesto.softwarecraftsmanship.org
[Bradbury et al. 2009] D. Bradbury et al., Manifesto for Software Craftsmanship, 2009, <http://manifesto.softwarecraftsmanship.org>
* [Godin 2010] S. Godin, Linchpin, Are You Indespensable?, Penguin Books, 2010
* [Osterwalder and Pigneur]: http://www.businessmodelgeneration.com 
* [schneider2012]: /r/schneider_os_05_12.pdf 
[Schneider 2012] U. Schneider, „Die Kunst in der Arbeit, eine Herausforderung des Status quo“, OBJEKTspektrum, Ausgabe 5, 2012
* [wikitaylor]: http://en.wikipedia.org/wiki/Frederick_Winslow_Taylor
[Wiki] Wikipedia, Frederick Winslow Taylor, <http://en.wikipedia.org/wiki/Frederick_Winslow_Taylor>
* [Wohland and Wiemeyer 2007] G. Wohland, M. Wiemeyer, Denkwerkzeuge der Höchstleister, Wie dynamikrobuste Unternehmen Marktdruck erzeugen, Murmann Verlag, 2007

* http://www.martinfowler.com/articles/mocksArentStubs.html 








