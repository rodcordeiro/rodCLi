const Configstore = require('configstore');
const Path = require('path');
const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync(Path.resolve(__dirname,"..","..",'package.json'), 'utf8'));

// Create a Configstore instance.
const config = new Configstore(packageJson.name,{version:packageJson.version});

module.exports = config
