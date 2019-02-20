> The Bean module provides BeanFactory, which is a sophisticated implementation of the factory pattern. It decouples the configuration and specification of dependencies from the actual program logic.

> The Context module builds on the Core and Beans modules. It is a means to access any objects defined and configured.

> 💡The context module extends the BeanFactory and adds support for application lifecycle events, and validation. It enables many enterprise services such as JNDI access, EJB integration, remoting and scheduling, and also facilitates easy integration with the other frameworks.