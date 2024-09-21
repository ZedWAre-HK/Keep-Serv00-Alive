# Serv00 服务器优雅保活方案

本项目基于 hkfires 大佬的 [Github](https://github.com/hkfires/Keep-Serv00-Alive/) 项目进行了保活改进。在部署前，请确保已按 CMLiussss [博客](https://blog.cmliussss.com/p/Serv00-Socks5/) 的内容完成 Socks5 或哪吒探针的部署，并且正常运行。

在使用 Cron 进行进程保活时，常会遇到 Cron 任务被清除的情况，导致进程无法长时间存活。因此，本文提供了一种改进的保活方案。

该方案利用 Serv00 自带的 Apache 服务器的 Phusion Passenger 插件功能，在每次访问网页时唤醒 Node.js 程序，从而无需依赖 Cron，即避免了 Cron 任务被杀的烦恼。

## 部署步骤
1. 登录 Serv00 面板，删除注册后自带的网站。  
   ![](imgs/1.png)

2. 点击 "Delete (purge website files)" 清空网站文件。  
   ![](imgs/2.png)

3. 创建新网站，填写你想使用的域名（此处使用注册自带的域名），设置网站类型为 Node.js，程序版本选择 Node.js v22.4.1。  
   ![](imgs/3.png)

4. SSH 登录 Serv00，使用交互式脚本进行配置：
```
bash <(curl -sL https://github.com/ZedWAre-NEOFTT/Keep-Serv00-Alive/raw/refs/heads/main/keep-serv00-alive.sh)
```

5. 部署完成。

## 测试
1. 在浏览器中输入你创建的网站域名，应该能够看到默认页面。  
![](imgs/6.png)

2. 返回 SSH 终端，输入 `ps aux`，可以看到新启动的 Node.js 进程；稍后代理进程也会成功启动。  
![](imgs/7.png)

3. Node.js 程序的运行日志可以通过面板网站中的日志查看，或通过 SSH 终端查看，日志路径为：`/home/你的用户名/domains/你的网站域名/logs/error.log`

## 后续
- SOCKS 代理进程由 Node.js 进程负责保活，每 10 秒检查一次。因此，后续只需关注 Node.js 进程的保活。
- Node.js 进程的保活可以通过手动访问网站或自动化监控方案进行。
- 自动化网页监控推荐使用 [upptime](https://github.com/upptime/upptime)，不需要服务器，只需一个 Github 账号即可部署。

完结撒花~~

