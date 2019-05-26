// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());


// GET

server.get("/", (req, res) => {
    res.send("HELLO WORLD!")
})

server.get("/api/users", (req, res) =>{
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved.", err})
    })
})

// GET BY ID


server.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id).then(users => {
        if(users) {
            res.status(200).json({
                users
            })
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: "The user information could not be retrieved."
        })
    })
})


// POST


server.post("/api/users", (req, res) => {
    const hubinfo = req.body;
    const { name, bio } = req.body;

    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    db.insert(hubinfo).then(hub => {
        res.status(201).json({ hub})
    }).catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})




// PUT

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body

    db.update(id, changes).then(updated => {
        if (updated) {
            res.status(200).json({ updated })
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: "The user information could not be modified."
        })
    })
})

// DELETE

server.delete("/api/users/:id", (req, res) => {
    const {id} = req.params; ///destructuring ID
    db.remove(id).then(deleted => {
        if(deleted) {
            res.status(204).end();

        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    }).catch(error => {
        res.status(500).json({
            error: "The user could not be removed"
        })
    })
})



server.listen(4000, () => {
    console.log(`\n --- Server Running on http://localhost:4000 --- \n`)
})