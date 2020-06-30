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
    }
}