### bin
A lot of packages have one or more executable files that they’d like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the “npm” executable.)

To use this, supply a bin field in your package.json which is a map of command name to local file name. On install, npm will **symlink that file into prefix/bin for global installs, or ./node_modules/.bin/ for local installs.**

For example, myapp could have this:

```
{ "bin" : { "myapp" : "./cli.js" } }
```
So, when you install myapp, it’ll create a symlink from the cli.js script to /usr/local/bin/myapp.

If you have a single executable, and its name should be the name of the package, then you can just supply it as a string. For example:

```
{ "name": "my-program"
, "version": "1.2.5"
, "bin": "./path/to/program" }
```
would be the same as this:

```
{ "name": "my-program"
, "version": "1.2.5"
, "bin" : { "my-program" : "./path/to/program" } }
```

Please make sure that your file(s) referenced in bin starts with #!/usr/bin/env node, otherwise the scripts are started without the node executable!

ref:
https://docs.npmjs.com/files/package.json