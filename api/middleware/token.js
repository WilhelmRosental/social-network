const JWT = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

function issueJWT(user) {
    const id = user.id;
    const expiresIn = "24H";
    const payload = {
        sub: id,
        iat: Date.now(),
    };
    const signedToken = JWT.sign(payload, secretKey, {expiresIn: expiresIn});
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn,
    };
}

function getUserId(req) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = JWT.verify(token, secretKey);
    return decodedToken.sub;
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;