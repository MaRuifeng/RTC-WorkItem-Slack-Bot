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


JenkinsBuild.prototype.fork_cookbooks = function(param_release_sprint, param_new_sprint) {
    var self = this;
    return new Promise(function(resolve, reject) {
        console.log("Starting Jenkins build job CCSSD-Fork_ACSE_Cookbooks with parameters...");
        self.req.get(self.host + ":" + self.port + "/job/CCSSD-Fork_ACSE_Cookbooks/buildWithParameters?token=" + self.token + "&NEW_SPRINT=" + param_new_sprint + "&RELEASE_SPRINT=" + param_release_sprint,
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
                    reject("Couldn't trigger Jenkins build _CCSSD-Fork_ACSE_Cookbooks_. Received http status code 404 from server. Check if the build is defined.");
                }
                else {
                    console.log(resp.statusCode);
                    reject("Couldn't trigger Jenkins build _CCSSD-Fork_ACSE_Cookbooks_. Received http status code " + resp.statusCode + " during request.");
                }
            }
        );
    });
};

module.exports = JenkinsBuild;
