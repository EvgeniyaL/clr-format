var dirs = require("../build/config/dirs.js");
var files = require("../build/config/files.js");
var readJSON = require("../build/utils/readJSON.js");

module.exports = function () {
    var format = require([dirs.parent, readJSON(files.package).main].join(dirs.separator));

    testCore(format);
    testConfig(format);
};

function testCore(format) {
    try {
        format("{0}", 1);
    }
    catch (error) {
        logError("Core cannot be loaded", error);
    }
}

function testConfig(format) {
    try {
        format.Config.addFormatToPrototype();
        "{0}".format(1);
    }
    catch (error) {
        logError("Config module cannot be loaded", error);
    }
    finally {
        delete String.prototype.format;
    }
}

function logError(message, error) {
    console.error("NPM exports test: " + message);
    throw error;
}