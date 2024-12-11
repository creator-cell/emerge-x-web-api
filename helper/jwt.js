const { expressjwt } = require("express-jwt");

function AuthJwt() {
    const secret = process.env.JWT_SECRET;
    const ApiBaseUrl = process.env.BASE_URI_V1;
    const ServiceName = process.env.SERVICE_NAME;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/api\/v1\/store(.*)/, methods: ["GET","OPTION"] },
            `${ApiBaseUrl}${ServiceName}`
        ]
    })
}

async function isRevoked (req, token) {
    return;
}

module.exports = AuthJwt;
