import React, { useState, useEffect } from 'react';
import { User, Book, LogOut, Edit, Plus, Trash2, Save } from 'lucide-react';

const ProfilePage = () => {
  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Bidit Raj',
    email: 'biditraj@gmail.com',
    bio: 'Book lover and aspiring writer',
    profileImage: null
  });

  // Temporary profile state for editing
  const [editedProfile, setEditedProfile] = useState({...profile});

  // Books State
  const [books, setBooks] = useState([ 
    { 
      id: 1, 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee', 
      genre: 'Classic',
      readStatus: 'Read'
    },
    { 
      id: 2, 
      title: '1984', 
      author: 'George Orwell', 
      genre: 'Dystopian',
      readStatus: 'Reading'
    }
  ]);

  // Edit Mode States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);

  // New Book Form State
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
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

  const addBook = () => {
    if (newBook.title && newBook.author) {
      setBooks(prev => [
        ...prev, 
        { 
          ...newBook, 
          id: prev.length + 1 
        }
      ]);
      setNewBook({
        title: '',
        author: '',
        genre: '',
        readStatus: 'Not Read'
      });
      setIsAddingBook(false);
    }
  };

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  // Logout Handler (placeholder)
  const handleLogout = () => {
    alert('Logging out...');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-teal-600 to-emerald-800 flex items-center justify-center p-4 md:p-8"
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
                <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                  <User className="w-20 h-20 text-white" />
                </div>
              )}
            </label>
          </div>

          {/* Move name and email below profile image */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
            <p className="text-white/80 mb-6">{profile.email}</p>
            
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
                      onClick={saveProfile} 
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
                <p className="text-lg font-semibold text-gray-800 mb-2">{profile.name}</p>
                <p className="text-gray-600 mb-3">{profile.email}</p>
                <p className="text-gray-500">{profile.bio}</p>
              </div>
            )}
          </div>

          {/* Books Section */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
                <Book className="mr-3 text-emerald-600" size={28} /> 
                My Books
              </h2>
              <button 
                onClick={() => setIsAddingBook(!isAddingBook)} 
                className="text-teal-600 hover:text-teal-800 flex items-center"
              >
                <Plus className="mr-1" size={20} /> Add Book
              </button>
            </div>

            {isAddingBook && (
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  name="title"
                  value={newBook.title}
                  onChange={handleBookChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="author"
                  value={newBook.author}
                  onChange={handleBookChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                  placeholder="Author"
                />
                <input
                  type="text"
                  name="genre"
                  value={newBook.genre}
                  onChange={handleBookChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                  placeholder="Genre"
                />
                <select
                  name="readStatus"
                  value={newBook.readStatus}
                  onChange={handleBookChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                >
                  <option value="Not Read">Not Read</option>
                  <option value="Reading">Reading</option>
                  <option value="Read">Read</option>
                </select>
                <button 
                  onClick={addBook} 
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center"
                >
                  Add Book
                </button>
              </div>
            )}

            <div className="space-y-4">
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                    <p className="text-gray-500">{book.genre}</p>
                    <p className="text-teal-600">{book.readStatus}</p>
                  </div>
                  <button 
                    onClick={() => deleteBook(book.id)} 
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
