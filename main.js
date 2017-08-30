'use strict';

const {spawnSync} = require('child_process');
const path = require('path');


function execSync(cmd, args, options) {
    let child = spawnSync(cmd, args);
    options.write(child.output.join(''));
    if (child.status !== 0) {
        process.exit(child.status);
    }
}

module.exports = {

    require: function(packageName, customOptions) {
        try {
            let object = require(packageName);
            return object;
        } catch (ex) {
            let options = {
                args: [],
                stdout: console.log,
                moduleName: packageName.startsWith('@') ? packageName : path.basename(packageName),
                write: function (msg) {
                    if (this.stdout) {
                        this.stdout(msg);
                    }
                }
            };
            customOptions = customOptions || {};

            for (let key in customOptions) {
                if (options[key]) {
                    options[key] = customOptions[key];
                }
            }

            options.write('Module ' + options.moduleName + ' was not found. ');
            options.write('...Installing it...');

            execSync('npm', ['i', '-g'].concat(options.args).concat([options.moduleName]), options);
            execSync('npm', ['link', options.moduleName], options);

            options.write('\nRun it again!!');
            process.exit(0);
        }
    }
};
