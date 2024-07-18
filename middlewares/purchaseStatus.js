const { Op } = require('sequelize');
const { UserCourse } = require('../models')
const isPurchase = async (req, res, next) => {
    if (!req.session.user) return res.redirect('/login?message=you need login to get the access');
    const UserId = +req.session.user.id;
    const CourseId = +req.params.id;
    console.log(UserId, CourseId)
    const data = await UserCourse.findOne({
        where: {
            [Op.and]: [{UserId: UserId}, {CourseId: CourseId}]
        }
    })
    if (data) return next();
    res.redirect(`/purchase/${UserId}/${CourseId}?message=maaf anda belum membeli kelas, silakan membeli kelas terlebih dahulu`)
}

module.exports = { isPurchase };