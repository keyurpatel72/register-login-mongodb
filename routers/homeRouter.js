const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema');

Router.get('/', (err, res) => {
    res.render('register', {
        title: 'Fill Form',
        password: '',
        email: ''
    })
})

Router.post('/register', async (req, res) => {
    try {
        const {
            name,
            number,
            email,
            password,
            cpassword
        } = req.body;

        if (password === cpassword) {

            const userData = new homeSchema({
                name,
                number,
                email,
                password
            })
            userData.save(err => {
                if (err) {
                    console.log("err")
                } else {
                    res.render('register', {
                        title: 'Done',
                        password: '',
                        email: ''
                    })
                }
            })

            const useremail = await homeSchema.findOne({
                email: email
            });
            if (email === useremail.email) {
                res.render('register', {
                    title: '',
                    password: '',
                    email: 'Email is Already there plz chose different one'
                })
            } else {
                console.log('err')
            }

        } else {
            res.render('register', {
                title: '',
                password: 'Password not Matching',
                email: ''
            })
        }
    } catch (error) {

        res.render('register', {
            title: 'Error in Code',
            password: '',
            email: ''
        })
    }
})

// singin 

Router.post('/login', (req, res) => {

    const {
        email,
        password
    } = req.body;

    homeSchema.findOne({
        email: email
    }, (err, result) => {

        if (email === result.email && password === result.password) {
            res.render('dashbord', {
                name: result.name
            })
        } else {
            console.log(err)

        }
    })
})



module.exports = Router;
// const express = require('express');
// const homeSchema = require('../models/homeSchema');
// const Router = express.Router();

// Router.get('/', (err, res) => {
//     res.render('register', {
//         title: 'file form',
//         password: " ",
//         email: " "
//     })
// })

// Router.post('/register', async (req, res) => {
//     try {
//         const {
//             name,
//             number,
//             email,
//             password,
//             cpassword
//         } = req.body;
//         //or useing four line code

//         // const name = req.body.name;
//         // const email =req.body.email;
//         // const password = req.body.password;

//         if (password === cpassword) {
//             const userData = new homeSchema({
//                 name,
//                 number,
//                 email,
//                 password
//             })
//             userData.save(err => {
//                 if (err) {
//                     console.log('err');
//                 } else {
//                     res.render('register', {
//                         title: 'done',
//                         password: " ",
//                         email: " "
//                     })
//                 }
//             })
//             const useremail = await homeSchema.findOneAndDelete({
//                 email: email
//             });
//             console.log(email === useremail.email) {
//                 res.render('register', {
//                     title: '',
//                     password: " ",
//                     email: "email is already there "
//                 })
//             }

//         } else {
//             res.render('register', {
//                 title: '',
//                 password: "password willl be not match ",
//                 email: " "
//             })
//         }


//     } catch (error) {

//         res.render('register', {
//             title: 'error in this code',
//             password: "",
//             email: ''
//         })
//     }
// })

// //signin form api

// Router.post('/login', (req, res) => {

//     const {
//         email,
//         password
//     } = req.body;

//     homeSchema.findOne({
//             email: email
//         }, (err, result) => {

//         }
//         //match
//         if (emaill === result.email && password === result.password) {
//             res.render('dashbord', {
//                 name: result.name
//             })
//         } else {
//             console.log(err)
//         }
//     })

// })

// module.exports = Router;