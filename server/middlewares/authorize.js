const Article = require('../models/Article')

function authorize(req, res, next){
  
  Article
    .findOne({
      _id: req.params.id
    })
    .then(article => {
      if(article.author.toString() == req.user.id.toString()){
        next()
      } else{
        res
          .status(401)
          .json({
            msg: "unauthorized access"
          })
      }
    })
    .catch(err => {
      res
      .status(500)
      .json({
        msg: "internal server error on authorization",
        err
      })
    })
}

module.exports = authorize