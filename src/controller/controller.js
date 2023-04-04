const Todo = require("../model/schema");
const HTTP = require("../../constant/response.constant");

var path = require("path");
var bcrypt = require("bcryptjs");
const fs = require("fs");

var session;

class class1 {
  static a = async (req, res) => {
    try {
      res.render("First");
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static b = async (req, res) => {
    try {
      if (req.body.PhoneNumber) {
        if (!req.body.UserName) {
          var a = await Todo.find({ PhoneNumber: req.body.PhoneNumber });
          if (a.length == 0) {
            for (var i = 0; i < req.files.length; i++) {
              fs.unlinkSync(
                path.join(__dirname, `../../public/${req.files[i].filename}`)
              );
            }
            return res.status(HTTP.SUCCESS).send({
              errors: [
                {
                  message: "Insufficient Data",
                  code: HTTP.INTERNAL_SERVER_ERROR,
                },
              ],
            });
          } else {
            req.body.UserName = a[0].UserName;
          }
        }
        if (req.files.length > 1) {
          for (var i = 0; i < req.files.length; i++) {
            fs.unlinkSync(
              path.join(__dirname, `../../public/${req.files[i].filename}`)
            );
          }
          return res.status(HTTP.SUCCESS).send({
            errors: [
              {
                message: "Please Choose One Image",
                code: HTTP.INTERNAL_SERVER_ERROR,
              },
            ],
          });
        } else {
          for (var i = 0; i < req.files.length; i++) {
            function getFileExtension(filename) {
              const extension = filename.split(".").pop();
              return extension;
            }
            const Extension = await getFileExtension(req.files[i].originalname);
            var Changefilename =
              (await req.files[0].filename) + "." + Extension;
            fs.rename(
              path.join(__dirname, `../../public/${req.files[i].filename}`),
              path.join(__dirname, `../../public/${Changefilename}`),
              () => {}
            );
          }
        }
        var a = await Todo.find({ PhoneNumber: req.body.PhoneNumber });
        if (a.length == 0) {
          await new Todo({
            UserName: req.body.UserName,
            PhoneNumber: req.body.PhoneNumber,
            Profile: Changefilename,
            Transaction: [],
            Coin: 0,
          }).save();
          res.send("Account Create sucessfully");
        } else {
          var updateuser = await Todo.findOneAndUpdate(
            { PhoneNumber: req.body.PhoneNumber },
            { $set: { UserName: req.body.UserName } }
          );
          await updateuser.save();
          if (req.files.length == 1) {
            if (a[0].Profile) {
              fs.unlinkSync(
                path.join(__dirname, `../../public/${a[0].Profile}`)
              );
            }
            var updateuser2 = await Todo.findOneAndUpdate(
              { PhoneNumber: req.body.PhoneNumber },
              { $set: { Profile: Changefilename } }
            );
            await updateuser2.save();
          }
          res.send("Account Create sucessfully");
        }
      } else {
        if (req.files) {
          for (var i = 0; i < req.files.length; i++) {
            fs.unlinkSync(
              path.join(__dirname, `../../public/${req.files[i].filename}`)
            );
          }
        }
        return res.status(HTTP.SUCCESS).send({
          errors: [
            {
              message: "Insufficient Data",
              code: HTTP.INTERNAL_SERVER_ERROR,
            },
          ],
        });
      }
    } catch (err) {
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
}

module.exports = { class1 };
