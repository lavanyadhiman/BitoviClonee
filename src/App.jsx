import { useState } from "react";
import Navbar from './Components/Navbar';
import Blogbg from './Components/blogbg';
import BlogArticle from './Components/BlogArticle';
import Footer from './Components/Footer';
import ContactForm from './Components/ContactForm';
import ChatBot from './Components/ChatBot';
import './app.css';

function App() {
  const [showContactForm, setShowContactForm] = useState(false); // Manage form visibility

  return (
    <>
      <Navbar setShowContactForm={setShowContactForm} /> {/* Pass the function to Navbar */}
      {showContactForm && <ContactForm setShowContactForm={setShowContactForm} />} {/* Conditionally render the form */}
      <Blogbg />
      <BlogArticle />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
