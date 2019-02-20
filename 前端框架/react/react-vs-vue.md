> React 16.4 has a lot of improvements, including the ability to return string fragments, better error handling and a new context API.

> The biggest difference is that React popularized a Virtual DOM (we’ll get into this later) and created a new syntax called JSX that allows developers to write HTML in JavaScript. WAT?

> Vue uses a template system instead of JSX, arguably making it easier to integrate into existing apps.

> On the topic of state management for large scale applications, Evan You, creator of Vue.js, has said that these kind of solutions are suitable for small scale applications, but are not scalable for larger applications.

> Well, the key differences between `React` and `Vue` are:

Vue implements state observation but React doesn’t. But are you sure that it is good for you to observe recursively all component state (how much unnecessary work Vue does in order to observe todo list? At the end of the observation Vue in any case calls its own `setState`.
Vue uses templates but React uses JSX that quite naturally extends vanila JavaScript, so you do not need to study and remember all magic symbols that should be used in vue-templates.
Summarizing, React provides a little bit lower layer of data-flow control then Vue does.

So, if you prefer magic — you should choose Vue, but consider that

The price for magic is your soul )


> What are the advantages of React over VueJS?
React has the following advantages over Vue:

Gives more flexibility in large apps developing;
Easier to test;
Suitable for mobile apps creating;
More information and solutions available
