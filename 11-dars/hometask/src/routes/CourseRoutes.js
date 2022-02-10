const { CoursesGET, CoursePOST, CoursePATCH, CourseDELETE, CourseGET } = require("../controllers/CourseControllers")

const router = require("express").Router()

router.get("/courses", CoursesGET)
router.get("/courses/:slug", CourseGET)
router.post("/courses", CoursePOST)
router.patch("/courses/:slug", CoursePATCH)
router.delete("/courses/:slug", CourseDELETE)

module.exports = {
    path: "/api",
    router
}