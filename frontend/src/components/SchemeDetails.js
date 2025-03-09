import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

const SchemeDetails = () => {
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);

    useEffect(() => {
        const fetchSchemeDetails = async () => {
            try {
                const { data } = await API.get(`/schemes/${id}`);
                setScheme(data);
            } catch (error) {
                console.error('Error fetching scheme details:', error);
            }
        };
        fetchSchemeDetails();
    }, [id]);

    if (!scheme) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-primary">{scheme.schemeName}</h2>
                    <p className="card-text">{scheme.description}</p>
                    <h4>Eligibility</h4>
                    <ul>
                        <li><strong>Age Group:</strong> {scheme.eligibility.ageGroup}</li>
                        <li><strong>Gender:</strong> {scheme.eligibility.gender}</li>
                        <li><strong>Category:</strong> {scheme.category}</li>
                        <li><strong>Location:</strong> {scheme.eligibility.location}</li>
                        <li><strong>Occupation:</strong> {scheme.eligibility.occupation}</li>
                        <li><strong>Income Slab:</strong> {scheme.eligibility.incomeSlab}</li>
                    </ul>
                    <h4>Benefits</h4>
                    <p>{scheme.benefits}</p>
                </div>
            </div>
        </div>
    );
};

export default SchemeDetails;
