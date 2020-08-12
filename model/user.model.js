const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const toJSON = require('./toJSON.plugin');

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        home:[
            {
                homeId: mongoose.Types.ObjectId,
                homeIp:"",
                location:{
                    type: {
                    type: String,
                    enum: ['Point'],
                    required: true
                  },
                  coordinates: {
                    type: [Number],
                    required: true
                  }
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(toJSON);

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
