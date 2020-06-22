/*    
    Cálculo de APOSENTADORIA;
    1. O tempo de contribuição mínimo para Homens é de 35 anos e,  
        para a Mulheres, 30 anos;
    2. Utilizando a regra 85-95, a soma da idade com o tempo de 
        contribuição do homem precisa ser de no mínimo 95 anos, 
        enquanto a mulher precisa ter no mínimo 85 anos na soma.        
 */
const nome = "Silvana";
const sexo = "F";
const idade = 54;
const contribuicao = 30;

const somaRegra = contribuicao + idade;

if ( (sexo === "M" && contribuicao >= 35 && somaRegra >= 95 ) || 
     (sexo === "F" && contribuicao >= 30 && somaRegra >= 85) ) {
    console.log(`${nome}, você pode se aposentar! `);
}else{
    console.log(`${nome}, você ainda NÃO pode se aposentar! `);
}