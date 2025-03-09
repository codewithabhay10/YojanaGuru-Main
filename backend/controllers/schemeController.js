const fetchSchemes = require('../utils/fetchSchemes');
const CachedScheme = require('../models/CachedScheme');

// Fetch all schemes (from cache or API)
const getSchemes = async (req, res) => {
    try {
        let schemes = await CachedScheme.find();
        if (schemes.length === 0) {
            const fetchedSchemes = await fetchSchemes();
            schemes = await CachedScheme.insertMany(fetchedSchemes);
        }
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching schemes' });
    }
};

// Recommend schemes based on user data
/*
const recommendSchemes = async (req, res) => {
    const { age, income, location, occupation, gender } = req.body; // Include gender from the request body

    try {
        const schemes = await fetchSchemes(); // Read directly from JSON
        console.log("All Schemes:", schemes); // Debugging

        const recommendedSchemes = schemes.filter(scheme => {
            const schemeAgeRange = scheme.eligibility.ageGroup.split('-');
            const minAge = parseInt(schemeAgeRange[0]);
            const maxAge = parseInt(schemeAgeRange[1]);
            const userAge = parseInt(age);

            return (
                userAge >= minAge &&
                userAge <= maxAge &&
                scheme.eligibility.incomeSlab.toLowerCase() === income.toLowerCase() &&
                scheme.eligibility.location.toLowerCase() === location.toLowerCase() &&
                scheme.eligibility.occupation.toLowerCase() === occupation.toLowerCase() &&
                (scheme.eligibility.gender.toLowerCase() === gender.toLowerCase() || scheme.eligibility.gender.toLowerCase() === "any") // Check gender
            );
        });

        console.log("Recommended Schemes:", recommendedSchemes); // Debugging
        res.json(recommendedSchemes);
    } catch (error) {
        console.error("Error recommending schemes:", error);
        res.status(500).json({ error: 'Error recommending schemes' });
    }
};*/
const recommendSchemes = async (req, res) => {
    const { age, income, location, occupation, gender } = req.body;

    try {
        const schemes = await fetchSchemes(); // Fetch all schemes from JSON or database

        // Filter schemes dynamically based on provided fields
        const filteredSchemes = schemes.filter((scheme) => {
            const schemeAgeRange = scheme.eligibility.ageGroup.split('-');
            const minAge = parseInt(schemeAgeRange[0]);
            const maxAge = parseInt(schemeAgeRange[1]);
            const userAge = parseInt(age);

            return (
                // Check gender only if provided
                (!gender || gender === "Any" || scheme.eligibility.gender.toLowerCase() === gender.toLowerCase()) &&
                // Check age only if provided
                (!age || (userAge >= minAge && userAge <= maxAge)) &&
                // Check income only if provided
                (!income || scheme.eligibility.incomeSlab.toLowerCase() === income.toLowerCase()) &&
                // Check location only if provided
                (!location || scheme.eligibility.location.toLowerCase() === location.toLowerCase()) &&
                // Check occupation only if provided
                (!occupation || scheme.eligibility.occupation.toLowerCase() === occupation.toLowerCase())
            );
        });

        res.json(filteredSchemes);
    } catch (error) {
        console.error("Error recommending schemes:", error);
        res.status(500).json({ error: 'Error recommending schemes' });
    }
};


// Get a single scheme by ID
const getSingleScheme = async (req, res) => {
    const { id } = req.params; // Extract the scheme ID from the URL

    try {
        const schemes = await fetchSchemes(); // Read directly from the JSON file
        const scheme = schemes.find(scheme => scheme.schemeId === id); // Find the scheme with the matching ID

        if (!scheme) {
            return res.status(404).json({ error: 'Scheme not found' });
        }

        res.json(scheme); // Return the found scheme
    } catch (error) {
        console.error("Error fetching single scheme:", error);
        res.status(500).json({ error: 'Error fetching single scheme' });
    }
};

module.exports = { getSchemes, recommendSchemes, getSingleScheme };
