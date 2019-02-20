jquery中类似这种:  $("#msg").text(); 和 $("#msg").text("<b>new content</b>")
同一个api，在有内容时作为setter，在内容为空时作为getter的用法，还是设计很棒的。


jquery 对象: https://www.cnblogs.com/akahitoha/p/6722524.html


jQuery 本身是一个对象。这个对象是一个函数。关键在于这个函数的原型。它的原型是一个对象字面量。
其上面有比如 