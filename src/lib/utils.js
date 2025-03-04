module.exports = {
    
    age(timestamp) {

       const today = new Date() 
       const birthDate = new Date(timestamp)

       let age = today.getFullYear() - birthDate.getFullYear()
       const month = today.getMonth() -  birthDate.getMonth()

       if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
           age = age - 1 
       }
       
       return age

    },

    graduation(option) {

        if (option == 1 ) {
            return "Ensino médio completo"
        } else if (option == 2 ) {
            return "Ensino superior Completo"
        } else if ( option == 3) {
            return "Mestrado, doutorado"
        } else {
            return "Graduação em programaçao"
        }

    }, 

    date(timestamp) {

        const date = new Date(timestamp)

        const year =  date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${year}-${month}`,
            format: `${day}/${month}/${year}`
        }
    },
}



