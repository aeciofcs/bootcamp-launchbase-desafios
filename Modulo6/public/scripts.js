const input = document.querySelector('input[name="price"]')
input.addEventListener( "keydown", (event) => {
    setTimeout( () => {
        let { value } = event.target
        value = value.replace(/\D/g, "")
        value = new Intl.NumberFormat('pt-BR', {
            style: 'currency', 
            currency: 'BRL'
        }).format(value/100)
        event.target.value = value
    }, 1 )

} )