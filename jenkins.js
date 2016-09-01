var request = require('request');
var Promise = require('promise');

function JenkinsBuild(host, port, token) {
    this.req = request.defaults({
        jar: request.jar(),
        followAllRedirects: true,
        rejectUnauthorized: false
    });
    this.host = host;
    this.port = port;
    this.token = token
}

JenkinsBuild.prototype.trigger = function(jobName) {
    var self = this;
    return new Promise(function(resolve, reject) {
		console.log("Starting Jenkins build job " + jobName + "...");
        self.req.get(self.host + ":" + self.port + "/job/" + jobName + "/build?token=" + self.token,
            function (err, resp, body) {
                console.log(err);
                if (err) {
                    reject(err);
                    return;
                }
                if (resp.statusCode == 201) {
                    console.log(resp.statusCode); // request created
                    resolve(self);
                }
                else if (resp.statusCode == 404) {
                    console.log(resp.statusCode);
                    reject("Couldn't trigger Jenkins build _" + jobName + "_. Received http status code 404 from server. Check if the build is defined.");
                }
                else {
                    console.log(resp.statusCode);
                    reject("Couldn't trigger Jenkins build _" + jobName + "_. Received http status code " + resp.statusCode + " during request.");
                }
            }
        );
    });
};

module.exports = JenkinsBuild;
