const { age, graduation, date } = require('../../lib/utils')

const teacher = require('../models/teacher')

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
            callback(teachers) {

                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }
                
                return res.render("teachers/index", { teachers, pagination ,filter })
            }
        }
        teacher.paginate(params) 
    },

    create(req, res) {
        return res.render("teachers/create")
    },

    post(req, res) { 
        const keys = Object.keys(req.body)  

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor prencha os campos")
            }
        }
        
        teacher.create(req.body, (teacher) => {
            return res.redirect(`teachers/${teacher.id}`)
        })
    },

    show(req, res) {
        teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send("Teacher not found")

            teacher.age = age(teacher.birth_date)
            teacher.services = teacher.services.split(",")
            teacher.created_at = date(teacher.created_at).format
            teacher.graduation = graduation(teacher.option)

            return res.render("teachers/show", { teacher })
        })  
     },

    edit(req, res) {
        teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send("Teacher not found")

            teacher.birth_date = date(teacher.birth_date)
            teacher.services = teacher.services.split(",")
            teacher.created_at = date(teacher.created_at).format
            teacher.graduation = graduation(teacher.option)

            return res.render("teachers/edit", { teacher })
        })
    },

    put(req, res) {

        const keys = Object.keys(req.body) 

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor prencha os campos")
            }
        }

        teacher.update(req.body, () => {
            return res.redirect(`/teachers/${req.body.id}`)
        })
      
    },

    delete(req, res) {
        teacher.delete(req.body.id, () => {
            return res.redirect(`/teachers`)
        })
    }
}
