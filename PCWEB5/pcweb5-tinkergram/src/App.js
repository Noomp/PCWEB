import './App.css';
import { Container, Image, Row } from "react-bootstrap";
import SiteNav from "./templates/SiteNav";
import {useEffect, useState} from "react";
import {API, POSTS} from "./constants";
import axios from "axios";
import { Link } from "react-router-dom";

function ImageSquare({ post }) {
  const { image, id } = post;
  return (
    <Link 
      to={`posts/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  
  async function getAllPosts() {
    try {
      const url = API + POSTS;
      console.log(`Fetching from ${url}`);
      const response = await axios.get(url);
      const posts = response.data;
      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <SiteNav />
      <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}

export default App;