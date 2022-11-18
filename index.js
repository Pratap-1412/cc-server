const express = require('express');
const cors = require('cors');
const User = require('./db/user')
const Admin = require('./db/admin')
const Notification = require('./db/Notification')
require('./db/config');
const port =  process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async (req, resp) => {
    let data = new User(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post('/create-task', async (req, resp) => {
    let data = new Notification(req.body);
    let result = await data.save();
    result = result.toObject();
    resp.send(result);
});

app.post('/admin-signup', async (req, resp) => {
    let data = new Admin(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password").select("-phone");
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: "No user found" });
        }
    }
    else {
        resp.send("Please provide proper detail");
    }
});

app.post('/admin-login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let admin = await Admin.findOne(req.body).select("-password").select("-phone");
        if (admin) {
            resp.send(admin);
        }
        else {
            resp.send({ result: "No user found" });
        }
    }
    else {
        resp.send("Please provide proper detail");
    }
});

app.get('/notification-list', async (req, resp) => {
    let user = await Notification.find();
    if (user.length > 0) {
        resp.send(user);
    }
    else {
        resp.send({ result: "No Product Found" });
    }
});

app.delete('/notification-list/:id', async (req, resp) => {
    let user = await Notification.deleteOne({ _id: req.params.id });
    if (user) {
        resp.send(user);
    }
    else {
        resp.send({ user: "Please enter valid data." })
    }
});

app.put('/notification-list/:id', async (req, resp) => {
    const result = await Notification.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No data found !!!" })
    }
});

app.get('/notification-list/:id', async (req, resp) => {
    let result = await Notification.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "User not found !" })
    }
})

app.get('/update-admin-profile/:id', async (req, resp) => {
    let result = await Admin.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "User not found !" })
    }
});

app.get('/update-user-profile/:id', async (req, resp) => {
    let result = await User.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "User not found !" })
    }
});

app.put('/update-user-profile/:id', async (req, resp) => {
    const result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No data found !!!" })
    }
});

app.put('/update-admin-profile/:id', async (req, resp) => {
    const result = await Admin.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No data found !!!" })
    }
});

app.get('/user-profile', async (req, resp) => {
    let user = await User.find();
    if (user.length > 0) {
        resp.send(user);
    }
    else {
        resp.send({ result: "No Product Found" });
    }
});

app.get('/admin-profile', async (req, resp) => {
    let user = await Admin.find();
    if (user.length > 0) {
        resp.send(user);
    }
    else {
        resp.send({ result: "No Product Found" });
    }
});

app.get('/userslist', async (req, resp) => {
    let user = await User.find();
    if (user.length > 0) {
        resp.send(user);
    }
    else {
        resp.send({ result: "No Product Found" });
    }
});

app.delete('/userslist/:id', async (req, resp) => {
    let user = await User.deleteOne({ _id: req.params.id });
    if (user) {
        resp.send(user);
    }
    else {
        resp.send({ user: "Please enter valid data." })
    }
});

app.put('/userslist/:id', async (req, resp) => {
    const result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No data found !!!" })
    }
});

app.listen(port);