var db=require('../config/connection')
var collection=require('../config/collection')
var ObjectId=require('mongodb').ObjectId
const bcrypt=require('bcrypt');

module.exports = {

  
    getAllUserDetails: () => {
      return new Promise(async (resolve, reject) => {
        var reuslts = await db
          .get()
          .collection(collection.USER_COLLECTIONS)
          .find()
          .toArray();
        resolve(reuslts);
      });
    },

    doSignup: (userData) => {
      return new Promise(async (resolve, reject) => {
        let signupStatus = false;
        let newUser = await db
          .get()
          .collection(collection.USER_COLLECTIONS)
          .findOne({ email: userData.email });
        if (!newUser) {
          signupStatus = true;
          userData.password = await bcrypt.hash(userData.password, 10);
          db.get()
            .collection(collection.USER_COLLECTIONS)
            .insertOne(userData)
            .then((data) => {
              resolve({ signupStatus });
            })
            .catch(() => {
              console.log("Error signup");
            });
        } else {
          console.log("user already exist");
          resolve({ signupStatus: false });
        }
      });
    },

    doLogin: (userData) => {
      return new Promise(async (resolve, reject) => {
        let loginStatus = false;
        let response = {};
        console.log(userData);
        let user = await db
          .get()
          .collection(collection.USER_COLLECTIONS)
          .findOne({ email: userData.email });
        console.log(user);
        if (user) {
          bcrypt
            .compare(userData.password, user.password)
            .then((status) => {
              if (status) {
                console.log("true");
                response.user = user;
                response.status = true;
                resolve(response);
              } else {
                console.log("false");
                resolve({ status: false });
              }
            })
            .catch(() => {
              console.log("error");
            });
        } else {
          console.log("User not found");
          resolve({ status: false });
        }
      });
    },
  
    deleteUsers: (userId) => {
      return new Promise((resolve, reject) => {
        console.log(ObjectId(userId));
        db.get()
          .collection(collection.USER_COLLECTIONS)
          .deleteOne({ _id: ObjectId(userId) })
          .then((response) => {
            resolve(response);
          });
      });
    },

    getUserDetails: (userId) => {
      return new Promise((resolve, reject) => {
        db.get()
          .collection(collection.USER_COLLECTIONS)
          .findOne({ _id: ObjectId(userId) })
          .then((user) => {
            resolve(user);
          });
      });
    },

    updateUser: (userId, userDetails) => {
      return new Promise((resolve, reject) => {
        console.log("last");
        console.log(userDetails);
        console.log("end");
        db.get()
          .collection(collection.USER_COLLECTIONS)
          .updateOne(
            { _id: ObjectId(userId) },
            {
              $set: {
                email: userDetails.email,
                username: userDetails.username,
                phone: userDetails.phone,
              },
            }
          ).then((response) => {
              console.log("edit user got");
              resolve();
            });
      })
    },
    
    addUser: (userData) => {
      return new Promise(async (resolve, reject) => {
        let signupStatus = false;
        let newUser = await db
          .get()
          .collection(collection.USER_COLLECTIONS)
          .findOne({ email: userData.email });
        if (!newUser) {
          signupStatus = true;
          userData.password = await bcrypt.hash(userData.password, 10);
          db.get()
            .collection(collection.USER_COLLECTIONS)
            .insertOne(userData)
            .then((data) => {
              resolve({ signupStatus });
            })
            .catch(() => {
              console.log("Error");
            });
        } else {
          console.log("user already exist");
          resolve({ signupStatus: false });
        }
      });
    },
  };
  