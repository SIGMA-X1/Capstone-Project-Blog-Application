import express from "express";
import bodyParser from "body-parser"
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const port=3000;
let posts=[];
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs",{Posts:posts});


});
app.get("/About",(req,res)=>{
 res.render("about.ejs");
});
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});
app.get("/header",(req,res)=>{
res.render("partials/header.ejs");
});

app.get("/create",(req,res)=>{
    res.render("create.ejs",{});
});
app.post("/edit/:id",(req,res)=>{
    const id=parseInt(req.params.id,10);
    res.render("edit.ejs",{
        id:id
    }); 
});
app.get("/delete",(req,res)=>{
    res.render("delete.ejs");

});

app.post("/editpost/:id", (req, res) => {
    const id=parseInt(req.params.id,10);
    const post = posts.find(p => p.id === id);

    if (post) {
        post.Name = req.body["blogName"];
        post.content = req.body["content"];
        res.render("editedpost.ejs", {
            post: post
        });
    } else {
        res.status(404).send("The  content was not found.");
    }
});
app.post("/delete/:id",(req,res)=>{
    const id=parseInt(req.params.id, 10); 
    posts=posts.filter(p=> p.id!=id);
    res.redirect("/");

});



app.post("/submit",(req,res)=>{
   const id=parseInt(req.body["id"],10);
   const imgid=Math.floor((Math.random() * 4) + 1);
   console.log(req.body["blogname"]);
    
    const newpost={
        id:id,
        Name:req.body["blogname"],
        AuthorName:req.body["AuthorName"],
        content:req.body["content"],
        imgid:imgid
    };
    posts.push(newpost);
    res.redirect("/")
   


});
app.listen(port,()=>{
 console.log(`server started at port no ${port}`);
});
