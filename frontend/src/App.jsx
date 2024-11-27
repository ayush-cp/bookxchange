import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import BookSearch from "./components/BookSearch/BookSearch";
import ProfilePage from "./components/ProfilePage/ProfilePage";
// import ResponsiveProfilePage from "./components/ProfilePage/responsive-profile-page";
// import ProfilePage from "./components/ProfilePage/ProfilePage

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Define route for Home */}
                    <Route path="/" element={<Home />} />

                    {/* Define route for Signup */}
                    <Route path="/signup" element={<Signup />} />

                    {/* Define route for BookSearch */}
                    <Route path="/booksearch" element={<BookSearch />} />

                    {/* Define route for Profile Page */}
                    <Route path="/profile" element={<ProfilePage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
