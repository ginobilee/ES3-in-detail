### 合并本地多个commit？
一般来说是连续的多个commit。首先用：
`git rebase -i HEAD~n` 进入功能对话框。`i`表示可以交互操作；n表示从HEAD开始要合并的commit数量。
这样会进入一个交互窗口，提示可以编辑git的命令。其中有pick/reword/edit/squash/fixup等命令。比如：
```
pick 8badnm old commit message 1
pick 98jnmb old commit message 2
```
这个是git要执行的命令。如果要合并这两个commit，需要将第二行的命令改写为`squash`或者`fixup`。如果要修改第一个commit的message，也要将`pick`修改为`reword`，如果要对第一个commit做文件变更，就将`pick`修改为`edit`。然后保存当前编辑区后就会执行上述命令。
如果需要变更commit message或者文件等等，根据命令的不同，这时就需要继续进行操作。如果选择了第一个commit进行reword，后面都是fixup，那么会直接进入`git commit --amend`的交互页，修改message并保存就完成了；如果是需要edit则需要自己在变更文件后键入`git commit --amend`重复前述过程，并在其后执行`git rebase --continue`以结束整个合并过程。

tips: 一定要是合并本地的多个commit，而不是涉及远程的commit。

### 利用rebase合并分支
i. 对于不同分支
如果远程有了新的commit，本地也有不一样的新的commit，从远程拉回来时用 `git pull --rebase` 会重写远程上的commit么？

当执行`git rebase toBeRebased`时，是以分支`toBeRebased`视角看待自己和传入的更改。

当在分支featureA上rebase分支featureB时，只会修改featureA上的commit以配合featureB，因此不会影响featureB。这样在featureB合并A时只要merge，就会有一个线性的提交记录。


ii. 如果是同一分支呢？
同样，也不会修改从远程拉下来的commit。所以从远程进行pull时用`git pull --rebase`还是一个可靠的策略。
但一定要保证本地的commit没有提交过。
如果本地提交很多，可能会比较复杂，也可能会需要不停地fix conflict。