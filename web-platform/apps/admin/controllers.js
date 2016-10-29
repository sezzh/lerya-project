const express = require('express')
const passport = require('passport')
const authMiddlewares = require('authentication/middlewares')

var router = express.Router()

router.get('/', authMiddlewares.ensureAuthAdmin, (req, res) => {
  res.render(
    'admin/hello',
    {
      title: 'titulo',
      contenido: 'holii',
      img: {
        bebish: 'enla ventana'
      }
    }
  )
})

router.get('/login', (req, res) => {
  // handle the error generated by the LocalStrategy
  if (req.flash().error) {
    res.status(401).send(req.flash())
  } else {
    res.render('admin/login', { csrfToken: req.csrfToken() })
  }
})

router.post(
'/login',
passport.authenticate(
  'local',
  { failureRedirect: '/admin/login', failureFlash: true }
),
(req, res) => {
  res.send('done')
})

module.exports = router
