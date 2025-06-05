   const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');

   const userSchema = new mongoose.Schema({
     username: { 
       type: String, 
       required: true, 
       unique: true,
       trim: true,
       minlength: 3,
       maxlength: 30
     },
     email: { 
       type: String, 
       required: true, 
       unique: true,
       lowercase: true,
       trim: true
     },
     password: { 
       type: String, 
       required: true,
       minlength: 6
     },
     isVerified: { 
       type: Boolean, 
       default: false 
     },
     verificationToken: { 
       type: String 
     }
   }, { 
     timestamps: true
   });

   // パスワードをハッシュ化
   userSchema.pre('save', async function(next) {
     if (!this.isModified('password')) return next();
     
     try {
       const saltRounds = 12;
       this.password = await bcrypt.hash(this.password, saltRounds);
       next();
     } catch (error) {
       next(error);
     }
   });

   // パスワード比較メソッド
   userSchema.methods.comparePassword = async function(candidatePassword) {
     return bcrypt.compare(candidatePassword, this.password);
   };

   module.exports = mongoose.model('User', userSchema);