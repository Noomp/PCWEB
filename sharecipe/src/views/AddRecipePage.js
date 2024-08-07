import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NavRow from "../templates/NavRow";
import "../css/style.css";

export default function AddRecipePage() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://picsum.photos/536/348"
  );
  const [ imageName, setImageName ] = useState("");
  const navigate = useNavigate();

  async function addRecipe() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await addDoc(collection(db, "recipes"), {
      name, 
      image: imageUrl, 
      imageName: imageName,
      ingredients,
      procedure,
      userId: user.uid
    });
    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);

  return (
    <body>
      <NavRow />

      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Recipe</h1>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recipe Name"
              value={name}
              onChange={(text) => setName(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ingredients">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="List of ingredients"
              value={ingredients}
              onChange={(text) => setIngredients(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="procedure">
            <Form.Label>Procedure</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Step-by-step procedure"
              value={procedure}
              onChange={(text) => setProcedure(text.target.value)}
            />
          </Form.Group>

          <Image src={previewImage}
            style={{
              objectFit: "cover",
              width: "10rem",
              height: "10rem",
              marginBottom: "1rem",
            }}
          />

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
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
          </Form.Group>
          <Button variant="secondary" onClick={async (e) => addRecipe()}>
            Submit
          </Button>
        </Form>
      </Container>
    </body>
  );
}
