rebase

> If you treat rebasing as a way to clean up and work with commits before you push them, and if you only rebase commits that have never been available publicly, then you’ll be fine. If you rebase commits that have already been pushed publicly, and people may have based work on those commits, then you may be in for some frustrating trouble, and the scorn of your teammates.

> In general the way to get the best of both worlds is to rebase local changes you’ve made but haven’t shared yet before you push them in order to clean up your story, but never rebase anything you’ve pushed somewhere.

what is rebase ? 
> It works by going to the common ancestor of the two branches (the one you’re on and the one you’re rebasing onto), getting the diff introduced by each commit of the branch you’re on, saving those diffs to temporary files, resetting the current branch to the same commit as the branch you are rebasing onto, and finally applying each change in turn.

现在开发分支上rebase主分支，然后在主分支上merge开发分支。

> Often, you’ll do this to make sure your commits apply cleanly on a remote branch — perhaps in a project to which you’re trying to contribute but that you don’t maintain. In this case, you’d do your work in a branch and then rebase your work onto origin/master when you were ready to submit your patches to the main project. That way, the maintainer doesn’t have to do any integration work — just a fast-forward or a clean apply.

在贡献代码时，先rebase线上代码，然后再提交。这样线上管理员去merge时就会有一个线性的提交历史。

$ git rebase --onto master server client

上述命令的场景是，假设server是从master分支上拉出的，有了commit之后又拉出了client分支。之后server分支又有了改变。这时却想只把client分支上所有的改变合并到master上(不包括client和server共有而master没有的部分)。这就用到了上述命令，意思正式将client分支上非server分支的commit合并到master上。这个效果有点像cherry-pick，只是后者只能replay一条commit。

cherry-pick能不能replay多条记录？

### rebase的陷阱

> When you rebase stuff, you’re abandoning existing commits and creating new ones that are similar but different. If you push commits somewhere and others pull them down and base work on them, and then you rewrite those commits with git rebase and push them up again, your collaborators will have to re-merge their work and things will get messy when you try to pull their work back into yours.

当rebase的时候，你丢弃了旧的commit并创建了新的。他们很相似，但不同。如果你push了一些你的commit，其他人基于此开始了新的工作。然后你又因为rebase重新commit并提交，那在你之前工作基础上开发的其他人也必须重新merge。当你又要从他人的提交上pull时，事情变得更复杂。

能减轻这个问题痛苦度的一个方法是在pull时用rebase来pull：

> 在本例中另一种简单的方法是使用 git pull --rebase 命令而不是直接 git pull。 又或者你可以自己手动完成这个过程，先 git fetch，再 git rebase teamone/master。
如果你习惯使用 git pull ，同时又希望默认使用选项 --rebase，你可以执行这条语句 git config --global pull.rebase true 来更改 pull.rebase 的默认配置。

> 假如在那些已经被推送至共用仓库的提交上执行变基命令，并因此丢弃了一些别人的开发所基于的提交，那你就有大麻烦了，你的同事也会因此鄙视你。



原则

> Do not rebase commits that exist outside your repository.

直译应该是：不要rebase那些不是你本地仓库的commit。此处的rebase，指的应该是re-commit。其实原则是不要让rebase影响到已经提交的commit。

最典型的例子，如果feature分支是基于master的，已经提交了几个commit。这时对master分支做了hotfix，于是有新的commit。那么feature需要去merge分支master。如果用rebase，那么就会重写hotfix的commit，可能会造成分支的麻烦。正确的选择应该是merge线上的master。

如果我在master上做了一些commit，然后线上master有新的commit，我再从线上master分支rebase到本地分支，有可能线上后来的commit是晚于我本地的初始commit的，这样如果我rebase，就会将本地的commit放在线上的之前，同时也将线上的commit在我本地replay了。那么当我提交到线上的时候，线上合我这个分支应该用什么策略？如果用rebase会不会产生多余的commit(线上原来的)


使用 git rebase [basebranch] [topicbranch] 命令可以直接将特性分支（即本例中的 server）变基到目标分支（即 master）上。这样做能省去你先切换到 server 分支，再对其执行变基命令的多个步骤。
