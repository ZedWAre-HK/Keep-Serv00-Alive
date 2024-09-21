const express = require("express");
const path = require("path");
const exec = require("child_process").exec;
const app = express();
const port = 3000;

const user = "Serv00登录用户名"; //此处修改为Serv00的用户名
const nz_client = "agent.6667890.xyz:6666"; //哪吒探针 对端IP:Port
const nz_pw = "2oYEfMfy3bnoQqSvVQ"; //哪吒探针 对端密钥
const pName = "s5";
const nName = "nezha-agent";

app.use(express.static(path.join(__dirname, 'static')));

function keepWebAlive() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  // Socks5 进程
  const socks5Process = `/home/${user}/.${pName}/${pName} -c /home/${user}/.${pName}/config.json`;
  exec(`pgrep -laf ${pName}`, (err, stdout) => {
    if (stdout.includes(socks5Process)) {
      console.log(`${formattedDate}, ${formattedTime}: Socks5 正在运行`);
    } else {
      exec(`nohup ${socks5Process} >/dev/null 2>&1 &`, (err) => {
        if (err) {
          console.log(`${formattedDate}, ${formattedTime}: Socks5 保持存活出错: ${err}`);
        } else {
          console.log(`${formattedDate}, ${formattedTime}: Socks5 保持存活成功！`);
        }
      });
    }
  });

  // Nezha-Agent 进程（与 Socks5 相同的逻辑）
  const nezhaProcess = `/home/${user}/.${nName}/${nName} -s ${nz_client} -p ${nz_pw} --report-delay 4 --disable-auto-update --disable-force-update`;
  exec(`pgrep -laf ${nName}`, (err, stdout) => {
    if (stdout.includes(nezhaProcess)) {
      console.log(`${formattedDate}, ${formattedTime}: Nezha-Agent 正在运行`);
    } else {
      exec(`nohup ${nezhaProcess} >/dev/null 2>&1 &`, (err) => {
        if (err) {
          console.log(`${formattedDate}, ${formattedTime}: Nezha-Agent 保持存活出错: ${err}`);
        } else {
          console.log(`${formattedDate}, ${formattedTime}: Nezha-Agent 保持存活成功！`);
        }
      });
    }
  });
}

// 每隔10秒检查一次两个进程
setInterval(keepWebAlive, 10 * 1000);

app.listen(port, () => {
  console.log(`服务器正在监听端口 ${port}！`);
});
