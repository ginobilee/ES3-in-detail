springmvc vs struts

<blockquote>
The Spring MVC (Model View Controller) is designed around a DispatcherServlet, which dispatches the requests to handler with configurable handler mappings, view resolution and theme resolution.

In Struts, the object that is taking care of a request and routes it for further processing is known as “Action”.
	
*** While the objects responsible for handling requests and routing for processing in Struts called an Action, the same object is referred as Controller in Spring Web MVC framework. This is one of the very first differences between Spring MVC and Struts2. Struts 2 Actions are initiated every time when a request is made, whereas in Spring MVC the Controllers are created only once, stored in memory and shared among all the requests. So, Spring Web MVC framework is far efficient to handle the requests than Struts 2. ***

</blockquote>