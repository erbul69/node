const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: String,
    surname: String,
    mail: { type: String, unique: true },
    password: { type: String, require: true },
});

const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.mongoString)
.catch((e) => {
    console.log("error connecting to mongoose");
});

mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
});

async function insertUser(_user) {
    var user = new User(_user);
    try{
        return(await user.save());
    }
    catch(err){
        console.log(err);
        return(false);
    }
}

async function signUser(_user){
    try{
        const user = await User.findOne(_user)
        if(user) return user;
        else return false;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}

module.exports.insert = insertUser;
module.exports.sign = signUser;
