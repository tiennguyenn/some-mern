const mongoose = require('mongoose')

mongoose.connect('mongodb://root:root@0.0.0.0:27017/admin', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'xxxxx'))

db.on('open', () => {
  console.log('okkkkkk')

  const Cat = mongoose.model('Cat', {name: String})
  const kitty = new Cat({name: "Kitty"})
  
  kitty.save().then(() => console.log('mewo'))
})
