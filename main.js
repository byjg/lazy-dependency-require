'use strict';

const {spawnSync} = require('child_process');
const path = require('path');

module.exports = {

    load: function(packageName, options) {
        try {
            let object = require(packageName);
            return object;
        } catch (ex) {
            if (!options) {
                options = {
                    args: [],
                    output: console.log,
                    moduleName: null
                };
            }
            if (!options.args) {
                options.args = [];
            }
            if (!Array.isArray(options.args)) {
                throw new Error('InstallArgs must be an array or null');
            }
            if (!options.moduleName) {
                options.moduleName = path.basename(packageName);
                if (packageName.startsWith('@')) {
                    options.moduleName = packageName;
                }
            }
            
            if (options.log) {
                options.log('Module ' + options.moduleName + ' was not found. ');
                options.log('...Installing it...');
            }
            let npm = spawnSync('npm', ['i', '-g'].concat(options.args).concat([options.moduleName]));
            if (options.log) {
                options.log(npm.output.join('\n'));
            }
            if (npm.status === 0) {
                options.log('------------------\nTry to run again\n------------------\n');
            } else {
                throw new Error('ERROR during the install required module ' + options.moduleName);
            }
            process.exit(npm.status);
        }
    }
};
