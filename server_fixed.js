const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5001;
const server = http.createServer((req, res) => {
  // Phase 2: Serve static assets from the assets folder
  if (req.url.startsWith('/static')) {
    const filePath = path.join(__dirname, 'assets', req.url.replace('/static/', ''));
    const fileExtension = path.extname(filePath).substring(1);

    // Map file extensions to MIME types
    const mimeTypes = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'svg': 'image/svg+xml'
    };

    // Set the appropriate MIME type or default to text/plain
    const contentType = mimeTypes[fileExtension] || 'text/plain';

    // Stream and serve the requested file to handle large files
    const readStream = fs.createReadStream(filePath);
    readStream.on('open', () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      readStream.pipe(res);
    });

    readStream.on('error', () => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
    });
    return;
  }

  // Phase 1: Serve the index.html file for any other request
  const indexPath = path.join(__dirname, 'index.html');
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 Internal Server Error');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});