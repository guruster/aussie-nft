const path = require('path');
const fs = require('fs');

var config_dir = path.dirname(process.argv[1]);
var summary_file_names = [];

summary_file_names = fs.readdirSync(config_dir);
summary_file_names = summary_file_names.filter(file => path.extname(file) === '.txt');
console.log(summary_file_names);

const convert = async () => {
    summary_file_names.forEach(file => {
        let rawdata = fs.readFileSync(path.join(config_dir, file));
        let items = rawdata.toString().split("\t").filter(item => item.includes('.json')).map(item => item.split('\n')[0]);
        console.log(items);

        fs.writeFileSync(path.join(config_dir, path.basename(file, '.txt')+'.json'), JSON.stringify(items));
        console.log(`file is converted`);
    })
}

convert();