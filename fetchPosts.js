const http = require('http');
const fs = require('fs');

http.get( 'http://jsonplaceholder.typicode.com/posts', (res) => {
  let data = '';

  // A chunk of data has been received.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Make result directory and Write the data.
  res.on('end', () => {
    if(!fs.existsSync('./result')) {
      fs.mkdir('./result', (err) => {
        if (err) {
          console.log("Error: " + err.message);
        }
        console.log('folder created');
      })
    }

    fs.writeFile('./result/posts.json/', data, (err) => {
      if (err) {
            console.log("Error: " + err.message);
          } else {
              console.log('file was written');
            }
    });

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
