const mongoose = require('mongoose')
const User = require('../model/auth')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (username) => {
    return jwt.sign({ username }, 'access_token_secret', { expiresIn: '15m' });
};

const generateRefreshToken = (username) => {
    return jwt.sign({ username }, 'refresh_token_secret', { expiresIn: '7d' });
};

let refreshTokens = [];

// Đăng ký
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Tài khoản đã tồn tại' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Đăng ký thất bại' });
    }
});

// Đăng nhập
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Tài khoản không tồn tại' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Sai mật khẩu' });
        }
        const accessToken = generateAccessToken(username);
        const refreshToken = generateRefreshToken(username);
        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: 'Đăng nhập thất bại' });
    }
});

// Xác thực token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token không hợp lệ' });
    }
    jwt.verify(token, 'access_token_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token không hợp lệ' });
        }
        req.user = user;
        next();
    });
};

// Refresh token
app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Token refresh không tồn tại' });
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ error: 'Token refresh không hợp lệ' });
    }
    jwt.verify(refreshToken, 'refresh_token_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token refresh không hợp lệ' });
        }
        const accessToken = generateAccessToken(user.username);
        res.json({ accessToken });
    });
});

// Đăng xuất
app.post('/logout', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Token refresh không tồn tại' });
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.json({ message: 'Đăng xuất thành công' });
});
