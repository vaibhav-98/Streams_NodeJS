const { log } = require('console');
const fs = require('fs')        

const readableStream = fs.createReadStream('largeFile.txt',  {
    encoding: 'utf8',
    highWaterMark: 16 // Number of bytes per chunk
});

readableStream.on('data',(chunk) => {
    console.log('Chunk received:', chunk);
})

readableStream.on('end' , (chunk) => {
    console.log('finished reading file ');
    
})


readableStream.on('error', (err) => {
    console.log("Error reading file ");
    
})



// // Create a writable stream to the file
// const file = fs.createWriteStream('./big.file');

// // Write 1 million lines of text
// for (let i = 0; i <= 1000; i++) {
//     file.write("249. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Line number 249.\n");
// }

// // Close the stream
// file.end(() => {
//     console.log('File has been written successfully!');
// });

const {Tranform} = require('stream') 

const upperCaseTransform = new Tranform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback()
    }
})


const writableStream= fs.createWriteStream('outFile.txt')

writableStream.on('finish', () => {
  console.log('finished writing files');
  
})

readableStream
.pipe(upperCaseTransform)
.pipe(writableStream)

