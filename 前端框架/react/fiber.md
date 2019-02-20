# fiber

# target
> The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. **Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.**

> a primary goal of Fiber is to enable React to take advantage of scheduling. Specifically, we need to be able to

pause work and come back to it later.
assign priority to different types of work.
	如何实现？
reuse previously completed work.
abort work if it's no longer needed.

> Newer browsers (and React Native) implement APIs that help address this exact problem: requestIdleCallback schedules a low priority function to be called during an idle period, and requestAnimationFrame schedules a high priority function to be called on the next animation frame. The problem is that, in order to use those APIs, you need a way to break rendering work into incremental units. If you rely only on the call stack, it will keep doing work until the stack is empty.

> That's the purpose of React Fiber. Fiber is reimplementation of the stack, specialized for React components. You can think of a single fiber as a virtual stack frame.

> With the exception of NoWork, which is 0, a larger number indicates a lower priority.

<blockquote>
	The scheduler uses the priority field to search for the next unit of work to perform. This algorithm will be discussed in a future section.

	At any time, a component instance has at most two fibers that correspond to it: the current, flushed fiber, and the work-in-progress fiber.

	The alternate of the current fiber is the work-in-progress, and the alternate of the work-in-progress is the current fiber.

A fiber's alternate is created lazily using a function called cloneFiber. Rather than always creating a new object, cloneFiber will attempt to reuse the fiber's alternate if it exists, minimizing allocations.
</blockquote>

### output
<blockquote>
	Every fiber eventually has output, but output is created only at the leaf nodes by host components. The output is then transferred up the tree.

The output is what is eventually given to the renderer so that it can flush the changes to the rendering environment. It's the renderer's responsibility to define how the output is created and updated.
</blockquote>