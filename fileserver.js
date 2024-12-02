const fs = require('fs')
const server = require('http').createServer();

server.on('request', (ewq,res) => {
    // normal read file
    fs.readFile('./big.file', (err,data) => {
        if(err) throw err;
        res.end(data)
    })

    //read file through stream 
    const src = fs.createReadStream('./big.file');
    src.pipe(res)
})


server.listen(8000)
