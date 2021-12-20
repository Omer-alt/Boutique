const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    console.log('text');
    try{
        console.log({
            headers: req.headers
        })
        const token = req.headers.authorization.split(' ')[1];
        console.log({token})
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        console.log("token",token);
        console.log("decodedToken",decodedToken);
        console.log("useId du token",userId);
        console.log("user id de la page courante",req.body.userId );

        if(req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        } else{
            next();
        }
    } catch(error){
        res.status(401).json({
            error: error | 'Invalid request!'
        });
    }

};


