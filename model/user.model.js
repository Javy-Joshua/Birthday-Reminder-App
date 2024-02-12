const mongoose = require('mongoose')
const uuid = require('uuid')
const { DATE } = require('sequelize')


const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4(),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


const UserModel = mongoose.model('users', UserSchema)

module.exports =  UserModel

