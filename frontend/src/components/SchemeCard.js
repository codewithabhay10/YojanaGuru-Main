import React from 'react';
import { Link } from 'react-router-dom';

const SchemeCard = ({ scheme }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title text-primary">{scheme.schemeName}</h5>
                    <p className="card-text text-muted">{scheme.description}</p>
                    <Link to={`/schemes/${scheme.schemeId}`} className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SchemeCard;


