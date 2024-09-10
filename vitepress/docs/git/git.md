- git log 查看提交记录

1. --graph
2. --oneline
3. --stat
4. -p
5. -n
6. --author
7. --after
8. --before
9. --decoreate


- `git log dev --reverse | head -1`

* 将最近一次的commit 放回至暂存区
- `git reset --soft HEAD^`

* 撤销 commit 的操作
- `git reset --soft 64d26fb3eccea65549f5057ce1744e277db9cc46`

* 撤销 commit 和 add 的操作
- `git reset --mixed b00740d90324f758ff89bf2a12c9223333e4c00a`

* 回退并舍弃之前版本
- `git reset --hard 64d26fb3eccea65549f5057ce1744e277db9cc46`

* 解决：master 合并 release 直接被覆盖代码也会消失 =* 需要制造冲突来进行保留需要的东西
- `git merge --no-ff release`

* diff 对比两个分支的内容
- `git diff release`

* 保留 master 分支的所有修改而忽略 release 分支的修改
- `git merge --ours release`

* master 合并 release 后 不让自动提交
- `git merge --no-commit release`

* 回到合并前
- `git merge --abort`

* git log 状态
- 英文 `q` 直接退出

* 更换仓库地址
- `git remote set-url origin git@codeup.aliyun.com:6181dbecd39c439da2eea9a0/gxb/gxb_jy_view.git`

* more 可以直接停止需要连续操作的命令行
- 例如:
  1. git log 后需要 q 退出, 使用 more => `git log | more`
  2. dir - 显示当前目录中的文件和子目录列表
  3. cd - 修改当前工作目录
  4. mkdir - 创建一个新的目录
  5. rmdir - 删除一个空间目录
  6. copy - 将一个或多个文件从一个位置复制到另一个位置
  7. move - 移动一个或多个文件从一个位置到另一个位置
  8. del - 删除一个或多个文件
  9. ren - 重命名一个文件
  10. type - 显示文档的内容
  11. find - 在一个或多个文件中查找一个字符串
  12. chkdsk - 检查磁盘驱动器的文件系统并修复错误

* 使用 bindzip 在 cmd 压缩文件
- del /a/f/q dist.zip && bz a -fmt:zip html.zip html

* git 针对文件名大小写
- `git config core.ignorecase false` 改完文件之后还原配置 `git config core.ignorecase true` 否则会出问题



