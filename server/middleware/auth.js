const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        req.isAuth = false;
        return next();
    }
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'specialsecretkey');
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodeToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req._id = decodeToken.data._id;
    return next();
}