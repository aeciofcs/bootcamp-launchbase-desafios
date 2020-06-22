/*    
    Cálculo de IMC
 */
const nome = "Aecio";
const peso = 85;
const altura = 1.69;

const imc = peso / (altura * altura);

if (imc >= 30){
    console.log(`${nome} você está acima do peso; Seu IMC é ${imc.toFixed(2)}`);
}else{
    console.log(`${nome} você não está acima do peso; Seu IMC é ${imc.toFixed(2)}`);
}