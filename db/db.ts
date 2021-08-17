import mongoose from 'mongoose';
const {Schema} = mongoose;


const urlSchema = new Schema({
    short: String,
    long: String,
});

const host : string = process.env.DB_HOST ?? ""

mongoose.connect(host, {useNewUrlParser: true, useUnifiedTopology: true});

const Url = mongoose.model('url', urlSchema);

export default Url
