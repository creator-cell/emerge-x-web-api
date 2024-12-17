const { expressjwt } = require("express-jwt");

function AuthJwt() {
    const secret = process.env.JWT_SECRET;
    return expressjwt({
        secret,
        getToken: (req) => {
            return req.cookies?.token || req.get("Authorization")?.split(" ")[1];
        },
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /v1\/user(.*)/, methods: ["GET","OPTION"] },
            { url: /v1\/blog(.*)/, methods: ["GET","OPTION"] },
            { url: /v1\/news(.*)/, methods: ["GET","OPTION"] },
            { url: /v1\/contact(.*)/, methods: ["GET","OPTION"] },
            { url: /v1\/demoRequest(.*)/, methods: ["GET","OPTION"] },
            `/v1/user/login`,
            `/v1/user/forgot-password`,
            `/v1/user/reset-password`,
            `/v1/user`   
        ]
    })
}

async function isRevoked (req, token) {
    return;
}

module.exports = AuthJwt;
