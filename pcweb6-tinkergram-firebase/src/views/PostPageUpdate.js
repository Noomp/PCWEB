import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SiteNav from "../templates/SiteNav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "../css/style.css";

export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://picsum.photos/536/305"
  );
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function updatePost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await updateDoc(doc(db, "posts", id), { caption, image, imageUrl });
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setPreviewImage(post.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

  return (
    <body>
      <SiteNav />
      <Container>
        <h1 style={{ marginBlock: "1rem", color: "#ddd" }}>Update Post</h1>
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

          <Image
            src = {previewImage}
            style = {{
              objectFit: "cover",
              width: "10rem",
              height: "10rem",
              marginBottom: "1rem"
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
              }}
            />
            {/* <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text> */}
          </Form.Group>
          <Button variant="secondary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </body>
  );
}