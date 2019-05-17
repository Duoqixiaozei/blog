var spawn = require('child_process').exec;
// Hexo 3 用户复制这段
hexo.on('new', function(data){
  spawn('start  "D:\Sublime Text3\sublime_text.exe" ' + data.path);
});