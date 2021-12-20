const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup =(req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur cree '}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    
};

exports.login =(req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(user =>{ 
        if(!user){
            return res.status(401).json({ error: 'utilisateur non trouve'});
        }

        console.log("Hello")
        
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            console.log(valid)
            // if(!valid){
            //     console.log("mot de passe invalide")
            //     return res.status(401).json({ error: 'Mot de passe invalide !'});
            // }
            res.status(201).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({ error }));

    })
    .catch(error => res.status(500).json({ error }));
};