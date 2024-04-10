require("dotenv").config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const User = require("../models/users_model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Crear token
async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}

const register = async (req, res) => {
    console.log(req.body)
    try {
        const { username, email, password } = req.body;
        let { role } = req.body;

        if (!username || !email || !password) return res.status(400).json({ message: 'Datos incompletos' });

        //Buscar si ya existe el correo
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({
            message: "Este correo ya existe",
        });

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        //Validar rol
        if (!role || role !== 'admin') role = 'user';

        // Crear y guardar usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
        });
        const userSaved = await newUser.save();

        // Crear token de acceso
        const token = await createAccessToken({
            id: userSaved._id,
            username: userSaved.username,
            role: userSaved.role,
        });
        res.cookie("token", token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
        });

        //Retornar datos guardados
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Datos incompletos' });

        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: "El correo no existe" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Contraseña incorrecta",
            });
        }

        const token = await createAccessToken({
            id: userFound._id,
            username: userFound.username,
            role: userFound.role,
        });

        res.cookie("token", token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    //console.log(token)
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
        });
    });
};

const logout = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
    res.cookie("token", "", {
        expires: new Date(0),
    });
    console.log("Cerré sesión");
    return res.sendStatus(200);
};

const viewUsers = async (req, res) => {
    //console.log(req.user);
    if (!req.user) return res.status(500).json({ message: "Sin datos del token" });

    try {
        User.find({}).then((data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error al obtener datos",
        });
    }
};



const test = async (req, res) => {
    //console.log(req.user);
    if (!req.user) return res.status(500).json({ message: "Sin datos del token" });
    const userData = await User.findById(req.user.id);
    if (!userData) return res.status(400).json({ message: "No se encontró ningún usuario" });

    return res.json({
        id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
    })
};

const testAdmin = async (req, res) => {
    //console.log(req.user);
    if (!req.user) return res.status(500).json({ message: "Sin datos del token" });
    const userData = await User.findById(req.user.id);
    if (!userData) return res.status(400).json({ message: "No se encontró ningún usuario" });

    return res.json({
        id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
    })
};

module.exports = {
    register: register,
    login: login,
    verifyToken: verifyToken,
    logout: logout,
    viewUsers: viewUsers,
    /*deleteUsers: deleteUsers,*/
    test: test,
    testAdmin: testAdmin,
}