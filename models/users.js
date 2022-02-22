const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        userId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verified: { type: Boolean, required: false },
    },
    { timestamps: true }
);

userSchema.statics.findByCredentials = async (userId, password) => {
    const user = await Users.findOne({ userId, verified:true });
    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

// Hash the password before saving
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const Users = mongoose.model("Users", userSchema);

Users.createIndexes();

module.exports = Users;
