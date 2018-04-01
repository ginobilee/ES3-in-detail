
# agent


> Agent: An agent is an abstraction encapsulating execution context stack, set of job queues, and code realms.

> An agent comprises a set of ECMAScript execution contexts, an execution context stack, a running execution context, a set of named job queues, an Agent Record, and an executing thread. Except for the executing thread, the constituents of an agent belong exclusively to that agent.

agent给es提供了多线程的能力。

> Implementation dependent an agent can run on the same thread, or on a separate thread. The Worker agent in the browser environment is an example of the Agent concept.

> The agents are state isolated from each other, and can communicate by sending messages. Some data can be shared through between agents, for example SharedArrayBuffers. Agents can also combine into agent clusters