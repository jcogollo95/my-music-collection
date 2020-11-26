const mongoose=require('mongoose');
const {Schema}=mongoose
const ComentarioSchema=new Schema({
   titulo:{type:String},
   descripcion:{type:String},
   estudiante:{
       type:Schema.Types.ObjectId,
       ref:'Estudiante'
    },
   post:{
       type:Schema.Types.ObjectId,
       ref:'Post'
   }
},{versionKey:false});

const Comentario=mongoose.model('Comentario',ComentarioSchema);
module.exports=Comentario;