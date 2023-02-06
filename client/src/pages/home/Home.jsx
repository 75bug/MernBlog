// external imports
import { useEffect, useState } from "react";
import axios from "axios";

// internal imports
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [post, setPost] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async() => {
      const res = await axios.get("/posts" + search);
      setPost(res.data);
    }
    fetchPosts();
  }, [search]); 
  return (
    <>
      <Header />
      <div className="home">
          <Posts posts={post} />
          <Sidebar />
      </div>
    </>   
  );
}
