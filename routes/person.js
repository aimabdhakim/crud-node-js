//kelas ini inti dari semua js, semua dilakukan di modul ini

module.exports = {
    addPersonPage: (req, res) => {
        res.render('add-person.ejs', {
            title: 'Add person'
            ,message: ''
        });
    },
    addPerson: (req, res) => {
        let message = '';
        let fname = req.body.first_name;
        let lname = req.body.last_name;
        let address = req.body.address;
        let email = req.body.email;
        let contact = req.body.contact;

        let usernameQuery = "SELECT * FROM person WHERE fname = '" + fname + "' OR lname = '" + lname + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-person.ejs', {
                    message,
                    title: 'Add person'
                });
            } else {
                // send the person's details to the database
                let query = "INSERT INTO `person` (fname, lname, address, email, contact) VALUES ('" +
                    fname + "', '" + lname + "', '" + address + "', '" + email + "', '" + contact + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    },
    editPersonPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `person` WHERE id = '" + id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-person.ejs', {
                title: 'Edit Person'
                ,person: result[0]
                ,message: ''
            });
        });
    },
    editPerson: (req, res) => {
        let id = req.params.id;
        let fname = req.body.first_name;
        let lname = req.body.last_name;
        let address = req.body.address;
        let email = req.body.email;
        let contact = req.body.contact;

        //console.log(fname + " " + lname + " " + address + " "  + email + " " + contact);
        console.log(req.body);

        let query = "UPDATE `person` SET `fname` = '" + fname + "', `lname` = '" + lname + "', `address` = '" + address + "', `email` = '" + email + "', `contact` = '" + contact + "' WHERE `person`.`id` = '" + id + "'";
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePerson: (req, res) => {
        let id = req.params.id;
        let deleteUserQuery = 'DELETE FROM person WHERE id = "' + id + '"';
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
