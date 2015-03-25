---
layout: post
title:  
date:   2011-06-27
message: 
banner: 
bottomline: 
author: 
abstract: Making architectural decisions in a cooperative way at a point in time when they are needed - and not earlier, is a quality-improving paradigm in agile software development. My thesis is, that conceptual integrity will only be achieved for the software if one person has the final word regarding those decisions. This is the architect, serving the delivery team and the product and whose rights and duties in context of the Scrum process are being reflected in this article.
---
This text was first published in OBJEKTspektrum, issue 4/2011, under the title [„Scrum und Architektur, konzeptionelle Integrität im Scrum Prozess“][schneider2011]. I have enhanced and translated the initial document to publish it here.

Making architectural decisions in a cooperative way at a point in time when they are needed - and not earlier, is a quality-improving paradigm in agile software development. My thesis is, that conceptual integrity will only be achieved for the software if one person has the final word regarding those decisions. This is the architect, serving the delivery team and the product and whose rights and duties in context of the Scrum process are being reflected in this article.

Iterations
---
Scrum is team-oriented and separates the delivery process into subsequent iterations, so called sprints. The question rises how  a conceptual integer architecture, an architecture that is intuitively understandable for users, developers and operators and easy to use even after many iterations, can be achieved while the team is focusing on the microcosmos and solution patterns of current iterations. 

To achieve conceptual integrity it has to be considered during the entire design and delivery process of a software solution. I will make organizational and manual suggestions with the purpose to support this in the Scrum process. I will emphasize the role of the architect as an important player with strong responsibilities for the conceptual integrity of the software product.

Scrum and architecture
---
The agile manifesto [agilemanifesto] values „responding to change over following a plan“. By taking this statement serious, we accept that it makes sense to inspect our behavior and our achievements in a continuous manner. We do this to learn, to adopt and to come to better and more appropriate solutions while delivering results. 

Scrum is a team-oriented management framework for agile product development that creates transparency and has this kind inspect and adopt built in because work is being „done“ every two or four weeks and at the end of these so called sprints a process inspection and a product inspection is being held by the delivery team.

Software development is a learning process. After finishing a project we normally know more than we did when we started the endeavor. This includes to make architectural decisions as late as possible to leverage the knowledge that has been obtained while delivering results. The decision quality can be enhanced by following this guidance. In addition to late decisions we deliver working software as early as possible to avoid endless discussions and to use the momentum of done work. Putting these two behaviors together, we have an approach that can be called „deliver early and decide late“. Ken Schwaber and Mike Beedle coined in this connection the statement „cut through the noise by taking action“ [schwaber2004].

Architectural decisions are of strategic nature for the solution space. They have an effect for many aspects of the solution and will be recognized by the users of the product. Architectural decisions define the solution space for a given problem and bridge the gap between the requirements and the implementation. It is the architecture that allows to adopt a software system with reasonable effort for changing requirements.

Architectural decisions are being taken under two premises [friedrichsen2010]:

> represent and balance the interests of all stakeholders over the entire system lifecycle and
>
> minimize the total cost of ownership for the system over the entire lifecycle

Here the balancing aspect of the interests of all stakeholders is emphasized. The famous Frederick Brooks states, that 

> the architect of a system, like the architect for a building, is the user´s agent [brooks1995:45]. 

My impression is, both quotes are true.

To me, design decisions, compared to architectural decisions, are of tactical or operational nature for the solution space. Design decisions make a structure inside of the solutions space, and the solution space is spanned by the architectural decisions. The transition between architecture and design might be flowing.

![](/i/blog/architecture_bridge.jpg)

Figure: Architecture as a bridge between the problem- and the solution space

The cooperative role model of Scrum does not explicitly mention the architect role. Except of the Product Owner, the Scrum Master and the Development Team no other roles are named. It is supposed that the members of the Scrum Team will self-organize and find suitable solutions. 

But in that model, how will architectural decisions being taken? Are they a result of a team-oriented brainstorming and is the decision „suddenly clear“, as long as the decision is being taken „late“? How is ensured that the decisions follow a consistent concept and lead to conceptual integrity? My thesis is, that the cooperative derivation of architectural decisions improves decision quality, but that conceptual integrity can only be achieved for the system if the final decision-making competency is in the hand of one or at a maximum two closely collaborating persons.

Human and process
---
A good architecture has conceptual integrity. Can it be achieved by organizational measures, like processes and organizational structures, or is the expertise of an experienced and inspired architect of higher importance?

From the perspective of agile software development the answer can be found fast. The first value statement of the agile manifesto states, that „individuals and interactions are valued higher than processes and tools“ [agilemanifesto]. Therefore in an agile environment the architect has a higher significance than an architecture process.


References
---
* [Aicher 1992] O. Aicher, analog und digital, Ernst & Sohn, 1992
* [agilemanifesto]: http://agilemanifesto.org 
[K. Beck et al.] Agile Manifesto, 2001, <http://agilemanifesto.org>
* [craftsmanship]: http://manifesto.softwarecraftsmanship.org
[Bradbury et al. 2009] D. Bradbury et al., Manifesto for Software Craftsmanship, 2009, <http://manifesto.softwarecraftsmanship.org>
* [Godin 2010] S. Godin, Linchpin, Are You Indespensable?, Penguin Books, 2010
* [schneider2012]: /r/schneider_os_05_12.pdf 
[Schneider 2012] U. Schneider, „Die Kunst in der Arbeit, eine Herausforderung des Status quo“, OBJEKTspektrum, Ausgabe 5, 2012
* [wikitaylor]: http://en.wikipedia.org/wiki/Frederick_Winslow_Taylor
[Wiki] Wikipedia, Frederick Winslow Taylor, <http://en.wikipedia.org/wiki/Frederick_Winslow_Taylor>
* [Wohland and Wiemeyer 2007] G. Wohland, M. Wiemeyer, Denkwerkzeuge der Höchstleister, Wie dynamikrobuste Unternehmen Marktdruck erzeugen, Murmann Verlag, 2007








