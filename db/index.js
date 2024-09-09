const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://prashantdpawarr:Pawar%4014072001@cluster0.qg041bm.mongodb.net/blogpostingapp")

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
})

const BlogsSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Blogs = mongoose.model("Blogs", BlogsSchema);

module.exports = {
    Admin,
    User,
    Blogs
}   
