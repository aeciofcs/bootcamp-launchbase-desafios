module.exports = {
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
    }
}