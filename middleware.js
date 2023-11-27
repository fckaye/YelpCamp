module.exports.returnTo = (req,res,next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        // store the url that the user was trying to go to
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect(303, '/login');
    }
    next();
}