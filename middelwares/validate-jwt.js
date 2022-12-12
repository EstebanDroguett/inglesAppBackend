//------------------------------------------------------------------------------------11----------------------------------------------------------------------------------
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    if( !req.headers['authorization'] ){
        return res.status(401).json({
          message:'Authorization header not present',
          error: 'Authorization'
        });
      }
    
      const authorizationHeader = req.headers['authorization'];
      const [type, accessToken] = authorizationHeader.split(' ');
    
      if( type !== 'Bearer' ){
        return res.status(401).json({
          message:'Wrong Authorization header type given',
          error: 'Authorization'
        });
      }
    
      if( !accessToken ){
        return res.status(401).json({
          message:'Access token not present',
          error: 'Authorization'
        })
      }
    try {
        const { _id, name } = jwt.verify(
            accessToken,
            process.env.SECRET_JWT_SEED
        );

        req._id = _id;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();

}

module.exports = {
    validateJWT
}
//------------------------------------------------------------------------------------11----------------------------------------------------------------------------------