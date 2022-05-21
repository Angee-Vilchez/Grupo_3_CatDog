const fs = require("fs");
const path = require("path")

module.exports={
    readJson:(archive)=>{
        return JSON.parse(fs.readFileSync(path.join(__dirname, archive),"utf-8"))
    },
    saveJson: (archive, data)=>{
        return fs.writeFileSync(path.join(__dirname,archive),JSON.stringify(data));
    }
}