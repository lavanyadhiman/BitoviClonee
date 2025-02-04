import { useState } from "react";
import Navbar from './Components/Navbar';
import Blogbg from './Components/blogbg';
import BlogArticle from './Components/BlogArticle';
import Footer from './Components/Footer';
import ContactForm from './Components/ContactForm';
import ChatBot from './Components/ChatBot';
import './app.css';

function App() {
  const [showContactForm, setShowContactForm] = useState(false); 
  return (
    <>
      <Navbar setShowContactForm={setShowContactForm} />
      {showContactForm && <ContactForm setShowContactForm={setShowContactForm} />} 
      <Blogbg />
      <BlogArticle />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
