Docker - jenkins

运行jenkins:

>  docker run  --rm  -u root  -p 8080:8080  -v jenkins-data:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock  -v "$HOME":/home   jenkinsci/blueocean --name jenkins

最后一行的—name是docker中container的名字。

> This means you could access the Jenkins/Blue Ocean container (through a separate terminal/command prompt window) with a `docker exec` command like:
>
> `docker exec -it jenkins-tutorials bash`



Docker password 地址

> Less /var/jenkins_home/secrets/initialAdminPassword