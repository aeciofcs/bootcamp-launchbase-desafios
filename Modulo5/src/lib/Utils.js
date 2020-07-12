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
        return {
            day,
            month,
            year: newDate.getUTCFullYear(),
            iso: `${newDate.getUTCFullYear()}-${month}-${day}`,
            dateBirth: `${day}/${month}`,
            format: `${day}/${month}/${newDate.getUTCFullYear()}`
        }
    },

    blood: (type) => {
        switch (type) {
            case 'A1':
                return 'A+'
            case 'A0':
                return 'A-'
            case 'B1':
                return 'B+'
            case 'B0':
                return 'B-'
            case 'AB1':
                return 'AB+'
            case 'AB0':
                return 'AB-'
            case 'O1':
                return 'O+'
            case 'O0':
                return 'O-'     
            default:
                return 'inválido'                
        }
    }
}