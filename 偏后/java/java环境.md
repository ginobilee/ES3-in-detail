安装的jdk版本是9，而项目的依赖是8。导致项目中找不到sun的依赖。

重新安装jdk 8.

查找jdk的默认安装路径：
1. 执行 /usr/libexec/java_home -V

结果如下:
```
Matching Java Virtual Machines (3):
    9.0.1, x86_64:	"Java SE 9.0.1"	/Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk/Contents/Home
    1.8.0_171, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home
    1.8.0_131, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk/Contents/Home
```

找到了jdk的安装路径。

cd 到第三个路径下，执行`java -version`，结果仍然是9版本的信息。

如何查找当前的环境变量设置？

没有找到是在哪个地方设置的。于是尝试在/etc/profile中设置，因为说这个地方的优先级最高。

但是改写后说是readonly。

于是修改文件权限: chmod 777 /etc/profile

之后就可以改写了。进去添加如下：
```
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home

CLASSPAHT=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

PATH=$JAVA_HOME/bin:$PATH:

export JAVA_HOME

export CLASSPATH

export PATH
```

退出后查看java版本，终于为设置的8了。

但是bash环境下的颜色没了...