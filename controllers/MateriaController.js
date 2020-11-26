const Materia=require('../models/materia');

let getMaterias=(req,res)=>{
    Materia.find({},(err,materias)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        if(!materias){
           res.status(404).send({
               message:'No existen materias'
           })  
        }
        res.status(200).send({
            materias
        })
    })
}
let getMateria=async (req,res)=>{
    const materia=await Materia.findById(req.params.id);
    res.json(materia);
}

let newMateria=async (req,res)=>{
    const materia=new Materia(req.body);
    await materia.save();
    res.json({
        status:'Materia guardada'
    })
}
let deleteMateria=(req,res)=>{
    let {id}=req.params.id;
    Materia.findById(id,(err,materia)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        Materia.deleteOne(err=>{
            if(err){
                res.status(500).send({
                    message:`Error en el server ${err}`
                })
            }else{
                res.status(200).send({
                    message:'La materia ha sido eliminada con exito'
                })
            }
        })
    })

};

let updateMateria=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Materia.findByIdAndUpdate(id,update,{new:true},(err,materiaUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar la materia ${err}`
            })
        }
        res.status(200).json({
            materia:materiaUpdated
        })
    })
}

module.exports={
    getMaterias,
    getMateria,
    newMateria,
    deleteMateria,
    updateMateria
}