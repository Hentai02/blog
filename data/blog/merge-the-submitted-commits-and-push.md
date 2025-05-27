---
title: 合并多个已经推送到远程仓库的提交
date: '2025-05-27'
tags: ['git', 'github', 'guide']
draft: false
type: Blog
summary: '合并多个提交是通过 Git 的 rebase 或 merge 命令实现的，尤其是当多个提交已经被推送到远程仓库时。使用 git rebase -i 来重写历史，合并多个提交为一个，避免修改公共历史，避免影响其他协作者。若已经推送，可以选择强制推送 (--force) 来更新远程仓库。'
---

## 查看提交历史

使用 `git log` 查看提交历史，获取需要合并的提交范围（commit ID）。
```bash
git log --oneline
```
例如，你可能会看到类似以下输出：
```
6fd7632 (HEAD -> main, origin/main) Added automatic switching of Giscus theme
394f661 Modify the article format and update the article overflow className
b8e59b5 Fix the prettier error
fd164df Fix the mobile end text overflow
...
```
这里每行前面的短 `commit ID`（如 `394f661`）是提交的唯一标识符。

## 启动交互式 rebase 合并提交
假设要合并最近的 3 个提交，可以使用以下命令：
```bash
git rebase -i HEAD~3
```
`HEAD~3` 表示你要操作最近的 3 个提交。调整数字来操作更多或更少的提交。

## 编辑提交
运行 `git rebase -i` 后，会打开一个编辑器，显示类似如下内容：
```
6fd7632 Added automatic switching of Giscus theme
394f661 Modify the article format and update the article overflow className
b8e59b5 Fix the prettier error
```
将**除第一个**提交以外的 pick 改为 fixup 或 f，表示将这些提交合并到第一个提交中：
```
pick 6fd7632 Added automatic switching of Giscus theme
fixup 394f661 Added new feature
fixup b8e59b5 Fixed encoding issue
```
- `squash` 会将当前提交与前一个提交合并，并将这两个提交的提交信息合并成一个新的提交。你可以在合并时修改提交信息，**保留所有合并的提交信息**。
- `fixup` 会将当前提交与前一个提交合并，并且**丢弃当前提交的提交信息**，只保留前一个提交的信息。它的目的是快速修复某个提交，而不改变历史记录的意义。

保存并退出编辑器。Git 会开始合并提交。

合并完成后，如果这些提交已经推送到远程仓库，需要强制推送：

```bash
git push origin main --force
```

## 撤销合并

```bash
git rebase --abort #放弃 rebase 操作（丢弃 rebase 所做的更改）

rm -rf .git/rebase-merge #强制删除 rebase 信息（如果你确认不要之前的 rebase）
```

