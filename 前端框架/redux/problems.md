
工具函数如何互相访问redux的store？
1. 将组件中的props传给工具函数从而调用dispatch是可行的，但极不优雅
2. 更好的办法是将工具函数改为一个dispatch.
3. 最优雅的办法是将dispatch参数传给工具函数，然后工具函数中调用dispatch即可。