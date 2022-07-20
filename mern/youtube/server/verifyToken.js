import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    (!token) && res.status(400).json("You are not authenticated")

    jwt.verify(token, process.env.JWT ,(error, data) => {
        // console.log(error, data)
        (error) && res.status(403).json("Token is invalid")
        req.user = data
        next()
    })
}