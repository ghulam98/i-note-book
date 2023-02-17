const express = require('express');
const router = express.Router();

router.get('/',(req, resp)=>{

    obj = {
        "name": "Ghulam form notes",
        "age": 29
    }
    resp.json(obj)

})

module.exports = router



