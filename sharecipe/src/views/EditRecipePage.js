import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavRow from "../templates/NavRow";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "../css/style.css";

export default function EditRecipePage() {
  const params = useParams();
  const id = params.id;
  const [name, setName] = useState(""); // Added for recipe name
  const [ingredients, setIngredients] = useState(""); // Added for recipe ingredients
  const [procedure, setProcedure] = useState(""); // Added for recipe procedure
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://picsum.photos/536/305"
  );
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function updateRecipe() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    // Updated the fields being updated in Firestore
    await updateDoc(doc(db, "recipes", id), { name, ingredients, procedure, image: imageUrl });
    navigate("/");
  }

  async function getRecipe(id) {
    const recipeDocument = await getDoc(doc(db, "recipes", id));
    const recipe = recipeDocument.data();
    setName(recipe.name); // Setting recipe name
    setIngredients(recipe.ingredients); // Setting recipe ingredients
    setProcedure(recipe.procedure); // Setting recipe procedure
    setImage(recipe.image);
    setPreviewImage(recipe.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getRecipe(id);
  }, [id, navigate, user, loading]);

  return (
    <body>
      <NavRow />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Update Recipe</h1>
        <Form>
          {/* Form group for recipe name */}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label >Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recipe Name"
              value={name}
              onChange={(text) => setName(text.target.value)}
            />
          </Form.Group>

          <Image
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "10rem",
              height: "10rem",
              marginBottom: "1rem"
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
              }}
            />
          </Form.Group>

          {/* Form group for recipe ingredients */}
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

          {/* Form group for recipe procedure */}
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

          <Button variant="primary" onClick={(e) => updateRecipe()}>
            Submit
          </Button>
          <Button variant="warning" 
          className="mx-2"
          onClick={(e) => navigate(`/recipe/${id}`)}>Cancel</Button>
        </Form>
      </Container>
    </body>
  );
}
