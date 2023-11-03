//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return (n | 0) === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let result = []
    for(let i = 1;i<=10;i++) result.push(i*2);
    return result;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0
    for(let i=1;i<=n;i++) sum+=i;
    return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if(n==0 || n==1) return n;
    return recSumTo(n-1)+n;
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let result = 1;
    for(let i = n;i>1;i-=1) result*=i;
    return result;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    let checkValue = 1;
    while(true){
        if(checkValue==n) return true;
        else if(checkValue>n) return false;
        checkValue*=2;
    }
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if(n==1) return 1;
    n-=2;
    let fibPrev = 1;
    let fib = 1;
    for(let i = 0;i<n;i++){
        let buffer = fib;
        fib+=fibPrev;
        fibPrev = buffer;
    }
    return fib;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */

function getOperationFn(initialValue, operationFn = () => initialValue) {
    return (value) => {
        initialValue = operationFn(initialValue, value)
        return initialValue
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start=0, step=1) {
    start-=step;
    return ()=>{
        start+=step;
        return start;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if(typeof firstObject != typeof secondObject) return false;
    if(typeof firstObject != 'object'){
        if(Number.isNaN(firstObject) && Number.isNaN(secondObject)) return true;
        else return firstObject==secondObject;
    } 
    if(firstObject==null || secondObject==null) return firstObject==null && secondObject==null;
    if(Object.keys(firstObject).length!=Object.keys(secondObject).length) return false;
    for(let key in firstObject){
        if(!deepEqual(firstObject[key],secondObject[key])) return false;
    }
    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
