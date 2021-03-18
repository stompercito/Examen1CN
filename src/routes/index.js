const router = require('express').Router();

// importamos los routes
const homeRoute = require('./toneAnalyzer');

// paths con su propio route
router.use('/toneAnalyzer', homeRoute);

// path con retorno directo
router.use('/', (req, res) => 
{ 
    res.json(
        { 
            version: "1",
            msg: "Welcome, Welcome. To use the web app you need to go the route that you need",
            paths: [
                "/toneAnalyzer"
            ] 
        }
        ); 
}
)

module.exports = router;