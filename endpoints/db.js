const mongoose = require('mongoose');

main().catch(err => console.log(err));
main().then(() => {console.log('connected to mongoose')})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/notebook',{useNewUrlParser: true,
  useUnifiedTopology: true});
}

module.exports =  main;