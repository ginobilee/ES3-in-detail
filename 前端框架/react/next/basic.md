> For the initial page load, getInitialProps will execute on the server only. getInitialProps will only be executed on the client when navigating to a different route via the Link component or using the routing APIs.

> 
Note: use <Link prefetch> for maximum performance, to link and prefetch in the background at the same time