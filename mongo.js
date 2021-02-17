import mongoose from 'mongoose';

const galaxyDataSchema = mongoose.Schema({
    name:String,
    imgurl:String,
    about:String
});

export default mongoose.model('datas' , galaxyDataSchema );