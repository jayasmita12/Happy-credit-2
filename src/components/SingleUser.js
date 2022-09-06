import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SingleUser = () => {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState({});
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setSingleUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <Alert variant="success" style={{ width: "50%", margin: "auto" }}>
        <h2>{singleUser.name}</h2>
        <Alert.Heading>{singleUser.email}</Alert.Heading>
        {/* <p>Address  : {singleUser.address.street} , {singleUser.address.suite} , {singleUser.address.city}</p> */}
        <p>Mobile No. : {singleUser.phone}</p>
        {/* <p>Company : {singleUser.company.name} </p> */}
      </Alert>
      <Link to="/">
        <Button variant="success">Back</Button>
      </Link>
    </div>
  );
};
