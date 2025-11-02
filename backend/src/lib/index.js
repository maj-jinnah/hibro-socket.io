import jwt from 'jsonwebtoken';

export const generateJWtToken = (payload, res) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: isProduction, // Ensures the cookie is only sent over HTTPS
        sameSite: 'strict', // Prevents the browser from sending the cookie along with cross-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds (matches JWT_EXPIRE)
    });

    return token;
}