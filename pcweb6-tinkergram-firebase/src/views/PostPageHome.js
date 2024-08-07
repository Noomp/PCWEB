import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SiteNav from "../templates/SiteNav";
import "../css/style.css";

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);

   async function getAllPosts() {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
        return { id: doc.id, ...doc.data()};
    });
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <body>
        <SiteNav />
        <Container>
          <Row>
            <ImagesRow />
          </Row>
        </Container>
      </body>
    </>
  );
}

function ImageSquare({ post }) {
  const { image, id } = post;
  return (
    <Link
      to={`post/${id}`}
      style={{
        width: "18rem",
        marginLeft: "0.5rem",
        marginTop: "0.5rem",
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