const Comentario=require('../models/comentario');

let getComentarios=(req,res)=>{
    Comentario.find()
     .populate('estudiante')
     .populate('post')
     .exec((err,comentarios)=>{
         if(err){
             res.status(500).send({
                 message:`Error ${err}`
             })
         }
         if(!comentarios){
            res.status(404).send({
                message:'No existen comentarios'
            })  
         }
         res.status(200).send({
             comentarios
         })
     })
}
let getComentario=async (req,res)=>{
    const comentario=await Comentario.findById(req.params.id);
    res.json(comentario);
}

let newComentario=async (req,res)=>{
    const comentario=new Comentario(req.body);
    await comentario.save();
    res.json({
        status:'Comentario guardado'
    })
}
let deleteComentario=(req,res)=>{
    let {id}=req.params.id;
    Comentario.findById(id,(err,comentario)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        Comentario.deleteOne(err=>{
            if(err){
                res.status(500).send({
                    message:`Error en el server ${err}`
                })
            }else{
                res.status(200).send({
                    message:'El comentario ha sido eliminado con exito'
                })
            }
        })
    })

};

let updateComentario=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Comentario.findByIdAndUpdate(id,update,{new:true},(err,comentarioUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el autor ${err}`
            })
        }
        res.status(200).json({
            comentario:comentarioUpdated
        })
    })
}

module.exports={
    getComentarios,
    getComentario,
    newComentario,
    deleteComentario,
    updateComentario
}