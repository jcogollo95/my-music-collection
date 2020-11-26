const Post=require('../models/post');

let getPosts=(req,res)=>{
    Post.find()
    .populate('estudiante')
     .exec((err,posts)=>{
         if(err){
             res.status(500).send({
                 message:`Error ${err}`
             })
         }
         if(!posts){
            res.status(404).send({
                message:'No existen posts'
            })  
         }
         res.status(200).send({
             posts
         })
     })
}
let getPost=async (req,res)=>{
    const post=await Post.findById(req.params.id);
    res.json(post);
}

let newPost=async (req,res)=>{
    const post=new Post(req.body);
    await post.save();
    res.json({
        status:'post guardado'
    })
}
let deletePost=(req,res)=>{
    let {id}=req.params.id;
    Post.findById(id,(err,post)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        Post.deleteOne(err=>{
            if(err){
                res.status(500).send({
                    message:`Error en el server ${err}`
                })
            }else{
                res.status(200).send({
                    message:'El post ha sido eliminado con exito'
                })
            }
        })
    })

};

let updatePost=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Post.findByIdAndUpdate(id,update,{new:true},(err,postUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el post ${err}`
            })
        }
        res.status(200).json({
            post:postUpdated
        })
    })
}

module.exports={
    getPosts,
    getPost,
    newPost,
    deletePost,
    updatePost
}