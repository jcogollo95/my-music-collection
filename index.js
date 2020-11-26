import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';
const port = process.env.PORT || 3000;

//Config
// UTILIZAR router.GET PUT ETC
//Middlewares
app.use(morgan('tiny'));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(router);

const history=require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname,'public')));


//config db
let db='mongodb://localhost:27017/share_code';
mongoose.set('useCreateIndex', true);
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log(`Error al conectar a la db ${err}`)
    }
    else {
        console.log('Conexión a la base de datos establecida')
    }
    app.listen(port, () => {
        console.log(`Connection on port ${port}`)
    })
})
