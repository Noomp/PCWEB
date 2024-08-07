import express from "express";
import mysql from "mysql2";
import cors from "cors";

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "tinkergram"
}).promise();

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

//Helper functions

//Helper function to get single post from database
async function getPost(id) {
    const [rows] = await pool.query(`
        SELECT * FROM posts WHERE id = ?`,
        [id]
    );
    return rows[0];
};

//Helper function to add post to the database
async function addPost(caption, image) {
    const [result] = await pool.query(
        `INSERT INTO posts (caption, image) VALUES (?,?)`,
        [caption, image]
    );
    const id = result.insertId;
    return getPost(id);
}

//Helper function to update post in the database
async function updatePost(id, caption, image) {
    await pool.query (`
        UPDATE posts
        SET caption = ?, image = ?
        WHERE id = ?`,
        [caption, image, id]
    );
    return getPost(id);
};

//Helper function to delete post from database
async function delPost(id) {
    await pool.query(`DELETE FROM posts WHERE id = ?`,
    [id]
    );
}

//Helper function to get all posts from database
async function getAllPosts() {
    const [rows] = await pool.query(`
        SELECT * FROM posts;`);
        return rows;
}

//Port
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//API endpoints

//API endpoint: GET /posts/:id
app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const post = await getPost(id);
    res.status(200).send(post);
});

//API endpoint: POST /add
app.post("/add", async (req, res) => {
    const {caption, image} = req.body;
    const post = await addPost(caption,image);
    console.log(`Post added: ${post}`);
    res.status(201).send({ status: "Successfully added post" });
});

//API endpoint: UPDATE /posts/:id
app.put("/posts/:id", async (req,res) => {
    const id = req.params.id;
    const {caption, image} = req.body;
    const updatedPost = await updatePost(id, caption, image);
    res.send(updatedPost).status(202);
});

//API endpoint: DELETE /posts/:id
app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id;
    await delPost(id);
    res.send({ status: "Success"}).status(202);
});

//API endpoint: GET /posts
app.get("/posts", async (req, res) => {
    const posts = await getAllPosts();
    res.send(posts).status(202);
})