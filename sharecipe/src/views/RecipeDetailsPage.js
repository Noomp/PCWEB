import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Form, Button, Modal, Collapse } from "react-bootstrap"; // Added Collapse for comments
import { useNavigate, useParams } from "react-router-dom";
import NavRow from "../templates/NavRow";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaHeart } from "react-icons/fa"; // Added react-icons for like button
import "../css/style.css";

export default function RecipeDetailsPage() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [procedure, setProcedure] = useState("");
    const [image, setImage] = useState("");
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likedBy, setLikedBy] = useState([]);
    const [userId, setUserId] = useState(""); // add state for storing user ID of the recipe creator
    const [showModal, setShowModal] = useState(false);
    const [showComments, setShowComments] = useState(false); // State for comments section
    const [user, loading] = useAuthState(auth);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const storage = getStorage();
  
    async function getRecipe(id) {
      const recipeDocument = await getDoc(doc(db, "recipes", id));
      const recipe = recipeDocument.data();
      setName(recipe.name);
      setIngredients(recipe.ingredients);
      setProcedure(recipe.procedure);
      setImage(recipe.image);
      setLikes(recipe.likes || 0); // Ensure likes is initialized to 0 if undefined
      setLikedBy(recipe.likedBy || []); // Ensure likedBy is initialized to an empty array if undefined
      setComments(recipe.comments || []); // Ensure comments is initialized to an empty array if undefined
      setUserId(recipe.userId); // set the user ID of the recipe creator
    }
  
    async function deleteRecipe(id) {
      // Delete image from storage
      const recipeDocument = await getDoc(doc(db, "recipes", id));
      const recipe = recipeDocument.data();
      const desertRef = ref(storage, `images/${recipe.imageName}`);
      deleteObject(desertRef).then(() => {
        console.log("Deleted from Firebase Storage");
      }).catch((error) => {
        console.log(error.message);
      });
      // Delete recipe from db
      await deleteDoc(doc(db, "recipes", id));
      navigate("/");
    }
  
    async function toggleLike() {
      if (!user) {
        setShowModal(true);
        return;
      }
  
      const recipeRef = doc(db, "recipes", id);
      if (likedBy.includes(user.uid)) {
        // Unlike the recipe
        await updateDoc(recipeRef, {
          likes: likes - 1,
          likedBy: arrayRemove(user.uid)
        });
        setLikes(likes - 1);
        setLikedBy(likedBy.filter(uid => uid !== user.uid));
      } else {
        // Like the recipe
        await updateDoc(recipeRef, {
          likes: likes + 1,
          likedBy: arrayUnion(user.uid)
        });
        setLikes(likes + 1);
        setLikedBy([...likedBy, user.uid]);
      }
    }
  
    async function addComment() {
      if (!user) {
        setShowModal(true);
        return;
      }
  
      const recipeRef = doc(db, "recipes", id);
      const newCommentObj = { user: user.uid, text: newComment };
      await updateDoc(recipeRef, {
        comments: arrayUnion(newCommentObj)
      });
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  
    useEffect(() => {
      if (loading) return;
      getRecipe(id);
    }, [id, navigate, user, loading]);
  
    return (
      <body>
        <NavRow />
        <Container>
          <Col style={{ marginTop: "5rem" }}>
            <Col>
              <h2 style={{ top: "1rem", left: "20px", padding: "1rem 0 0 1rem" }}>{name}</h2>
              <Image src={image} style={{ width: "50%", borderRadius: "5px", position: "relative", float: "left" }} />
              <div 
              style={{ 
                float: "right", 
                width: "45%", 
                paddingLeft: "1rem", 
                minHeight:"27rem", 
                borderRadius: "8px" }}
              class="paperOverlay">
                <h4 className="py-3">Ingredients</h4>
                <Card.Text>
                  {ingredients.split('\n').map((sentence, index) => (
                    <div key={index}>
                      {sentence.trim() && <p>{sentence.trim()}.</p>}
                    </div>
                  ))}
                </Card.Text>
              </div>
            </Col>
            <div style={{ clear: "both" }}></div>
            <Col style={{ marginTop: "1rem" }}>
              <div>
                <span style={{ marginRight: "10px" }}>{likes} likes</span>
                <FaHeart
                  onClick={toggleLike}
                  style={{
                    cursor: "pointer",
                    color: likedBy.includes(user?.uid) ? "red" : "grey",
                    fontSize: "1.5rem"
                  }}
                />
              </div>
              {user && user.uid === userId && (
                <>
                  <Card.Link
                    href={`/edit/${id}`}
                    style={{
                      backgroundColor: "grey",
                      cursor: "pointer",
                      border: "solid",
                      borderRadius: "5px",
                      borderColor: "grey",
                      textDecoration: "none",
                      color: "white",
                      padding: "2px 5px",
                      marginLeft: "1px"
                    }}
                  >
                    Edit
                  </Card.Link>
                  <Card.Link
                    onClick={() => deleteRecipe(id)}
                    style={{
                      backgroundColor: "darkred",
                      cursor: "pointer",
                      border: "solid",
                      borderRadius: "5px",
                      borderColor: "darkred",
                      textDecoration: "none",
                      color: "white",
                      padding: "2px 5px",
                      marginLeft: "10px"
                    }}
                  >
                    Delete
                  </Card.Link>
                </>
              )}
              <Button
                variant="secondary"
                onClick={() => setShowComments(!showComments)}
                aria-controls="comments-section"
                aria-expanded={showComments}
                style={{ marginTop: "1rem" }}
              >
                Show Comments
              </Button>
              <Collapse in={showComments}>
                <div id="comments-section">
                  {comments.map((comment, index) => (
                    <div key={index} style={{ marginBottom: "10px", backgroundColor: "#ddd", padding: "10px", borderRadius: "5px" }}>
                      <strong>{comment.user}:</strong> {comment.text}
                    </div>
                  ))}
                  <Form>
                    <Form.Group className="mb-3" controlId="comment">
                      <Form.Label>Add a comment</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={addComment}>
                      Submit
                    </Button>
                  </Form>
                </div>
              </Collapse>
            </Col>
            <Col style={{ marginTop: "1rem" }}>
              <h4>Procedure</h4>
              <Card.Text>
                {procedure.split('.').map((sentence, index) => (
                  <div key={index}>
                    {sentence.trim() && <p>{sentence.trim()}.</p>}
                  </div>
                ))}
              </Card.Text>
            </Col>
          </Col>
        </Container>
  
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to be logged in to like or comment on a recipe.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </Modal.Footer>
        </Modal>
      </body>
    );
  }
