const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, `Un prénom est requis`],
    },
    lastName: {
      type: String,
      required: [true, `Un nom est requis`],
    },
    username: {
      type: String,
      required: [true, `Un nom d'utilisateur est requis`],
      index: { unique: true },
    },
    password: {
      type: String,
      required: [true, `Un mot de passe est requis`],
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'super-admin'],
      default: 'user',
    },
    permission: {
      type: String,
      enum: ['read-only', 'edit'],
      default: 'edit',
    },
    markers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'markers',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.statics.login = async function ({ username, password }) {
  const user = await this.findOne(
    { username },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      delete user._doc.password;
      return user;
    }
  }
  throw Error('unknow user');
};

const User = mongoose.model('users', userSchema);

module.exports = User;
