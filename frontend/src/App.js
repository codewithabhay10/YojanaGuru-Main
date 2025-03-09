import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./components/SchemeDetails";
import Auth from "./pages/Auth";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/schemes/:id" element={<SchemeDetails />} />
                    <Route path="/signin" element={<Auth isSignUp={false} />} />
                    <Route path="/signup" element={<Auth isSignUp={true} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
