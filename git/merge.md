merge

> In this case, Git does a simple three-way merge, using the two snapshots pointed to by the branch tips and the common ancestor of the two.

git所用的三方合并，即在两个分支上寻找最近的共同祖先(1)，两个分支的HEAD(2和3),进行snapshot，然后比较2和3所做的更改。如果两者不冲突，那么就干净地合并；如果冲突，则报conflict。需要手动去merge。这个过程如果某个分支中间经过多个commit，其实merge时是不关心的，只是对HEAD进行snapshot比较。

与之对应，rebase其实是将每个commit在当前分支上重演一遍。那么重演按照什么顺序呢？如果纯粹按照时间顺序，那么也只要按顺序改就可以了，其实也不存在conflict，那么conflict是怎么产生的呢？所以一定不是单纯地按顺序merge。   是不是按顺序rebase，当遇到下一个commit与之前不是一个分支时就需要进行snapshot check?