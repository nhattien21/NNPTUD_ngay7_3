const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false } // Dùng cho xóa mềm
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);