const express = require('express');
const path = require('path');
const router = express.Router();

const User = require('../model/User');

router.get('/', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, '../../build', 'index.html'))
})

router.post('/add', ( req, res ) => {
    const { player, token } = req.body

    User.create({
        player: player,
        token: token,
        score: 0
    },(error, users) => {
        if (users)
            res.status(200).send({users})
    })
})

router.post('/update', ( req, res ) => {
    const { id, score } = req.body

    User.findByIdAndUpdate(id, {
        score: score
    }, { new: true }, (error, users) => {
        if (users)
            res.status(200)
    })
})

router.get('/history', ( req, res ) => {
    User.find({})
    .sort({ score: 'desc'})
    .exec((error, history) => {
        if (history)
            res.status(200).send({history})
    })
})

module.exports = router;