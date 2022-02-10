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

        let course = db.courses.find(course => course.slug === slug)
        if(!course) {
            res.satutus(400).json({
                ok: false,
                message: "invalid course"
            })
            return
        }

        
        res.status(200).json({
            ok: true,
            message: "kurs topildi",
            course
        })
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
        let dbPath = path.join(__dirname, "..", "modules", "db.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)

        
        let slug = slugify(req.params.slug, {remove: /[*+~.()'"!:@]/g,lower: true, replacement: "_"})
        let course = db.courses.find(course => course.slug === slug) 

        if(!course) {
            res.status(400).json({
                ok: false,
                message:"Invalid course"
            })
            return
        }

        course = { ...course, ...req.body }
        let courseIndex = db.courses.findIndex(course => course.slug === slug)

        if(req.body.course_name) {
            course.slug = slugify(req.body.course_name, {remove: /[*+~.()'"!:@]/g,lower: true, replacement: "_"})
        }
        db.courses[courseIndex] = course

        res.status(200).json({
            ok: true,
            message: "kurs o'zgartirildi",
            course
        })
    }
    static async CourseDELETE(req, res) {
        let dbPath = path.join(__dirname, "..", "modules", "db.json")
        let db = await fs.readFile(dbPath, "utf-8")
        db = await JSON.parse(db)
        
        
        let slug = slugify(req.params.slug, {remove: /[*+~.()'"!:@]/g,lower: true, replacement: "_"})
        let course = db.courses.find(course => course.slug === slug) 

        if(!course) {
            res.status(400).json({
                ok: false,
                message:"Invalid course"
            })
            return
        }

       
        let courseIndex = db.courses.findIndex(course => course.slug === slug)
        db.courses.splice(courseIndex, 1)
        await fs.writeFile(dbPath, JSON.stringify(db))

        res.status(200).json({
            ok: true,
            message: "kurs o'chirildi",
            courses: db.courses
        })
    }
}
// CoursesGET - kurslarni chiqaradi - done
// CourseGET - ma'lum kursni chiqaradi - done
// CoursePOST - kurs qo'shadi - done
// CoursePATCH - kursga o'zgartirishlar kiritiladi - done
// CourseDELETE - kursni o'chirib tashlaydi - done
