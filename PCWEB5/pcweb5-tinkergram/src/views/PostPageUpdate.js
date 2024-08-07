import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import SiteNav from "../templates/SiteNav";
import { API, PUT, POST } from "../constants";

export default function PostPageUpdate() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  async function getPost(id) {
    const url = API + POST + "/" + id;
    const response = await axios.get(url);
    const { caption, image } = response.data; // temporary vars for destructuring
    setCaption(caption);
    setImage(image);
  }

    useEffect(() => {getPost(id);}, [id]);

  return (
    <>
      <SiteNav />
      <Container>
        <h1 class = "mt-4 mb-3">Edit your post</h1>
          <Form>
            <Form.Group className="mb-3" controlId="caption">
              <Form.Label>Captions</Form.Label>
              <Form.Control 
              type = "text" 
              placeholder="Enter a caption"
              value = {caption}
              onChange = {(text) => setCaption(text.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
              type = "text" 
              placeholder="Enter image URL"
              value={image}
              onChange={(text) => setImage(text.target.value)}
              />
              <Form.Text className="text-muted">
                Please ensure the image ends in JPG, JPEG or PNG.
              </Form.Text>                        
            </Form.Group>
            <Button variant = "primary" 
            onClick={async (e) =>{
              const post = { image, caption };
              // same as const post = {image: image, caption: caption}
              try {
                await axios.put(API + PUT + "/" + id, post);
                navigate("/");
              } catch (error) {
                console.error(error.message);
              }
            }}>
            Confirm</Button>
          </Form>
      </Container>
    </>
  );
}
