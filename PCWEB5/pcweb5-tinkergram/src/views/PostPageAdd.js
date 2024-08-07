import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SiteNav from "../templates/SiteNav";
import {API, ADD} from "../constants";
import { useState } from "react";
import React from "react";
import axios from "axios";

export default function PostPageAdd() {
const [caption, setCaption] = useState("");
const [image, setImage] = useState("");
const navigate = useNavigate();


  return (
    <>
      <SiteNav />
      {/* <p>
        You typed: {caption}/ {image}
      </p> */}
      <Container>
        <h1 class = "mt-4 mb-3">Add A Post</h1>
          <Form>
            <Form.Group className="mb-3" controlId="caption">
              <Form.Label>Captions</Form.Label>
              <Form.Control 
                type = "text" 
                placeholder="Lovely day"
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
            <Button 
              variant = "primary" 
              onClick={async (e) =>{
                const post = { image, caption };
                // same as const post = {image: image, caption: caption}
                try {
                  await axios.post(API + ADD, post);
                  navigate("/");
                } catch (error) {
                  console.error(error.message);
                }
              }}>
            Submit</Button>
          </Form>
      </Container>
    </>
  );
}
