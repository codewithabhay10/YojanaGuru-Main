import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = [
        { name: "Agriculture, Rural & Environment", count: 417, icon: "🌱" },
        { name: "Banking, Financial Services & Insurance", count: 214, icon: "🏦" },
        { name: "Business & Entrepreneurship", count: 445, icon: "🤝" },
        { name: "Education & Learning", count: 768, icon: "🎓" },
        { name: "Health & Wellness", count: 214, icon: "❤️" },
        { name: "Housing & Shelter", count: 93, icon: "🏠" },
        { name: "Public Safety, Law & Justice", count: 10, icon: "⚖️" },
        { name: "Science, IT & Communications", count: 61, icon: "🔬" },
        { name: "Skills & Employment", count: 251, icon: "💼" },
        { name: "Social Welfare & Empowerment", count: 1235, icon: "✊" }
    ];

    return (
        <div className="HomeBack container mt-5">
            <h1 className="homepage-heading text-center">Welcome to YojanaGuru</h1>
            <p className="homepage-description text-center">
                Your one-stop solution for government schemes. Explore schemes based on categories below.
            </p>
            <div className='imgHome'><img alt= 'err' src='https://www.myscheme.gov.in/_next/image?url=https%3A%2F%2Fcdn.myscheme.in%2Fimages%2Fslideshow%2F1-full.webp&w=1920&q=75' className='homeBack img-fluid'></img></div>
            <p className='text-center'>#AIFINDSCHEMES / #GOVSCHEMESASSIST</p>

            <div className="row justify-content-center">
                {categories.map((category, index) => (
                    <div key={index} className="col-md-3 col-sm-4 col-6 text-center mb-4">

                        <Link to="/schemes" className="category-link">
                            <div className="category-icon">{category.icon}</div>
                            <p className="category-count">{category.count} Schemes</p>
                            <p className="category-name">{category.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
