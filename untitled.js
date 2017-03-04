const spawn = require('child_process').spawn;
const ls = spawn('/project/youplus/nodebook/youofficeMS/wwwApi/server/config/up.sh', ['site']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
ls.on('close', (code) => {
            console.log(code);
        });