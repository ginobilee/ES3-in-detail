# chapter 10: Executable Code and Execution Contexts

###10.2 Lexical Environments

> A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment. 
> An Environment Record records the identifier bindings that are created within the scope of its associated Lexical Environment.
> The outer environment reference is used to model the logical nesting of Lexical Environment values.