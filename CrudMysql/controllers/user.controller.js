const db = require("../config/db");
const query = require("util").promisify(db.query).bind(db);

module.exports = {
    showCreateForm: async (req, res, next) => {
        res.render("create")
    },
    createUser: async (req, res) => {
        const { prenom, nom, email } = req.body;
    const insertQuery = "INSERT INTO `students` (`prenom`,`nom`,`email`,`image`) VALUES (?,?,?,?)";
    const isEmailUniqueQuery = "SELECT * FROM `students` WHERE `email`=? LIMIT 1";
       image = `/images/${req.file.filename}`;
    const isEmailUniqueResult = await query(isEmailUniqueQuery, [email]);
    if (isEmailUniqueResult.length == 0) {
        const insertResult = await query(insertQuery, [prenom, nom, email,image]);
        db.query('SELECT * FROM students', function (err, result, fields) {
            console.log(result);
            res.status(200).render("listusers",{result});
        });  
    }
    else{
        res.status(405).json({ error: "Email already created" })
    }
    },
    getListUsers: async (req, res) => {
        db.query('SELECT * FROM students', function (err, result, fields) {
            res.status(200).render("listusers",{result});
        });
    },
    getUserById: async (req, res) => {
        db.query('SELECT * FROM students where id=?', [req.params.id], function (err, result, fields) {
            const user =result[0];
            res.render("detailuser",{user});
        });
    },
    deleteUser: async (req, res) => {
        db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, rows, fields) => { 
             
        })
        db.query('SELECT * FROM students', function (err, result, fields) {
            console.log(result);
            res.status(200).render("listusers",{result});
        });
    },
    showEditForm: async (req, res, next) => {
        db.query('SELECT * FROM students where id=?', [req.params.id], function (err, result, fields) {
            const user =result[0];
            res.render("edituser",{user});
        });
    },
    editUser: async (req, res) => {
        const { prenom, nom, email } = req.body;
        var iduser = req.body.id;
        console.log(req.body)
        const updateQuery = "UPDATE students SET prenom = ?,nom = ?,email = ?,image = ? WHERE id = ?";
           image = `/images/${req.file.filename}`;
        
            const updateResult = await query(updateQuery, [prenom, nom, email,image,iduser]);
            db.query('SELECT * FROM students', function (err, result, fields) {
                res.status(200).render("listusers",{result});
            }); 

    },
        
}