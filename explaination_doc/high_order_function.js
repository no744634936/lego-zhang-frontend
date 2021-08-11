
//high order function 可以接收函数为参数，或则返回值为函数的函数。


//1，接收函数为参数
const giveAccessTo = (name) =>{
    return 'Access Granted to ' + name;
}
  

function authenticate(person) {
  const array = [];
  // you can add checks here for person.level
  for (let i = 0; i < 50000; i++) {
    array.push(i)
  }
  return giveAccessTo(person.name)
}

function letPerson(person, fn) { 
//  We now tell the function what data to use when we call it not when we define it + tell it what to do.
  if (person.level === 'admin') {
    return fn(person)
  } else if (person.level === 'user') {
    return fn(person)
  }
}

function sing(person) {
  return 'la la la my name is ' + person.name
}

const result=letPerson({level: 'user', name: 'Tim'}, sing)

const result2=letPerson({level: 'user', name: 'Tim'}, authenticate)
console.log(result);
console.log(result2);





// //2，返回值为函数
const multiplyBy = (num1) => {
    return (num2)=>{
      return num1 * num2;
    }
  }
  
const multiplyByTwo = multiplyBy(2);
const num=multiplyByTwo(4)
console.log(num);    //8


const multiplyByTen=multiplyBy(10);
const  num2=multiplyByTen(3)
console.log(num2);   //30
