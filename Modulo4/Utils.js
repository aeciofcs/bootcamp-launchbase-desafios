module.exports = {
    age: (timestamp) => {
        const today     = new Date()
        const birthDate = new Date(timestamp)

        let age     = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
            age = age - 1
        }

        return age
    },

    formatDate: (timestamp) => {        
        const newDate = new Date(timestamp)
        const month   = `0${ newDate.getUTCMonth() + 1 }`.slice(-2)
        const day     = `0${ newDate.getUTCDate() }`.slice(-2)
        return `${newDate.getUTCFullYear()}-${month}-${day}`
    }

}