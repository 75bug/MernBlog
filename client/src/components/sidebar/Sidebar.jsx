import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">About Me</span>
            <img
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="" 
            />
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora nisi cum enim eaque, voluptatum ratione molestiae magni nam sint reprehenderit debitis at quam rerum molestias temporibus minus nesciunt quidem repellat.
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
              {cats.map((c) => (
                <Link to={`/?cat=${c.name}`} className="link">
                  <li className="sidebarListItem">{c.name}</li>
                </Link>               
              ))}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Follow Us</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                <i className="sidebarIcon fa-brands fa-linkedin"></i>
            </div>
    </div>
    </div>
  )
        
}
