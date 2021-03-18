//initialize objects from other packages
const express = require('express');
const app = express();
const path = require('path');
const { v4: getId } = require('uuid');
const methodOverride = require('method-override');

//Some data to use (using let since we need to add new posts)
let posts = [
    {
        username: "billyBob",
        title: "Aljubarrota",
        post: 'Aljubarrota is a freguesia ("civil parish") in the municipality of Alcobaça, Portugal. It was formed in 2013 by the merger of the parishes of Prazeres and São Vicente.',
        id: getId()
    },
    {
        username: "itsPam",
        title: "Football History",
        post: 'The 1911 Georgia Tech Yellow Jackets football team represented the Georgia Institute of Technology during the 1911 college football season. The team featured future coach William Alexander as a reserve quarterback.',
        id: getId()
    },
    {
        username: "trainGuy1000",
        title: "Train Stations",
        post: 'Currently, there are 2 stations. The old one, now used as a PNR quarters, used to be the station where passengers can ride trains going to the Bicol region, to the former terminus of the Metro Manila Commuter in Biñan and Calamba stations, and to the branch line towards Carmona station.',
        id: getId()
    },
    {
        username: "JagerFan16",
        title: "Rudolf Jager",
        post: 'Rudolf Jäger (30 August 1875 – 22 January 1948) was a German operatic tenor and voice teacher.',
        id: getId()
    }
]

//Parse html and json requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Tells program to expect method-override
app.use(methodOverride('_method'));

//Specify the location of ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//specify localHost port
app.listen(3000, () => {
    console.log("We're connected!");
});

//show all the posts
app.get('/posts', (req, res) => {
    res.render('posts/index', {posts});
});

//opens form for new post
app.get('/posts/new', (req, res) => {
    res.render('posts/new');
})

//POSTs the new post
app.post('/posts', (req, res) =>{
    const {title, username, post} = req.body;
    posts.push({title, username, post, id: getId()});
    res.redirect('/posts');
})

//display the details of an existing post
app.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    const currentPost = posts.find(element => element.id === id);
    res.render('posts/detail', {currentPost});
})

//show a form to edit the post
app.get('/posts/:id/edit', (req, res) => {
    const {id} = req.params;
    const currentPost = posts.find(element => element.id === id);
    res.render('posts/edit', {currentPost});
})

//Patch the edited post
app.patch('/posts/:id', (req, res) => {
    const {id} = req.params;
    const {title, username, post} = req.body;
    const currentPost = posts.find(element => element.id === id);
    currentPost.title = title;
    currentPost.username = username;
    currentPost.post = post;
    res.redirect('/posts');
})

//Delete post
app.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    //update the posts by filtering out this one and updating the array reference
    posts = posts.filter(post => post.id != id);
    res.redirect('/posts');
})