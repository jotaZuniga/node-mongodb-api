
const routes = require('./routes');

module.exports = app => {
    const notes = require('../controllers/note.controller');

    app.post(routes.notesPost, notes.create);

    app.get(routes.notesGet, notes.findAll);

    app.get(routes.singleNote, notes.findOne);

    app.put(routes.singleNoteUpdate, notes.update);

    app.delete(routes.singleNoteDelete, notes.delete);    

};