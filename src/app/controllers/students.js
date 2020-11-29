const { age, graduation, date } = require('../../lib/utils')

const Student = require('../models/student')


module.exports = {

    index(req, res) {

        let { filter, page, limit } = req.query 

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)
        
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                
                return res.render("students/index", { students, pagination ,filter })
            }
        }
        Student.paginate(params)
    },

    create(req, res) {
        Student.teachersSelectOptions((options) => {
            return res.render("students/create", { teacherOptions: options })
        }) 
    },

    post(req, res) {
        const keys = Object.keys(req.body)  

        for(key of keys) {
            if (req.body[key] == "") {
                
                return res.send("por favor prencha os campos")
            }
        }
        
        Student.create(req.body, (student) => {
            return res.redirect(`students/${student.id}`)
        })
    },

    show(req, res) {
        Student.find(req.params.id, (student) => {
            if(!student) return res.send("student not found")
            student.age = age(student.birth_date)
            student.services = student.services.split(",")
            student.created_at = date(student.created_at).format
            student.graduation = graduation(student.option)
            return res.render("students/show", { student })
        })  
    },

    edit(req, res) {
        Student.find(req.params.id, (student) => {

            if(!student) return res.send("student not found")
            student.birth_date = date(student.birth_date).iso

            Student.teachersSelectOptions(function(options){
                return res.render("students/edit", { student, teacherOptions: options })
            }) 

            
        })
    },

    put(req, res) {

        const keys = Object.keys(req.body) 

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor prencha os campos")
            }
        }

        Student.update(req.body, () => {
            return res.redirect(`/students/${req.body.id}`)
        })
      
    },

    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect(`/students`)
        })
    }
}
