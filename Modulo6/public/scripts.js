const input = document.querySelector('input[name="price"]')
input.addEventListener( "keydown", (event) => {
    setTimeout( () => {
        let { value } = event.target
        value = value.replace(/\D/g, "")
        event.target.value = value
    }, 1 )
    
} )