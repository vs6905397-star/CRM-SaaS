import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({
                message:"plese login first"
            })
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = decoded

        next();
        
    } catch (error) {
        res.status().json({
            message:"invalid token"
        }) 
     }
}

export default authMiddleware