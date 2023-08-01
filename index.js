const server = require('./api/server.js');
const PORT = require('./config/index.js').PORT;

server.listen(PORT, () => {
    console.log(`Listening on port \x1b[35m${PORT}\x1b[0m`);
});