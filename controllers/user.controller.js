const User = require('../models/user.model');

// Yêu cầu 1: CRUD User (có query username includes và xóa mềm)
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getAllUsers = async (req, res) => {
    try {
        let filter = { isDeleted: false };
        // Query theo username (includes - giống LIKE trong SQL)
        if (req.query.username) {
            filter.username = { $regex: req.query.username, $options: 'i' }; // 'i' để không phân biệt hoa thường
        }
        const users = await User.find(filter).populate('role');
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
        if (!user) return res.status(404).json({ message: 'User không tồn tại' });
        res.status(200).json(user);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.softDeleteUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.status(200).json({ message: 'Đã xóa mềm User' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// Yêu cầu 2: Hàm post /enable
exports.enableUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOneAndUpdate(
            { email: email, username: username, isDeleted: false }, 
            { status: true }, 
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'Sai thông tin email hoặc username' });
        res.status(200).json({ message: 'Đã Enable tài khoản', user });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// Yêu cầu 3: Hàm post /disable
exports.disableUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOneAndUpdate(
            { email: email, username: username, isDeleted: false }, 
            { status: false }, 
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'Sai thông tin email hoặc username' });
        res.status(200).json({ message: 'Đã Disable tài khoản', user });
    } catch (error) { res.status(500).json({ error: error.message }); }
};