# 节流与防抖

throttle节流：在指定时间内如果多次触发只执行一次，但至少执行一次

debounce防抖：在指定时间内如果再次出发，则推迟执行，直到timeout内无再次出发才执行。


> As a rule of thumb, I would use requestAnimationFrame if your JavaScript function is "painting" or animating directly properties, use it at everything that involves re-calculating element positions.

To make Ajax requests, or deciding if adding/removing a class (that could trigger a CSS animation), I would consider _.debounce or _.throttle, where you can set up lower executing rates (200ms for example, instead of 16ms)

# In summary:

 - debounce: Grouping a sudden burst of events (like keystrokes) into a single one.
 - throttle: Guaranteeing a constant flow of executions every X milliseconds. Like checking every 200ms your scroll position to trigger a CSS animation.
 - requestAnimationFrame: a throttle alternative. When your function recalculates and renders elements on screen and you want to guarantee smooth changes or animations. Note: no IE9 support.