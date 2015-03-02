exports.decodeAuthorizationHeader = function(req) {
    var authHeader = req.headers.authorization;
    var encoded = authHeader.replace("Basic ", "");
    var decoded = new Buffer(encoded, 'base64');
    var token = decoded.toString();
    return token;
};
