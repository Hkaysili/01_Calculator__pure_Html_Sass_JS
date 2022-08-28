const numberKey =  document.querySelectorAll('.numberKey');
const operatorKey = document.querySelectorAll('.operatorKey');
const calc = document.getElementById('calc');
const result = document.getElementById('result');
const clearAllKey = document.getElementById('clearAll');
const backSpaceKey = document.getElementById('backSpace');
const equalKey = document.getElementById('equal');
 
let calcResult = "";
let calcArr = [];
let reCalcResult = "";
 

const getNumber = number => {
    calcResult += number;
    calcArr.push(number);
    if(calc.innerHTML === "0"){
        calc.innerHTML = "";
    }
    calc.innerHTML += calcArr[calcArr.length - 1];
    setResult(); 
}

const getOperator = operator => {
    const lastChar = calcResult[calcResult.length - 1];
    if(lastChar !== "%" && lastChar !== "*" && lastChar !== "/" && lastChar !== "+" && lastChar !== "-"){
        calcResult += operator;
        calcArr.push(`<span style="color:#FF3E39; margin:0 5px;">${operator}</span>`);
        calc.innerHTML += calcArr[calcArr.length - 1]; 
    }
}

const setResult = () => {
    if(eval(calcResult) !== Infinity){ 
        result.innerHTML = eval(calcResult) 
    }
    else{
        clearAll();
        alert("Geçersiz İşlem!")
    }
} 

const clearAll = () => {
    calcResult =  "";
    calcArr = [];
    calc.innerHTML = "0";
    result.innerHTML = "0";
}

const backSpace = () => { 
    calcArr.splice(-1, 1);
    calcResult = calcResult.substr(0, calcResult.length - 1); 
    calc.innerHTML = calcArr.join("");
    if (calcResult === "") clearAll();  
}

const getEqual = () => {
    if(eval(calcResult) !== Infinity){ 
        reCalcResult  = eval(calcResult).toString();
        calcArr = [];
        for(i=0; i < reCalcResult.length; i++){
            calcArr.push(reCalcResult.charAt(i))
        }
        calcResult = eval(calcResult);
        calc.innerHTML= eval(calcResult);
    }
    else{
        clearAll();
        alert("Geçersiz İşlem!")
    }
}

numberKey.forEach(el => {
    el.addEventListener('click', (e) => {
        const keyValue = e.target.innerHTML;
        getNumber(keyValue)
    })
})

operatorKey.forEach(el => {
    el.addEventListener('click', (e) => {
        const keyValue = e.target.innerHTML; 
        getOperator(keyValue)
    })
})

clearAllKey.addEventListener('click', clearAll);

backSpaceKey.addEventListener('click', backSpace);

equalKey.addEventListener('click', getEqual);