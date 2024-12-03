const express = require('express');

const jwt = require('jsonwebtoken');

const jwtAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({status: 'fail', message: 'Unauthorized'})
    }
}


module.exports = {
    jwtAuth
}