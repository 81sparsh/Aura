const isBlueTick = (req, res, next) => {   
    try {
        if(req.username == "sparshsharma"){
            req.isBlueTick = true;
        }
        else{
            req.isBlueTick = false;
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export default isBlueTick;