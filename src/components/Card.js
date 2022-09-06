import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavbarComponent } from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./card.css";

export const CardItem = () => {
  const [post, setpost] = useState([]);
  const [titlee, setChangeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page] = useState(4);

  const getPost = ({ currentPage = 1, per_page }) => {
    setLoading(true);
    axios("https://jsonplaceholder.typicode.com/posts", {
      method: "get",
      params: {
        _page: currentPage,
        _limit: per_page
      }
    })
      .then((res) => {
        setpost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost({ currentPage, per_page });
  }, [currentPage, per_page]);

  // let pagecount =Math.floor( 100/per_page)

  return (
    <div>
      <NavbarComponent setChangeTitle={setChangeTitle} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="main-div">
          {post
            .filter((value) => {
              if (titlee === "") {
                return value;
              } else if (
                titlee.length >= 3 &&
                value.title.toLowerCase().includes(titlee.toLowerCase())
              ) {
                return value;
              }
            })
            .map((e) => {
              return (
                <div className="list-card" key={e.id}>
                  <Card className="list-item">
                    <Card.Body>
                      <Card.Title>{e.title}</Card.Title>
                      <Card.Text>{e.body}</Card.Text>
                      <Link to={`/user/${e.id}`}>
                        <Button variant="success">View User</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      )}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Button
          variant="dark"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>
        <h3>{currentPage}</h3>
        <Button variant="dark" onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};
