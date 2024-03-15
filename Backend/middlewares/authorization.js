
async function adminAuthorization(req, res, next) {
    try {
        const { id } = req.params
        const user = req.login

        if(user.role === 'Admin') {
            next()
        } else {
            throw { name: 'ForbiddenAccess' }
        }


    } catch(err) {
        console.log(err);
        next(err)
    }
}

module.exports = adminAuthorization