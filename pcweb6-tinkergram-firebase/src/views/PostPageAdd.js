import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SiteNav from "../templates/SiteNav";
import "../css/style.css";

export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://picsum.photos/536/123"
  );
  const [ imageName, setImageName ] = useState("");
  const navigate = useNavigate();

  async function addPost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await addDoc(collection(db, "posts"), { caption, image: imageUrl, imageName: imageName });
    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);

  return (
    <>
      <body>
        <SiteNav />

        <Container>
          <h1 style={{ marginBlock: "1rem", color: "#ddd" }}>Add Post</h1>
          <Form>
            <Form.Group className="mb-3" controlId="caption">
              <Form.Label style={{ color: "#ddd" }}>Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lovely day"
                value={caption}
                onChange={(text) => setCaption(text.target.value)}
              />
            </Form.Group>

            <Image src = {previewImage}
              style = {{
                objectFit: "cover",
                width: "10rem",
                height: "10rem",
                marginBottom: "1rem",
              }}
            />

            <Form.Group className="mb-3" controlId="image">
              <Form.Label style={{ color: "#ddd" }}>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const imageFile = e.target.files[0];
                  const previewImage = URL.createObjectURL(imageFile);
                  setImage(imageFile);
                  setPreviewImage(previewImage);
                  setImageName(imageFile.name);
                }}
              />
              {/* <Form.Text className="text-muted">
                Make sure the url has an image type at the end: jpg, jpeg, png. */}
              {/* </Form.Text> */}
            </Form.Group>
            <Button variant="secondary" onClick={async (e) => addPost()}>
              Submit
            </Button>
          </Form>
        </Container>
      </body>
    </>
  );
}
