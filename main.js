const display = document.querySelector(`.calculator-screen`);
const keys = document.querySelector(`.calculator-keys`);

let displayValue = `0`;
let firstValue=null;
let operator=null;
let weitingForSecondValue= false;


updateDisplay();

function updateDisplay(){
    display.value=displayValue;
}

keys.addEventListener(`click`,function(e){
    const element = e.target;
    const value = element.value;

    if(!element.matches(`button`)) return;

    switch(value){
        case `+`:
        case `-`:
        case `*`:
        case `/`:
        case `=`:
            handelOperotor(value);
            break;
        case `.`:
            inputDesimal();
            break;
        case `all-clear`:
            allClear();
            break;
        default:
            inputNumber(element.value);
    }

    updateDisplay();
    // swtich case kullandık bunun yerine ; 

    // if(element.classList.contains(`operator`)){
    //     // console.log(`operator`,element.value)
    //     handelOperotor(element.value);
    //     updateDisplay();
    //     return;
    //}

    // input desimal için switch casede yaptık ; 

    // if(element.classList.contains(`decimal`)){
    //     // console.log(`decimal`,element.value)
    //     inputDesimal();
    //     updateDisplay();
    //     return;
    // }

    // all clear için switch-case kullandık;

    // if(element.classList.contains(`all-clear`)){
    //     // console.log(`all-clear`,element.value)
    //     allClear();
    //     updateDisplay();
    //     return;
    // }


    // console.log(`number`, element.value);

});

function handelOperotor(nextOperotor){
    const value=parseFloat(displayValue);

    if(operator && weitingForSecondValue){
        operator = nextOperotor;
        return
    }

    if(firstValue === null){
        firstValue=value;
    } else if (operator){
        const result = calculate(firstValue,value,operator);
        displayValue=`${parseFloat(result.toFixed(7))}`;
        firstValue=result;
    }
    weitingForSecondValue=true;
    operator=nextOperotor  ; 
}
// matematiksel işlemler için ;
function calculate(first, second, operator){
    if ( operator === `+`){
        return first + second ;
    }else if ( operator === `-`){
        return first - second ;
    }else if ( operator === `*`){
        return first * second ;
    }else if ( operator === `/`){
        return first / second ;
    }

    return second ;
}

function inputNumber(num){
    if (weitingForSecondValue) {
        displayValue = num ;
        weitingForSecondValue = false ;
    }else {
        displayValue = displayValue === `0`? num: displayValue + num ;
    }
    
}

function inputDesimal(){
    if(!displayValue.includes(`.`)){
        displayValue += `.`;
    }
    
}

function allClear(){
    displayValue=`0`;
}

