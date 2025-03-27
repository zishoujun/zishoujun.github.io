# 常用命令

- git branch -v 查看本地分支

---

- git branch -r 查看远程分支

---

- git branch -a 查看本地和远程分支

---

- git branch --delete/-d/-D(强制删除) dev 删除本地分支
  - git branch -d/--delete 的时候如果本地分支没有被合并就会提示这个问题
  - git branch -D 是强制删除，所以直接执行 强制删除就好了。

---

- git push origin --delete dev 删除远程分支

---

- git checkout dev 切换本地分支

---

- git checkout -b dev 创建本地并切

---

- git checkout origin/dev 切换远程分支

---

- git push --set-upstream origin dev 创建远程分支

---

- git checkout -b dev origin/dev 创建本地并切换远程

---

- git merge dev1 合并分支 目前在 dev dev1 是另一条分支用 git merge dev1 会将 dev1 的文件添加到 dev

---

- git mv oldName newName 修改一个目录或者文件的名字

---

- git rm 1.txt 命令把一个文件删除，并把它从 git 的仓库管理系统中移除。

---

- git stash 恢复到上次提交的内容，同时备份本地所做的修改 (用于切换分支报错)

---

- git reflog 查询丢失文件

---

- git reset --hard HEAD@{12} 恢复

---

```yaml
$ git config --global user.name "楼下小黑"
$ git config --global user.email "1164240637@qq.com"
```

# 生成/添加 SSH 公钥

- ssh-keygen -t ed25519 -C "1164240637@qq.com"
- ~/.ssh/id_ed25519.pub 查看
- ssh -T git@gitee.com

# window 切户 git 账号

1. 打开控制面板，选择用户账户->管理你的凭据
2. 点击 Windows 凭据，选择相应的 git 凭据，删除或修改
3. git config --global user.name "username" git config --global user.email "xxx@xxx.com"

# 常见问题

## 远程与本地代码不一致

```json (问题)
! [rejected] "master -> master (non-fast-forward)"
"error: failed to push some refs to 'https://~.git"
```

> 解决:`git pull --rebase origin master`

## 2 远程的记录和现在不同

```json (问题)
! [rejected]          dev -> dev (fetch first)
```

> 解决:`git push -f origin dev`

## 3 不允许提交不关联的历史代码

```yaml
fatal: refusing to merge unrelated histories
```

> 解决办法是：在 git pull 和 git push 命令中添加–allow-unrelated-histories 让 git 允许提交不关联的历史代码。
> git pull origin master --allow-unrelated-histories
> git push origin master --allow-unrelated-histories



## 4 文件大小问题
git config core.ignorecase false

# 重命名文件
git mv example.txt example.txt
git add example.txt
git commit -m "Change filename case"
