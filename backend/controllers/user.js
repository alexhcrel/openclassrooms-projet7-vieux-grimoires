const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
.then(hash => {
    const user = new User({
        email: req.body.email,
        password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: 'utilisateur créé'}))
    .catch(error => res.status(400).json({message: 'utilisateur non créé' }));
})
.catch(error => res.status(500).json({error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    } else {
                    const expiresIn = '2m'; // Durée de validité du token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn }
                        )
                    });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        };
        })
        .catch(error => res.status(500).json({ error }));
 };