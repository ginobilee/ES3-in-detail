# iterator与generator的目的

1. 更简洁/高效地迭代可迭代数据
2. 控制函数的执行流程(在适当的时候yeild)
3. 创建外观清晰的异步操作代码

特点
1. 使用for-of结合迭代器，轻松访问所有元素(其实for of就是再循环内执行了iterator的next，将value赋给标识符)
2. 所有的集合类型（数组、Map、Set）都具有迭代器，字符串同样有一个默认迭代器，可以轻松地迭代其中的字符。
3. *生成器委托*促进了对多个迭代器的良好封装。方法是在一个新的迭代器中使用`yeild *othenIterator`.

# iterator是什么
es6定义了两个新的协议：`iterable`和`iterator`

> An object is `iterable` if it defines its iteration behavior, such as what values are looped over in a for...of construct. Some built-in types, such as Array or Map, have a default iteration behavior, while other types (such as Object) do not.

> An object is an `iterator` when it knows how to access items from a collection one at a time, while keeping track of its current position within that sequence. `In JavaScript an iterator is an object that provides a next() method which returns the next item in the sequence.` This method returns an object with two properties: done and value.

`iterable`协议定义了一个对象如何规范自己的迭代行为。一个实现了@@iterator方法的对象可以被认为是一个`iterable`。

何谓实现了`@@iterator`方法？即有属性(或在原型链上有)`[Symbol.iterator]`的对象。这个属性是一个无行参的函数，它返回一个`iterator`对象。在用迭代访问器进行值访问时，就会访问这个方法返回的`iterator`对象。

`iterator`定义了一个可控制的流程。`iterator`接口规范了一个`next`方法，这个方法返回一个形式如`{value: 'xxx', done: false}`的对象。通过`iterator`的`next`方法，可以控制`iterator`的执行步骤。一个对象有这样的一个next方法属性，就可以说它是一个`iterator`。

# iterable的访问器
for-of / [...] / new Set() / yield*

# generator
generator是生成一个`iterator`最便捷的方法。它将函数体包装成一个实现了next方法的iterator对象。值得注意的是，一个generator object,要首先执行一遍next(),这时才会运行到函数体内的yield语句处。即：调用generator函数只是对函数题进行包装生成一个iterator，iterator内的流程还没有开始运行。这也是为何将之称为generator的原因吧。

更为方便的是，在generator中，可以用`yield*`语句嵌套一个generator object。这样在外层generator的流程控制中，在原来的`yield*`语句处内嵌了所嵌套的generator的流程。这就使得进行一个任务的流式处理提供了很方便的接口。如下：

```javascript
/**
 * Returns an iterable that transforms the input sequence
 * of characters into an output sequence of words.
 */
function* tokenize(chars) {
    const iterator = chars[Symbol.iterator]();
    let ch;
    do {
        ch = getNextItem(iterator); // (A)
        if (isWordChar(ch)) {
            let word = '';
            do {
                word += ch;
                ch = getNextItem(iterator); // (B)
            } while (isWordChar(ch));
            yield word; // (C)
        }
        // Ignore all other characters
    } while (ch !== END_OF_SEQUENCE);
}
const END_OF_SEQUENCE = Symbol();
function getNextItem(iterator) {
    const {value,done} = iterator.next();
    return done ? END_OF_SEQUENCE : value;
}
function isWordChar(ch) {
    return typeof ch === 'string' && /^[A-Za-z0-9]$/.test(ch);
}
/**
 * Returns an iterable that filters the input sequence
 * of words and only yields those that are numbers.
 */
function* extractNumbers(words) {
    for (const word of words) {
        if (/^[0-9]+$/.test(word)) {
            yield Number(word);
        }
    }
}
/**
 * Returns an iterable that contains, for each number in
 * `numbers`, the total sum of numbers encountered so far.
 * For example: 7, 4, -1 --> 7, 11, 10
 */
function* addNumbers(numbers) {
    let result = 0;
    for (const n of numbers) {
        result += n;
        yield result;
    }
}
const CHARS = '2 apples and 5 oranges.';
const CHAIN = addNumbers(extractNumbers(tokenize(CHARS)));
console.log([...CHAIN]);
```

# iterator的return方法

> return() is also used to close iterators. The chapter on iteration has a detailed section on that.

throw()方法也可以用来抛出一个异常，从而结束一个iterator。

# iterator与异步：

> Coroutines (data producers and consumers): Given that generators are pausable and can be both data producers and data consumers, not much work is needed to turn them into coroutines (cooperatively multitasked tasks).

> A significant limitation of generators is that you can only yield while you are (statically) inside a generator function. That is, yielding in callbacks doesn’t work:

> The operand of yield* does not have to be a generator object, it can be any iterable.

> co and similar libraries give you most of the power of coroutines, without their disadvantages:

They provide schedulers for tasks defined via generators.
Tasks “are” generators and can thus be fully suspended.
A recursive (generator) function call is only suspendable if it is done via yield*. That gives callers control over suspension.

# 在语句或表达式中使用yield的注意事项

> yield binds very loosely. As a consequence, many operators bind more tightly than yield and you have to put yield in parentheses if you want to use it as an operand.

> You do not need parens if yield is a direct argument in a function or method call

# iterator可以用来实现协程，而非iterator是用协程实现的。我自己的理解。
iterator的实现，是在对象上利用迭代实现了一个next()方法，外部通过调用这个对象的next()方法，可以用来实现流程控制，比如协程。但iterator的实现本身并没有什么魔法，它是通过js里的闭包和迭代实现的，提供了一个实现协程的接口。

# 什么是协程？
> 协程是一种任务调度机制，它可以让你用逻辑流的顺序去写控制流，而且还不会导致操作系统级的线程阻塞。你发起异步请求、注册回调/通知器、保存状态，挂起控制流、收到回调/通知、恢复状态、恢复控制流的所有过程都能过一个yield来默默完成。从代码结构上看，协程保证了编写过程中的思维连贯性，使得函数（闭包）体本身就无缝保持了程序状态。逻辑紧凑，可读性高，不易写出错的代码，可调试性强。从实现上看，与线程相比，这种主动让出型的调度方式更为高效。一方面，它让调用者自己来决定什么时候让出，比操作系统的抢占式调度所需要的时间代价要小很多。后者为了能恢复现场会在切换线程时保存相当多的状态，并且会非常频繁地进行切换。另一方面，协程本身可以做在用户态，每个协程的体积比线程要小得多，因此一个进程可以容纳数量相当可观的逻辑流。
> 主要有两个特点：
  占用的资源更少。
  所有的切换和调度都发生在用户态。

线程与协程的区别，主要还不是粒度的差别。主要是:
1. 协程是用户态的，即协程的切换不会像进程或线程涉及到系统的调用。
2. 协程之间是协作式的，线程是抢占式的。