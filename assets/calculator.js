const slctElem = (s) => document.querySelector(s);
const slctElems = (s) => document.querySelectorAll(s);


let field = slctElem('#field');
let numbers = slctElems('.num');
let operators = slctElems('.op');
let dot = slctElem('#dot');


//controls btn
let del = slctElem('#del');
let clear = slctElems('#clr');
let equal = slctElem('#equal');

function writeIntoField(e){
  field.value += e.target.textContent;
}
function MakeDisabledOrEnabled(val){
  operators.forEach(op=>{
    if(val){
      op.setAttribute('disabled', true);
    } else{
      op.removeAttribute('disabled');
    }
  })
}

numbers.forEach(num=>{
  num.onclick = (e)=>{
    MakeDisabledOrEnabled(false);
    writeIntoField(e)
  };
});

operators.forEach(op=>{
  op.onclick = (e) => {
    MakeDisabledOrEnabled(true);
    writeIntoField(e);
    dot.removeAttribute('disabled')
  };
});

dot.onclick = function (e) {
  writeIntoField(e);
  MakeDisabledOrEnabled(true);
  e.target.setAttribute('disabled', true);
}


// delete btn
del.onclick =  function () {
  let leftVal = field
              .value
              .split('')
              .splice(0, field.value.length-1)
              .join('');
  field.value = leftVal;
  if(leftVal.length){
    if(!leftVal.split('')[leftVal.length-1].match(/\/|\*|\-|\+|\%/) ){
      MakeDisabledOrEnabled(false);
      dot.setAttribute('disabled', true)

    } else{
      MakeDisabledOrEnabled(true);
      dot.removeAttribute('disabled')
    }
  } else{
    MakeDisabledOrEnabled(true);
    dot.removeAttribute('disabled');
    slctElem('#subtract').removeAttribute('disabled');
  }
};

//clear btn
clr.addEventListener('click', function () {
  field.value = '';
  MakeDisabledOrEnabled(true);
  dot.removeAttribute('disabled');
  slctElem('#subtract').removeAttribute('disabled')
});


// equal btn
equal.addEventListener('click', ()=>{
  if(field.value.length){
    field.value = eval(field.value);
  }
});

// keyboard
let numsKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let opsKeys = ['+', '-', '/', '*'];
window.onkeyup = function (e) {
  if(numsKeys.indexOf(e.key) > -1){
    field.value += e.key;
    MakeDisabledOrEnabled(false);
  }
  else if(opsKeys.indexOf(e.key) > -1){
    if(field.value.length || e.key == '-'){
      if(!subtract.disabled){
        field.value += e.key;
        MakeDisabledOrEnabled(true);
        dot.removeAttribute('disabled')
      }
    }
  } else if (e.keyCode === 8) {
    del.click();
  } else if (e.keyCode === 46){
    clr.click();
  }else if (e.key === '.'){
    if(!dot.disabled){
      field.value += e.key;
      dot.setAttribute('disabled', true);
    }
    MakeDisabledOrEnabled(true);
  }
  if(e.keyCode === 13){
    equal.click();
  }
}
