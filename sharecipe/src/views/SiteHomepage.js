import { useEffect, useState } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import NavRow from "../templates/NavRow";
import "../css/style.css";

export default function SiteHome() {
  const [recipes, setRecipes] = useState([]);

   async function getAllRecipes() {
    const query = await getDocs(collection(db, "recipes"));
    const recipes = query.docs.map((doc) => {
        return { id: doc.id, ...doc.data()};
    });
    setRecipes(recipes);
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  const ImagesRow = () => {
    return recipes.map((recipe, index) => <ImageSquare key={index} recipe={recipe} />);
  };

  return (
    <body>
      <NavRow />
      <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </body>
  );
}

function ImageSquare({ recipe }) {
  const { image, name, id } = recipe;
  return (
    <Link
      to={`recipe/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "1rem",
        textDecoration: "None",
      }}
    >
      <Col key={id} className="my-3" >
        <Card style={{ height: "fit-content", width: "fit-content", border: "None", borderRadius: "1rem", overflow: "hidden" }}>
          <Card.Img variant="top" src={image} style={{ width:"18rem", height:"18rem", objectFit:"cover" }} />
          <Card.Body style={{ backgroundColor:"#E4CCFF" }}>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
}