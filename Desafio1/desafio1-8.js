/*

    ### OPERAÇÕES BANCARIAS ###
    
    Crie um programa para realizar operações bancárias na conta de um usuário.
    Comece criando um objeto com o nome do usuário, suas transações e saldo.
    As transações (transactions) devem iniciar como um array vazio [] e o saldo (balance) em 0 (zero).
        const user = {
            name: "Mariana",
            transactions: [],
            balance: 0
        };    
*/
const user = {
    name: "Aecio",
    transactions: [],
    balance: 0
};

/*
    ### ADICIONAR TRANSAÇÕES 
    Crie uma função createTransaction para adicionar uma nova transação no array de transações de um usuário, essa função 
    deve receber como parâmetro um objeto de transação que tem o seguinte formato:
        {
            type: 'credit',
            value: 50.5
        }
    O type pode ser credit para créditos e debit para débitos da conta do usuário.
    Quanto uma transação for do tipo credit ela deve também somar o valor do crédito no saldo (balance) do usuário.
    Se for uma transação do tipo debit ela deve subtrair o valor do débito no saldo (balance) do usuário.
    Dica.: Você pode usar o método user.transactions.push(transaction) para adicionar um novo item no array de transações.
*/

function adjustBalance(transaction){
    if (transaction.type === 'credit'){
        user.balance += transaction.value;
    }
    if (transaction.type === 'debit'){
        user.balance -= transaction.value;
    }
}

function createTransaction(transaction){
    user.transactions.push(transaction);
    adjustBalance(transaction);
}

/* 
   ### Relatórios ###
    
    Crie uma função chamada getHigherTransactionByType que recebe como parâmetro o tipo de transação credit/debit, 
    percorre as transações do usuário e retorna o objeto da transação de maior valor com aquele tipo:
        getHigherTransactionByType("credit"); // { type: 'credit', value: 120 }
    
    Crie uma função chamada getAverageTransactionValue que retorna o valor médio das transações de um usuário 
    independente do seu tipo:
        getAverageTransactionValue(); // 83.3
    
    Crie uma função chamada getTransactionsCount que retorna o número de transações de cada tipo credit/debit, o 
    retorno da função deve ser um objeto e seguir exatamente como o modelo apresentado abaixo:
        getTransactionsCount(); // { credit: 5, debit: 3 }

*/
function getHigherTransactionByType(type) {
    let greaterValue = 0;
    let greaterTransaction = {};
    for (const transaction of user.transactions) {
        if(transaction.type === type ){
            if(transaction.value > greaterValue){                
                greaterTransaction = transaction;
                greaterValue = transaction.value;
            }
        }            
    }
    return console.log('Maior valor de transação:', greaterTransaction );
}

function getAverageTransactionValue(){
    let average = 0;
    let sum = 0;
    for (const transaction of user.transactions) {
        sum += parseFloat(transaction.value)
    }
    average = sum / user.transactions.length;
    return console.log(`Valor médio: ${average}`)
}

function getTransactionsCount(){
    const countTransactions = { credit: 0, debit: 0 };
    for (const transaction of user.transactions) {
        if(transaction.type === 'credit'){
            countTransactions.credit++
        }
        if(transaction.type === 'debit'){
            countTransactions.debit++
        }
    }
    return console.log(`N° de transações de cada tipo:`, countTransactions)
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(`Saldo: ${user.balance}`);

getHigherTransactionByType("credit");
getHigherTransactionByType("debit");

getAverageTransactionValue();

getTransactionsCount();