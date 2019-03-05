(function() {
    exports.onConnect = function(client, done) {
        client.emit('test', 'TEST');
        done();
    };
    exports.sendMessage = function(client, done) {
        done();
    };
})();

// websocket-bench -a 300 -c 300 -m 1  http://localhost:3000 -g generator.js