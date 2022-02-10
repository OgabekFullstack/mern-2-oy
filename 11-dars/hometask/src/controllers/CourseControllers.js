const path = require("path")
const fs = require("fs").promises
const slugify = require("slugify")

module.exports = class CourseController {
    static async CoursesGET(req, res) {
        let dbPath = path.join(__dirname, "..", "modules", "db.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = JSON.parse(db)
        let courses = db.courses
        res.status(200).json({
            ok: true,
            courses
        })
    }
    static async CourseGET(req, res) {
        let {slug} = req.params

        let dbPath = path.join(__dirname, "..", "modules", "db.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = JSON.parse(db) 
        db.courses.find(el => el)
    }
    static async CoursePOST(req, res) {
        let { course_name, course_author, course_price, course_duration, students_enrolled, keywords } = req.body

        let dbPath = path.join(__dirname, "..", "modules", "db.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)

        let slug = slugify(course_name, {remove: /[*+~.()'"!:@]/g,lower: true, replacement: "_"})
        
        let course = db.courses.find(course => course.slug === slug)

        if(course) {
            res.status(200).json({
                ok: false, 
                message: "Course already exists"
            })
            return
        }

        let addCourse = {
            id: db.courses.length + 1,
            course_name,
            course_author,
            course_price,
            course_duration,
            students_enrolled,
            keywords,
            slug
        }

        db.courses.push(addCourse)
        await fs.writeFile(dbPath, JSON.stringify(db))

        res.status(200).json({
            ok: true,
            message: "Create course",
            addCourse
        })
    }
    static async CoursePATCH(req, res) {

    }
    static async CourseDELETE(req, res) {

    }
}
// CoursesGET - kurslarni chiqaradi - done
// CourseGET - ma'lum kursni chiqaradi
// CoursePOST - kurs qo'shadi - done
// CoursePATCH - kursga o'zgartirishlar kiritiladi
// CourseDELETE - kursni o'chirib tashlaydi
