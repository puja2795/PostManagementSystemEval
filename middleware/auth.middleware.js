const jwt = require("jsonwebtoken");

const authMiddleware = ((req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, "fullstack");
        if(decoded){
            req.body.userId = decoded.id;
            next();
        }
        else{
            res.status(400).send({"msg":"Please Login First"})
        }
    }
    else{
        res.status(400).send({"msg":"Try to login first with token!"})
    }
})

module.exports={authMiddleware}