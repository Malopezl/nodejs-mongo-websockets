const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    /* This is used to filter messages if needed */
    const filterMessages = req.query.user || null;

    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 201);
        }).catch((err) => {
            response.error(req, res, 'Unexpected error', 500, err);
        });
});
router.post('/', (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        }).catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador');
        });
});
router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch((err) => {
            response.error(req, res, 'Error interno', 500, err);
        });
})

module.exports = router;