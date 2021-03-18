const router = require('express').Router();

// importamos los routes
const homeRoute = require('./toneAnalyzer');

// paths con su propio route
router.use('/', homeRoute);

// path con retorno directo
router.use('/', (req, res) => 
{ 
    //res.render('/toneAnalyzer'); 
}
)

module.exports = router;