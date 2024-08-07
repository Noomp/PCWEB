import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SiteNav from "../templates/SiteNav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import "../css/style.css";

export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [likes, setLikes] = useState(0);
  const [likedBy, setLikedBy] = useState([]);
  const [user, loading] = useAuthState(auth);
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const storage = getStorage();

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setLikes(post.likes || 0); // Ensure likes is initialized to 0 if undefined
    setLikedBy(post.likedBy || []); // Ensure likedBy is initialized to an empty array if undefined
  }

  async function deletePost(id) {
    // Delete image from storage
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    const desertRef = ref(storage, `images/${post.imageName}`);
    deleteObject(desertRef).then(() => {
      console.log("Deleted from Firebase Storage");
    }).catch((error) => {
      console.log(error.message);
    });
    // Delete post from db
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  }

  async function toggleLike() {
    const postRef = doc(db, "posts", id);
    if (likedBy.includes(user.uid)) {
      // Unlike the post
      await updateDoc(postRef, {
        likes: likes - 1,
        likedBy: arrayRemove(user.uid)
      });
      setLikes(likes - 1);
      setLikedBy(likedBy.filter(uid => uid !== user.uid));
    } else {
      // Like the post
      await updateDoc(postRef, {
        likes: likes + 1,
        likedBy: arrayUnion(user.uid)
      });
      setLikes(likes + 1);
      setLikedBy([...likedBy, user.uid]);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

  return (
    <>
      <SiteNav />
      <Container>
        <Col style={{ marginTop: "5rem" }}>
          <Col>
            <Image src={image} style={{ width: "100%", borderRadius: "5px" }} />
          </Col>
          <Col>
            <Card style={{ marginTop: "2rem"}}>
              <Card.Body style={{ backgroundColor: "#212529", color: "#ddd", borderColor: "#ddd" }}>
                <Card.Text>{caption}</Card.Text>
                <div>
                  <span style={{ marginRight: "10px" }}>{likes} likes</span>
                  <button 
                    onClick={toggleLike} 
                    style={{
                      backgroundColor: likedBy.includes(user?.uid) ? "#212529" : "grey",
                      cursor: "pointer",
                      border: "solid",
                      borderRadius: "5px",
                      borderColor: likedBy.includes(user?.uid) ? "#212529" : "grey",
                      color: "white",
                      padding: "2px 5px",
                      marginBottom: "1rem"
                    }}
                  >
                    {likedBy.includes(user?.uid) ? "Unlike" : "Like"}
                  </button>
                </div>
                <Card.Link 
                  href={`/update/${id}`}
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
                  onClick={() => deletePost(id)}
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
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Container>
    </>
  );
}
