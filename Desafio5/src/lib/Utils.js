module.exports = {
    graduation: (schooling) => {
        switch (schooling) {
            case 'medium':
                return 'Ensino Médio Completo'
            case 'higher':
                return 'Ensino Superior Completo'
            case 'masters':
                return 'Mestrado'
            case 'doctorate_degree':
                return 'Doutorado'
            default:
                return 'NOT FOUND'
        }
    },
    age: (timestamp) => {
        const today = new Date()
        const birth = new Date(timestamp)        
        
        let age     = today.getUTCFullYear() - birth.getUTCFullYear()
        const month = today.getUTCMonth() - birth.getUTCMonth()
        
        if ( (month < 0) || 
             (month == 0 && today.getUTCDate() <= birth.getUTCDate()) ){
            age = age - 1
        }
        return age
    },
    date: (timestamp) => {
        const newDate = new Date(timestamp)
        const month   = `0${newDate.getUTCMonth() + 1}`.slice(-2)
        const day     = `0${newDate.getUTCDate()}`.slice(-2)
        
        return {
            day: day,
            month: month,
            year: newDate.getUTCFullYear(),
            iso: `${newDate.getUTCFullYear()}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    grade: (school_year) => {
        switch (school_year) {
            case '5f':
                return '5° Ano do Ensino Fundamental'
            case '6f':
                return '6° Ano do Ensino Fundamental'
            case '7f':
                return '7° Ano do Ensino Fundamental'
            case '8f':
                return '8° Ano do Ensino Fundamental'
            case '9f':
                return '9° Ano do Ensino Fundamental'
            case '1m':
                return '1° Ano do Ensino Médio'
            case '2m':
                return '2° Ano do Ensino Médio'
            case '3m':
                return '3° Ano do Ensino Médio'
            default:
                return 'NOT FOUND'
        }
    }
}