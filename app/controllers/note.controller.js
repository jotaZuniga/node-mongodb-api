const Note = require('../models/noteModel');

// create and save a new note
exports.create = (req, res) => {
    const requestBody = req.body;

    // validate the req
    if (!requestBody.content) {
        return res.status(400).send({
            message: "Note content is required",
        });
    }

    const entryNote = new Note({
        title: requestBody.title || "Empty Note",
        content: requestBody.content,
    });

    entryNote.save()
    .then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while creating new Note",
        });
    });
};

// retrieve and return all notes
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving all notes."
        });
    });
};

// find a single note
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if (!note) {
            return req.status(404).send({
                message: `Note not found ID: ${req.params.noteId}`,
            });
        }

        res.send(note);

    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Note not found with ID ${req.params.noteId}`,
            });
        }

        return res.status(500).send({
            message: `Error retrieving note ID ${req.params.noteId}`,
        });
    });
};

// update a note identified by ID
exports.update = (req, res) => {
    const requestBody = req.body;

    if (!requestBody.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: requestBody.title || "Updated without title",
        content: requestBody.content,
    }, {
        new: true, // send the new Note modified instead of the original
    })
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `Note not found with id ${req.params.noteId}`,
            });
        }
        res.send(note);        
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Note not found with id ${req.params.noteId}`,
            });                
        }
        return res.status(500).send({
            message: `Error updating note with id ${req.params.noteId}`,
        });
    });
};

// delete a note by ID
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `Note not found ID: ${req.params.noteId}`,
            });
        }
        Note.send({
            message: "Note deleted succcessfully!",
        });
    }).catch(error => {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: `Note not found ID: ${req.params.noteId}`,
            });                
        }
        return res.status(500).send({
            message: `Could not delete note with id ${req.params.noteId}`,
        });        
    });
};