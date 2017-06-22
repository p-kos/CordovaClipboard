function copy(text, callback) {
    if (text) {
        document.oncopy = function (event) {
            event.clipboardData.setData("text/plain", text);
            event.preventDefault();
            callback();
        };
        document.execCommand("Copy", false, null);
    }
}

function paste(callback) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.select();
    document.execCommand("Paste", false, null);
    var text = x.value;
    callback(text);
}

module.exports = {
    copy: function (successCallback, errorCallback, args) {
        try {
            var text = args[0];
            if (!text || !text.length) {
                fail("There is no text to copy");
            }
            setTimeout(function () {
                copy(text, function () {
                    successCallback();
                });
            }, 0);
        }
        catch (e) {
            errorCallback(e);
        }
    },
    paste: function (successCallback, errorCallback) {
        try {
            setTimeout(function () {
                paste(function (text) {
                    successCallback(text);
                })
            }, 0);
        }
        catch (e) {
            errorCallback(e);
        }
    }
}
require("cordova/exec/proxy").add("Clipboard", module.exports);