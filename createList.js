// 在运行微webpack之前先将文件目录生成一变

const fs = require('fs');
let entryObj = [];
fs.readdir('./src/js', (err, data) => {
    if (err) {
        console.error('读取js文件目录出错--------------------->', err);
        return;
    } else {
        data.forEach((item, index) => {
            let name = item.split('.js')[0];
            entryObj.push(name);
        });
        fs.writeFile('catalog-list.json', JSON.stringify(entryObj));
    }
});