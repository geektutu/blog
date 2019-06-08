---
title: 99%的时间在使用的Git命令
date: 2017-09-07 10:51:24
description: Git是目前最流行的分布式版本控制系统，它是Linus献给软件行业的两件礼物之一，另外一件礼物是目前最大的服务器系统软件Linux。这篇文章介绍99%时间大家在使用的Git命令。
tags:
- Git
---


Git是目前最流行的分布式版本控制系统，它是Linus献给软件行业的两件礼物之一，另外一件礼物是目前最大的服务器系统软件Linux。

Git出现之前，linux的源代码使用BitMover公司的BitKeeper进行版本控制。这是一个商业的版本控制系统，一开始授权Linux社区免费使用，后来由于某种原因，BitMover公司打算收回了Linux社区的免费使用权。这个时候，Linus花了两周时间自己用C写了一个分布式版本控制系统，并在一个月之内托管了linux系统的源码，这一年，是2005年。

## 最常用的4条命令
Git是一个非常强大的工具，各种命令组合上千种。不过，我们90%的时间估计都在用这4条命令。
```bash
$ git status # 查看工作区和缓冲区状态
$ git add --all # 将工作区修改暂存到缓冲区
$ git commit -m"<comment>" # 提交到仓库
$ git push origin master # 推送到远程分支
```

如果只是个人开发，几天便结束的小项目，使用Git仅为了方便回退到某个点，记录开发进度，这几条命令当然就够了。

为了合作与规范，这还远远不够

## 关联远程仓库
- 如果还没有Git仓库，你需要
```bash
$ git init
```

- 如果你想关联远程仓库
```bash
$ git remote add <name> <git-repo-url>
# 例如 git remote add origin https://github.com/xxxxxx
```
- 如果你想关联多个远程仓库
```bash
$ git remote add <name> <another-git-repo-url>
# 例如 git remote add coding https://coding.net/xxxxxx
```
> <name>是远程仓库的名称，通常为 origin

- 忘了关联了哪些仓库或者地址
```bash
$ blog-react git:(master) git remote -v
# origin https://github.com/gzdaijie/koa-react-server-render-blog.git (fetch)
# origin https://github.com/gzdaijie/koa-react-server-render-blog.git (push)
```

- 如果远程有仓库，你需要clone到本地
```bash
$ git clone <git-repo-url>
```
> 关联的远程仓库将被命名为origin，这是默认的。

- 如果你想把别人仓库的地址改为自己的
```bash
$ git remote set-url origin <your-git-url>
```

## 切换分支
- 新建仓库后，默认生成了master分支
- 如果你想新建分支并切换
```bash
$ git checkout -b <new-branch-name>
# 例如 git checkout -b dev
# 如果仅新建，不切换，则去掉参数 -b
```
- 看看当前有哪些分支
```bash
$ git branch
# * dev
#   master
```
> 标*号的代表当前所在的分支

- 看看当前本地&远程有哪些分支
```bash
$ git branch -a
# * dev
#   master
#   remotes/origin/master
```
- 切换到现有的分支
```bash
$ git checkout master
```
- 你想把dev分支合并到master分支
```bash
$ git merge <branch-name>
# 例如 git merge dev
```
- 你想把本地master分支推送到远程去
```bash
$ git push origin master
```
> 你可以使用`git push -u origin master`将本地分支与远程分支关联，之后仅需要使用`git push`即可。

- 远程分支被别人更新了，你需要更新代码
```bash
$ git pull origin <branch-name>
```
> 之前如果push时使用过-u，那么就可以省略为`git pull`

- 本地有修改，能不能先git pull
```
$ git stash # 工作区修改暂存
$ git pull  # 更新分支
$ git stash pop # 暂存修改恢复到工作区
```

## 撤销操作
- 恢复暂存区文件到工作区
```bash
$ git checkout <file-name>
```

- 恢复暂存区的所有文件到工作区
```bash
$ git checkout .
```

- 重置暂存区的某文件，与上一次commit保持一致，但工作区不变
```bash
$ git reset <file-name>
```

- 重置暂存区与工作区，与上一次commit保持一致
```bash
$ git reset --hard <file-name>
```
> 如果是回退版本(commit)，那么file，变成commit的hash码就好了。

- 去掉某个commit
```bash
$ git revert <commit-hash>
```
> 实质是新建了一个与原来完全相反的commit，抵消了原来commit的效果

## 版本回退与前进
- 查看历史版本
```bash
$ git log
```
- 你可能觉得这样的log不好看，试试这个
```bash
$ git log --graph --decorate --abbrev-commit --all
```
- 检出到任意版本
```bash
$ git checkout a5d88ea
```
> hash码很长，通常6-7位就够了

- 远程仓库的版本很新，但是你还是想用老版本覆盖
```bash
$ git push origin master --force
# 或者 git push -f origin master
```

- 觉得commit太多了？多个commit合并为1个
```bash
$ git rebase -i HEAD~4
```
> 这个命令，将最近4个commit合并为1个，HEAD代表当前版本。将进入VIM界面，你可以修改提交信息。推送到远程分支的commit，不建议这样做，多人合作时，通常不建议修改历史。

- 想回退到某一个版本
```bash
$ git reset --hard <hash>
# 例如 git reset --hard a3hd73r
```
> --hard代表丢弃工作区的修改，让工作区与版本代码一模一样，与之对应，--soft参数代表保留工作区的修改。

- 想回退到上一个版本，有没有简便方法？
```bash
$ git reset --hard HEAD^
```

- 回退到上上个版本呢？
```bash
$ git reset --hard HEAD^^
```
> HEAD^^可以换作具体版本hash值。

- 回退错了，能不能前进呀
```bash
$ git reflog
```
> 这个命令保留了最近执行的操作及所处的版本，每条命令前的hash值，则是对应版本的hash值。使用上述的`git checkout` 或者 `git reset`命令 则可以检出或回退到对应版本。

- 刚才commit信息写错了，可以修改吗
```bash
$ git commit --amend
```

- 看看当前状态吧
```bash
$ git status
```

## 配置属于你的Git
- 看看当前的配置
```bash
$ git config --list
```
- 估计你需要配置你的名字
```bash
$ git config --global user.name "<name>"
```
> --global为可选参数，该参数表示配置全局信息

- 希望别人看到你的commit可以联系到你
```bash
$ git config --global user.email "<email address>"
```
- 有些命令很长，能不能简化一下
```bash
$ git config --global alias.logg "log --graph --decorate --abbrev-commit --all"
```
> 之后就可以开心地使用 `git logg`了

## 最后
这篇文章是对平时工作中最常用到的命令的一个总结，无论是初学者，还是已经使用了Git几年的你，都能有所收获吧。

如果你是第一次接触Git，那么这篇文章并不适合你，你需要先去了解Git的四个状态、三个区等概念。
