// /posts/add ==> To create a post, only if the user has logged in
// /posts ==> This will show the posts of logged in users.
//    - There should be a filter as well that can show the posts of single users (you can achieve this by handling queries)
//    - Can also filter out the posts based on min and max comments passed as queries, should show posts with comments in between min and max comments
//    - Only 3 posts should be visible per page (Apply Pagination)
// /posts/top ==> This will show the post details that has maximum number of comments for the user who has logged in.
//    - Only 3 posts should be visible per page (Apply Pagination)
// /posts/update ==> The logged in user can update his/her posts.
// /posts/delete ==> The logged in user can delete his/her posts.

// Following functionalities should also be there.
// 1. If the device name is passed as query, then it should show only those posts from which device that post has been made.
//  2. For Example, device=Mobile ==> will give mobile posts only for the user who has logged in.
// 3. device1=Mobile & device2=Tablet ==> will give the posts made by mobile and tablet for the user who has logged in.





const express = require("express")
const postRoutes = express.Router()
const {PostModel}= require("../models/post")


//TO ADD POST
postRoutes.post("/add",async(req,res)=>{
try {
const payload = req.body;

const post = new PostModel(payload)
await post.save()

res.send({"msg":"new post uploaded"})
    


} catch (error) { 
   res.send({"msg":error.message})
}

})

//MAX AND MIN WITH PAGINATION OF 3

postRoutes.get("/",async(req,res)=>{
    const max = +req.query.max;    
    const min = +req.query.min;
    try {
        const {user}= req.body
        const post =await PostModel.find({user})
        if(post.length>0){
         if(min&&max){   
    const posts =await PostModel.find({no_of_comments:{$gte:min,$lte:max}}).skip(1-1).limit(3) 
    res.send(posts)
        }else{
            const posts =await PostModel.find({user}).skip(1-1).limit(3) 
    res.send(posts)
        }
        }else{
            res.send({"msg":"no any post of this user"})
        }
        
    } catch (error) {
        res.send({"msg":error.message})
    }
})

//TOP WITH PAGINATION
postRoutes.get("/top",async(req,res)=>{
try {
    
    const {user}= req.body
    const post =await PostModel.find({user})
    if(post.length>0){
        

        const post = await PostModel.find({}).sort({no_if_comments:-1}).skip(1-1).limit(3)
      
    res.send(post)
    

    }else{
        res.send({"msg":"no any post of this user"})
    }


  
} catch (error) {
    res.send({"msg":error.message})
}

})


//FOR UPDATING THE POST
postRoutes.patch("/update/:id",async(req,res)=>{
    try {
        

        const {user}= req.body
        const post =await PostModel.find({user})
        if(post.length>0){
            
        const payload = req.body
            const id = req.params.id
                    const posts = await PostModel.findByIdAndUpdate({_id:id},payload)
                    res.send({"msg":"update"})
    
        }else{
            res.send({"msg":"no any post of this user"})
        }


        
    } catch (error) {
        res.send({"msg":error.message})
    }
})

//TO DELETE THE POST
postRoutes.delete("/delete/:id",async(req,res)=>{

try {
    const {user}= req.body
    const post =await PostModel.find({user})
    if(post.length>0){
        
    const id = req.params.id;
    const post =  await PostModel.findByIdAndDelete({_id:id})
    res.send({"msg":"delete"})

    }else{
        res.send({"msg":"no any post of this user"})
    }





} catch (error) {
    res.send({"msg":error.message})
}

})

//WE CAN GET IT BY QUERY

postRoutes.get("/get",async(req,res)=>{
 

  const device = req.query.device;
  
    try {

        const {user}= req.body
    const post =await PostModel.find({user})
    if(post.length>0){
        

        const postw =  await PostModel.find({device:device})
        res.send(postw)
    }else{
        res.send({"msg":"no any post of this user"})
    }



    } catch (error) {
        res.send({"msg":error.message})
    }


})



module.exports={
    postRoutes
}


