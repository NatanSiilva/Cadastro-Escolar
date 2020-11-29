const { age, graduation, date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {

    all(callback){
        db.query(`SELECT * FROM students ORDER BY name DESC`, (err, results) => {
            if(err) throw `DataBase error! ${err}`
            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                email,
                gender,
                birth_date,
                services,
                created_at,
                option,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth_date).iso,
            data.services,
            date(Date.now()).iso,
            date.option,
            data.teacher
        ]
        
        
        db.query(query, values, (err, results) => {
            if(err) throw `DataBase error! ${err}`
            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`, [id], (err, results) => {
            if(err) throw `DataBase error! ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE students SET
            name=($1),
            avatar_url=($2),
            email=($3),
            gender=($4),
            birth_date=($5),
            services=($6),
            option=($7),
            teacher_id=($8)
        WHERE id = $9
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth_date).iso,
            data.services,
            data.option,
            data.teacher,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `DataBase error! ${err}`
            callback()
        })
    },

    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
            if(err) throw `DataBase error! ${err}`
            return callback()
        })
    },

    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, (err, results) => {
            if(err) throw `DataBase error! ${err}`
            callback(results.rows)
        })
    },

    paginate(params) {

        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM students
            ) AS total`

        

        if(filter) {

            filterQuery = `
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM students 
                ${filterQuery}
            )`
        }

        query = `
            SELECT students.*, ${totalQuery}
            FROM students
            ${filterQuery} 
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (err, results) => {

            if(err) throw `DataBase error! ${err}`
            callback(results.rows)
        })
    }
}