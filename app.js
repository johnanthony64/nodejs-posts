const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const postsDirectory = path.join(__dirname, 'posts');

if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory);
}

function createPost(title, content, callback) {
    const postId = uuidv4();
    fs.writeFile(path.join(postsDirectory, `${postId}.txt`), content, (err) => {
        callback(err, postId);
    });
}

function readPost(postId, callback) {
    fs.readFile(path.join(postsDirectory, `${postId}.txt`), 'utf8', (err, content) => {
        callback(err, content);
    });
}

function updatePost(postId, newContent, callback) {
    fs.writeFile(path.join(postsDirectory, `${postId}.txt`), newContent, err => {
        callback(err);
    });
}

function deletePost(postId, callback) {
    fs.unlink(path.join(postsDirectory, `${postId}.txt`), err => {
        callback(err);
    });
}

const app = express();
app.use(express.json());


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

