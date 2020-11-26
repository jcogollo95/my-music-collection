const mongoose=require('mongoose');
const {Schema}=mongoose
const PostSchema=new Schema({
   titulo:{type:String},
   codigo_err:{type:String},
   codigo_fuente:{type:String},
   descripcion:{type:String},
   // estudiante:{type:Schema.Types.ObjectId,ref:'Estudiante'}
},{versionKey:false});

const Post=mongoose.model('Post',PostSchema);
module.exports=Post;