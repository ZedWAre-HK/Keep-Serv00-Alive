const express = require("express");
const path = require("path");
const exec = require("child_process").exec;
const app = express();
const port = 3000;

const user = "Serv00登录用户名"; //此处修改为Serv00的用户名
const nz_client = "agent.6667890.xyz:6666"; //可选：哪吒探针 此处修改为对端的IP:Port，如：nezha.cloudflare.com:2096
const nz_pw = ""; //哪吒探针 对端密钥
const pName = "s5";
const nName = "nezha-agent";

app.use(express.static(path.join(__dirname, 'static')));

function keepWebAlive() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  exec(`pgrep -laf ${pName}`, (err, stdout) => {
    const Process = `/home/${user}/.${pName}/${pName} -c /home/${user}/.${pName}/config.json`;

    if (stdout.includes(Process)) {
      console.log(`${formattedDate}, ${formattedTime}: Web Running`);
    } else {
      exec(`nohup ${Process} >/dev/null 2>&1 &`, (err) => {
        if (err) {
          console.log(`${formattedDate}, ${formattedTime}: Socks5 keep alive error: ${err}`);
        } else {
          console.log(`${formattedDate}, ${formattedTime}: Socks5 keep alive success!`);
        }
      });
    }
  });
}

function keepWebAlive() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  exec(`pgrep -laf ${nName}`, (err, stdout) => {
    const Process = `/home/${user}/.nezha-agent/nezha-agent -s ${nz_client} -p ${nz_pw} --report-delay 4 --disable-auto-update --disable-force-update`;

    if (stdout.includes(Process)) {
      console.log(`${formattedDate}, ${formattedTime}: Web Running`);
    } else {
      exec(`nohup ${Process} >/dev/null 2>&1 &`, (err) => {
        if (err) {
          console.log(`${formattedDate}, ${formattedTime}: Nezha keep alive error: ${err}`);
        } else {
          console.log(`${formattedDate}, ${formattedTime}: Nezha keep alive success!`);
        }
      });
    }
  });
}

setInterval(keepWebAlive, 10 * 1000);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
