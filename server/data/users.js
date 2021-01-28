const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Summer',
    email: 'summer@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Henry',
    email: 'henry@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

module.exports = users
