---
layout: post
title:  
permalink: /saa/
date:   2011-06-27
message: 
banner: 
bottomline: 
author: 
abstract: Making architectural decisions in a cooperative way at a point in time when they are needed - and not earlier, is a quality-improving paradigm in Agile software development. My thesis is, that conceptual integrity will only be achieved for the software if one person has the final word regarding those decisions. This is the architect, serving the delivery team and the product and whose rights and duties in context of the Scrum process are being reflected in this article.
---
This text was first published in OBJEKTspektrum, issue 4/2011, under the title [„Scrum und Architektur, konzeptionelle Integrität im Scrum Prozess“][schneider2011]. I have enhanced and translated the initial document to publish it here.

Making architectural decisions in a cooperative way at a point in time when they are needed - and not earlier, is a quality-improving paradigm in Agile software development. My thesis is, that conceptual integrity will only be achieved for the software if one person has the final word regarding those decisions. This is the architect, serving the delivery team and the product and whose rights and duties in context of the Scrum process are being reflected in this article.

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

The architect in Scrum
---
Here are some suggestions to embed the architect into a Scrum endeavor:

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

Context diagram
---
The context diagram 











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








