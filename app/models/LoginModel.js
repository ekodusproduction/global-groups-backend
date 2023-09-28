const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const { closeConnection, dbConn } = require("../utils/database/SqlConnection");

/**
 * Date: 18-08-2023
 * Author: Dinesh
 * Description: Admin Login
 */
const hashPassword = async (req, value) => {
    let salt = await Bcrypt.compare(req, value);
    return salt;
};

const adminLogin = (request) => {
   
    return new Promise((resolve, reject) => {
        let{ emailId, password }= request.body;
        try {
            const sqlQuery = `CALL procUserEmailExistCheck(?)`;

            dbConn.getConnection((err, connection) => {
                if (err) {
                    console.log("Database Connection Failed !!!", err);
                } else {

                    connection.query(sqlQuery, [emailId], async (err, result) => {
                        closeConnection(connection);
                        if (result[0][0].emailCount === 0) {
                            let obj = { emailExist: false, validPassword: false}

                            resolve(obj)
                            
                        } else  if (result[0][0].emailCount === 1) {
                            console.log("Result", result)
                                let emailExist = result[1][0];
                                console.log("emailExist", result[1][0])
                                let dbPassword = emailExist.password;
                                let mailId = emailExist.email;
                                const validPassword = await hashPassword(
                                    password,
                                    dbPassword
                                );
                                if (validPassword == false) {
                                    let obj = { emailExist: true, validPassword: false}
                                    return resolve(obj);
                                }

                                const token = Jwt.sign(
                                    {
                                        userId: emailExist.userID,
                                        emailId: emailExist.Email,
                                    },
                                    process.env.JWT_TOKEN_SECRET_KEY,
                                    {
                                        expiresIn: "1hr",
                                    }
                                );
                                result.token = token;
                                let adminData = {
                                    emailExist: true,
                                     validPassword: true,
                                    email: mailId,
                                    token: `${token}`,
                                   
                                };

                                return resolve(adminData);
                            }
                        
                    });
                }
            });
        } catch (err) {
            return reject(err);
        }
    });
};


const encryptingPassword = async (data) => {
    let salt = await Bcrypt.genSalt(10);
    let bcryptPassword = await Bcrypt.hash(data, salt);
    return bcryptPassword;
  };
const createUser = async (request) => {
    let {emailId, password} = request.body;
    password = await encryptingPassword(password)
    console.log("data", emailId, password)

    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procEmailCheckuser(?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(SqlQuery, [emailId], (err, result) => {
            closeConnection(connection);
            if (err) {
              reject(err);
            } else if (result[0][0].count > 0) {
              let result = 1;
              resolve(result);
            } else {
              const subSqlQuery = `CALL procCreateuser(?, ?)`;
              dbConn.getConnection((err, conn) => {
                if (err) {
                  console.log("Database not connected !!", err);
                } else {
                  conn.query(
                    subSqlQuery,
                    [
                        emailId,
                     password 
                    ],
                    (err, result) => {
                      closeConnection(conn);
                      if (err) {
                        reject(err);
                      } else {
                        let result = 2;
                        resolve(result);
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    });
  };

module.exports = {
    adminLogin,
    createUser
};
