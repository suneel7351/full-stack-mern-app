import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import "./style.css";
import { useState } from "react";
export default function Appbar() {
  const [page, setPage] = useState(window.location.pathname);
  return (
    <header>
      {" "}
      <div className="header">
        <nav>
          {" "}
          <div className="toolbar">
            <Link to="/" onClick={() => setPage("/")}>
              {page === "/" ? (
                <Home className="icon" />
              ) : (
                <HomeOutlined className="icon" />
              )}
            </Link>
            <Link to="/newpost" onClick={() => setPage("/newpost")}>
              {page === "/newpost" ? (
                <Add className="icon" />
              ) : (
                <AddOutlined className="icon" />
              )}
            </Link>
            <Link to="/search" onClick={() => setPage("/search")}>
              {page === "/search" ? (
                <Search className="icon" />
              ) : (
                <SearchOutlined className="icon" />
              )}
            </Link>
            <Link to="/profile" onClick={() => setPage("/profile")}>
              {page === "/profile" ? (
                <AccountCircle className="icon" />
              ) : (
                <AccountCircleOutlined className="icon" />
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
