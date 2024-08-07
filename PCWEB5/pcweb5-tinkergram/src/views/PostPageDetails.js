import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { API, POST, DELETE } from "../constants";
import SiteNav from "../templates/SiteNav";

export default function PostPageDetails() {
  const [ caption, setCaption ] = useState("");
  const [ image, setImage ] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;


  // const { image, caption } = {
  //   image: "https://picsum.photos/id/80/600",
  //   caption: "Sample photo of pinecones"
  // };
  async function getPost(id) {
    const url = API + POST + "/" + id;
    const response = await axios.get(url);
    const { caption, image } = response.data; // temporary vars for destructuring
    setCaption(caption);
    setImage(image);
  }

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);

  //Helper function for deleting
  async function deletePost(id) {
    const url = API + DELETE + "/" + id;
    await axios.delete(url);
    navigate("/")
  }

  return (
    <>
      <SiteNav/>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src = {image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>{caption}</Card.Text>
                <Card.Link 
                  class = "btn border border-2"
                  href = {`/update/${id}`} 
                  style = {{cursor: "pointer", 
                            textDecoration: "none",
                            }}>
                  Edit
                </Card.Link>

                <Card.Link 
                  class = "btn border border-2 mx-2"
                  onClick={() => deletePost(id)} 
                  style = {{cursor: "pointer", 
                            textDecoration: "none"}}>
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
