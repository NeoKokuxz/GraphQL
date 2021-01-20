//mongodb + srv: //user_admin:<password>@cluster0.5maki.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose')

const url = `mongodb+srv://user_admin:db123@cluster0.5maki.mongodb.net/demodb?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })