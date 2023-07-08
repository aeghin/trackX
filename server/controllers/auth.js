import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newUser = new User({ email, password });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message })
    };
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

    } catch (err) {
        res.status(500).json({ error: err.message })
    };
};