const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Trip } = require("../models/index");

const createTrip = async (req, res) => {
    try {
        const decodedToken = req.user;
        const { name, description, startDate, endDate } = req.body;

        const user = await User.findByPk(decodedToken.id);
        if (!user) {
            return res.status(400).json({ status: "fail", message: "User does not exist" });
        }
        const trip = await Trip.create({
            title: name, 
            description,
            startDate,
            endDate,
            adminId: user.id
        });

         

        res.status(200).json({
            status: "success",
            message: "Trip created successfully",
            trip,
        
        })

    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            status: "error",
            message: error.message | error,
        });
    }
}


const getTripsById = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findByPk(id);
        if (!trip) {
            return res.status(400).json({ status: "fail", message: "Trip does not exist" });
        }
        res.status(200).json({
            status: "success",
            message: "Trip fetched successfully",
            trip,
        })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            status: "error",
            message: error.message | error,
        });
    }
}

const getAllTripsByUserId = async (req, res) => {
    try {
        const decodedToken = req.user;
        const user = await User.findByPk(decodedToken.id);

        const trips = await Trip.findAll({
            where: {
                adminId: user.id
            }
        });
        console.log("trips: ", trips);

        res.status(200).json({
            status: "success",
            message: "Trips fetched successfully",
            trips,
        })
    } catch (error) {
        console.log("error: ", error);

        res.json({
            status: "error",
            message: error.message | error,
        })
    }
}

module.exports = {
    createTrip,
    getTripsById,
    getAllTripsByUserId
}