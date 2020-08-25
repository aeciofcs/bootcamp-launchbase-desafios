module.exports = {
    formatDate: (timestamp) => {        
        const newDate = new Date(timestamp)
        const month   = `0${ newDate.getUTCMonth() + 1 }`.slice(-2)
        const day     = `0${ newDate.getUTCDate() }`.slice(-2)
        const hour    = newDate.getHours()
        const minutes = newDate.getMinutes()
        return {
            day,
            month,
            year: newDate.getUTCFullYear(),
            hour,
            minutes,
            iso: `${newDate.getUTCFullYear()}-${month}-${day}`,
            dateBirth: `${day}/${month}`,
            format: `${day}/${month}/${newDate.getUTCFullYear()}`
        }
    },

    formatPrice(price){
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    }
}