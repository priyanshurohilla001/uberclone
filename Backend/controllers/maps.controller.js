import { getAddressCoordinates , getDistTime , getSuggestions } from '../services/maps.service.js';
import { validationResult } from 'express-validator';

export async function getAddressCoordinatesController(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const coordinates = await getAddressCoordinates(req.query.address);

        if (!coordinates) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export async function getDistTimeController(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const origin = await getAddressCoordinates(req.query.origin);
        const destination = await getAddressCoordinates(req.query.destination);

        const distTime = await getDistTime(origin, destination);

        if (!distTime) {
            return res.status(404).json({ message: 'Error fetching data' });
        }

        res.status(200).json(distTime);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export async function getSuggestionsController(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const suggestions = await getSuggestions(req.query.input  , req.body.location);

        if (!suggestions) {
            return res.status(404).json({ message: 'Error fetching data' });
        }

        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}