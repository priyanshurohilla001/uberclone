const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getAddressCoordinates = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const coordinates = await mapService.getAddressCoordinates(req.query.address);

        if (!coordinates) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

module.exports.getDistTime = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const origin = await mapService.getAddressCoordinates(req.query.origin);
        const destination = await mapService.getAddressCoordinates(req.query.destination);

        const distTime = await mapService.getDistTime(origin, destination);

        if (!distTime) {
            return res.status(404).json({ message: 'Error fetching data' });
        }

        res.status(200).json(distTime);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

module.exports.getSuggestions = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const suggestions = await mapService.getSuggestions(req.query.input  , req.body.location);

        if (!suggestions) {
            return res.status(404).json({ message: 'Error fetching data' });
        }

        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}