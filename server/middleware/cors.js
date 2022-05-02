module.exports = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    return next();
}