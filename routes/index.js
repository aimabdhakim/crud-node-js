module.exports = {
    getHomePage: (req, res) => {
        //CREATE DATABASE if not EXISTS
        db.query("CREATE DATABASE IF NOT EXISTS mydatabase", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        //CREATE TABLE
        var sql = "CREATE TABLE IF NOT EXISTS person (id int NOT NULL AUTO_INCREMENT, fname VARCHAR(255), lname VARCHAR(255), address VARCHAR(255), email VARCHAR(50), contact VARCHAR(13), PRIMARY KEY(id))";
        db.query(sql, function (err, result) {
            if (err) {
                console.log("Oops... Something went wrong");
            } else {        
                console.log("Table created");
            }
        });   

        //ambil semua data dari database
        let query = "SELECT * FROM `person`";
        // jalankan query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/'); ///kalo error, redirect ke awal page
            }  else if (result.length == 0){
                db.query(sql, [values], function (err, result) {
                if (err) {
                        console.log("Oops... Something went wrong");
                    } else {        
                        console.log("Number of records inserted: " + result.affectedRows);
                    }    
                });
                
                //ADD DATA
                var sql = "INSERT INTO person (fname, lname, address, email, contact) VALUES ?";
                var values = [
                    ['Abdul', 'Hakim', 'Serang', 'aim@aim.com', '0888888888'],
                    ['Hadi', 'Syah Putra', 'Balikpapan', 'hadi@hadi.com', '0878888888'],
                    ['John', 'Dasa', 'Rangkasbitung', 'johndasa@gmail.com', '0877888888'],
                    ['John', 'Doe', 'Somewhere', 'john@doe.com', '0888887788'],
                    ['Fox', 'Says', 'UK', 'fox@says.com', '0877771882']
                ];
            }
            else
            res.render('index.ejs', { //render page baru
                person: result
            });
        });
    },
};

