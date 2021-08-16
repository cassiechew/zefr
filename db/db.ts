import mongoose, { Model } from 'mongoose';
const {Schema} = mongoose;
let Url : any = null;

const host : string = process.env.DB_HOST ?? ""

mongoose.connect(host, {useNewUrlParser: true, useUnifiedTopology: true});

Url = mongoose.model('Url', new Schema({ short: String, long: String }));


export default {mongoose, Url}
