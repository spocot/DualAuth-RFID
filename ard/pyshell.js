var PythonShell = require('python-shell');

var options = {
  args: ['/dev/ttyACM0']
};

var pyshell = new PythonShell('read.py',options);

pyshell.on('message', function(message) {
  console.log(message);
});

pyshell.end(function (err) {
  if (err) throw err;
  console.log('finished');
});