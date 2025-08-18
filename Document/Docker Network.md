### Docker Network

At the highest level, Docker networking is based on the following three components:
• *The Container Network Model (CNM)*
• *Libnetwork*
• *Drivers*

The CNM is the design specification and outlines the fundamental building blocks of a
Docker network.

Libnetwork is a real-world implementation of the CNM. It’s open-sourced as part of
the Moby project21 and used by Docker and other platforms.

Drivers extend the model by implementing specific network topologies such as VXLAN
overlay networks.

#### CNM
![[Pasted image 20250818095701.png]]

Everything starts with a design.
The design guide for Docker networking is the CNM that outlines the fundamental
building blocks of a Docker network.

I recommend you read the specification document22, but at a high level, it defines three
building blocks:

• Sandboxes
• Endpoints
• Networks

A sandbox is an isolated network stack inside a container. It includes Ethernet interfaces,
ports, routing tables, DNS configuration, and everything else you’d expect from a
network stack.

Endpoints are virtual network interfaces that look, smell, and feel like regular network
interfaces. They connect sandboxes to networks.

Networks are virtual switches (usually software implementations of an 802.1d bridge). As
such, they group together and isolate one or more endpoints that need to communicate.


![[Pasted image 20250818095722.png]]

As the name suggests, the Container Network Model is all about providing networking
for containers. Figure 13.3 shows how CNM components relate to containers —
each container gets its own sandbox which hosts the container’s entire network stack,
including one or more endpoints that act as Ethernet interfaces and can be connected to
networks.