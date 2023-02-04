let userDB = require("../model/model")

// Create a user to Database

exports.create = (req, res) => {
    if (!req.body)
    {
        res.status(400).send({message: "The request should'nt be empty"});
        return;
    }
    console.log("Body : ", req.body);
    const user = new userDB({
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        contactAddress: req.body.contactAddress,
    });

    user.save(user).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message || "Error when creating user."})
    })
}

// Get a single or all users from Database

exports.find = (req, res) => {
    
    if (req.query.id)
    {
        const id = req.query.id;
        userDB.findById(id).then((data) => {
            if (!data)
            {
                res.status(404).send({message: `${id} not found in the database`})
            }
            else
                res.send(data);
        }).catch((err) => {
            res.status(500).send({message: err.message || "Error in getting the user"});
        })
    }
    else {
        userDB.find().then((user) => {
            res.send(user);
        }).catch((err) => {
            res.status(500).send({message: err.message || "Error while getting users"})
        })
    }
}

// Update user from Database

exports.update = (req, res) => {

    console.log("ID : ", req.body)

    if(!req.body)
    {
        return res.status(400).send({message: "Error in updating the user"})
    }

    const id = req.params.id;
    console.log("ID : ", id)

    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then((data) => {
        if (!data)
        {
            res.status(400).send({message: `Error cannot update the user ${id} ( user not found ...)`})
        }
        else
            res.send(`The user with ID : ${id} updated succesfully`);
    }).catch((err) => {
        res.status(500).send({message: err.message || "Error while updating user"})
    })
}

// Delete user from Database

exports.delete = (req, res) => {
    const id = req.params.id;

    userDB.findByIdAndDelete(id).then((data) => {
        if (!data)
        {
            res.status(400).send({message: `Error cannot delete the user ${id} ( user not found ...)`})
        }
        else
            res.send(`The user with ID : ${id} deleted succesfully`);
    }).catch((err) => {
        res.status(500).send({message: err.message || `Error while deleting the user ${id}`});
    })
}