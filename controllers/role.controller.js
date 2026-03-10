const Role = require('../models/role.model');
const User = require('../models/user.model');

// Yêu cầu 1: CRUD Role (có xóa mềm)
exports.createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false }); // Chỉ lấy chưa bị xóa mềm
        res.status(200).json(roles);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
        if (!role) return res.status(404).json({ message: 'Role không tồn tại' });
        res.status(200).json(role);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { new: true });
        res.status(200).json(role);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.softDeleteRole = async (req, res) => {
    try {
        // Xóa mềm: Chuyển isDeleted thành true thay vì xóa hẳn
        await Role.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.status(200).json({ message: 'Đã xóa mềm Role' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// Yêu cầu 4: Lấy tất cả user có role là id
exports.getUsersByRoleId = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.id, isDeleted: false }).populate('role');
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
};