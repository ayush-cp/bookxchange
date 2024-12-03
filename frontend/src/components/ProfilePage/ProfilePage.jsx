import React, { useState, useEffect } from 'react';
import { User, Book, LogOut, Edit, Plus, Trash2, Save } from 'lucide-react';
import Navbar from '../Layout/Navbar';
import axios from 'axios';

const ProfilePage = () => {
  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  


  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
    if(!user){
        window.location.href = '/bookexchangelogin';
    }

    
  
    const [bio, setBio] = useState(user.bio);
    const [username, setUsername] = useState(user.name);

  
  // Profile State
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    profileImage: null
  });

  // Temporary profile state for editing
  const [editedProfile, setEditedProfile] = useState({...profile});

  // Books State
  const [books, setBooks] = useState([
    // { 
    //   id: 1, 
    //   title: 'To Kill a Mockingbird', 
    //   author: 'Harper Lee', 
    //   genre: 'Classic',
    //   readStatus: 'Read'
    // },
    // { 
    //   id: 2, 
    //   title: '1984', 
    //   author: 'George Orwell', 
    //   genre: 'Dystopian',
    //   readStatus: 'Reading'
    // }

    // {
    //     title:'',
    //     author:'',
    //     genre:'',
    //     country:'',
    //     state:'',
    //     readStatus:''
    // }
  ]);

  // Edit Mode States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);

  // New Book Form State
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    isbn:'',
    country:user.country,
    state:user.state,
    readStatus: 'Not Read'
  });

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Profile Image Upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile Edit Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleProfileEdit = () => {
    if (isEditingProfile) {
      setEditedProfile({...profile});
    }
    setIsEditingProfile(!isEditingProfile);
  };

  const saveProfile = () => {
    setProfile({...editedProfile});
    setIsEditingProfile(false);
  };

  // Book Handlers
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const addBook = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/books/add',
        newBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book added successfully:", response.data);
      setBooks((prev) => [...prev, response.data.book]);
      setNewBook({
        title: '',
        author: '',
        genre: '',
        isbn:'',
        country:user.country,
        state:user.state,
        readStatus: 'Not Read'
      });
      window.location.reload();
    } catch (err) {
      console.error("Error adding book:", err.response?.data || err.message);
    }
  };

  useEffect(() => { getuserbooks(); }, []);
  const getuserbooks = async () => {
    try {
      const response = await axios.get( 'http://localhost:5000/api/books/userbooks',
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setBooks(response.data);
      console.log("Books retrieved successfully:", response.data);
    } catch (err) {
      console.error("Error retrieving books:", err.response?.data || err.message);
    }
  };


  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/api/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Book deleted successfully:", response.data);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      window.location.reload();
    })
    .catch((err) => console.error("Error deleting book:", err.response?.data || err.message));
  };
  
  const updatedetails = async () => {
    try {
      const response = await axios.put( 'http://localhost:5000/api/users/updatedetails',
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data.user.bio);
      setProfile(editedProfile);
      setIsEditingProfile(false);
      setBio(response.data.user.bio);
      setUsername(response.data.user.name);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
    }
  };
  // Logout Handler (placeholder)
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (

   <div className='w-full h-max'>
    <div className='fixed w-full'>
      <Navbar/>
    </div>
      <div 
      className="min-h-screen bg-gradient-to-br from-teal-600 to-emerald-800 flex items-center justify-center p-4 md:p-8 pt-24"
      style={{
        minHeight: '100dvh',
        overflowX: 'hidden'
      }}
    >
     
      <div 
        className={`w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden ${
          isMobile 
            ? 'flex flex-col' 
            : 'grid grid-cols-[340px_1fr]'
        } border border-gray-200`}
      >
        {/* Sidebar - Profile Overview */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-800 text-white p-8 flex flex-col items-center justify-between">
          <div className="relative mb-6">
            <input 
              type="file" 
              id="profileImageUpload"
              accept="image/*"
              onChange={handleProfileImageUpload}
              className="hidden"
            />
            <label 
              htmlFor="profileImageUpload" 
              className="cursor-pointer"
            >
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt="Profile" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-white/30 hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-20 h-20 text-white" />
                </div>
              )}
            </label>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-white/80 mb-6">{user.email}</p>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg flex items-center justify-center transition"
            >
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 md:p-8 overflow-y-auto">
          {/* Profile Details Section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
                <User className="mr-3 text-teal-600" size={28} /> 
                Profile Details
              </h2>
              <div className="flex space-x-2">
                {!isEditingProfile ? (
                  <button 
                    onClick={toggleProfileEdit} 
                    className="text-teal-600 hover:text-teal-800 flex items-center"
                  >
                    <Edit className="mr-1" size={20} /> Edit
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={toggleProfileEdit} 
                      className="text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={updatedetails} 
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center"
                    >
                      <Save className="mr-1" size={20} /> Save
                    </button>
                  </>
                )}
              </div>
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                  placeholder="Email"
                />
                <textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                  placeholder="Bio"
                  rows="4"
                />
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg font-semibold text-gray-800 mb-2">{username}</p>
                <p className="text-gray-600 mb-3">{user.email}</p>
                <p className="text-gray-500">{bio}</p>
              </div>
            )}
          </div>

          {/* Books Section */}
          <div>
  {/* Header Section */}
  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
      <Book className="mr-3 text-emerald-600" size={28} />
      My Books
    </h2>
    <button
      onClick={() => setIsAddingBook((prev) => !prev)}
      className="text-emerald-600 hover:text-emerald-800 flex items-center"
    >
      <Plus className="mr-1" size={20} />
      {isAddingBook ? 'Cancel' : 'Add Book'}
    </button>
  </div>

  {/* Add Book Form */}
  {isAddingBook && (
    <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg mb-6 space-y-4">
      {/* Book Title */}
      <input
        type="text"
        name="title"
        value={newBook.title}
        onChange={handleBookChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200"
        placeholder="Book Title"
      />

      {/* Author and Genre */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleBookChange}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200"
          placeholder="Author"
        />
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleBookChange}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200"
          placeholder="Genre"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input type='text' name='isbn' value={newBook.isbn} onChange={handleBookChange} className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200' placeholder='ISBN'/>
      </div>

      {/* Read Status and Save Button */}
      <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
        <select
          name="readStatus"
          value={newBook.readStatus}
          onChange={handleBookChange}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200"
        >
          <option value="Not Read">Not Read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
        <button
          onClick={addBook}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
        >
          Save Book
        </button>
      </div>
    </div>
  )}


            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {books.map((book) => (
                <div 
                  key={book._id} 
                  className="bg-white border border-gray-200 p-5 rounded-lg flex justify-between items-center hover:shadow-md transition"
                >
                  <div className="flex-grow mr-4">
                    <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                    <p className="text-gray-600 text-sm mb-2 truncate">{book.author}</p>
                    <div className="flex flex-wrap space-x-2">
                      <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs mb-1">
                        {book.genre}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs mb-1">
                        {book.readStatus}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteBook(book._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition flex-shrink-0"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default ProfilePage;