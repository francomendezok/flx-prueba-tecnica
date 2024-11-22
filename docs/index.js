/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  // Tu solución acá  
  return str.split('').reverse().join('')
  // join porque queda en un array
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  // Tu solución acá
  let aux = str.split('').reverse().join('')
  return aux === str ? true : false
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
  // Tu solución acá
  let num1 = 0
  let num2 = 0
  let aux = [] // para devolver ordenado los numeros // 
  arr.sort((a,b) => a - b)
  let dif = arr[arr.length - 1] - arr[arr.length - 2]
  

  for (let i = arr.length - 1; i > 0; i--) {
    num1 = arr[i]
    num2 = arr[i - 1]
    
    
    if (dif >= num1 - num2) {
      dif = num1 - num2
      aux[0] = num2
      aux[1] = num1
    }
  }
  return aux
}


/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  // Tu solución acá
  constructor (num1, num2) {
    this.num1 = num1
    this.num2 = num2
    this.lastResult = null
  }

  add(num1, num2) {
    this.lastResult = num1 + num2
    return this.lastResult
  }

  subtract(num1,num2) {
    this.lastResult = num1 - num2
    return this.lastResult
  }

  multiply(num1,num2) {
    this.lastResult = num1 * num2
    return this.lastResult
  }

  divide(num1,num2) {
    if (num2 === 0) {
      throw new Error("Error: Division by zero is not allowed") // no se divide por 0 // 
    }
    this.lastResult = num1 / num2
    return this.lastResult
  }

  getLastResult() {
    return this.lastResult
  }
}

Calculator.prototype.exponentiate = function (base, exponent) {
  if (exponent < 0) {
    throw new Error("Exponentiation with negative exponent is not allowed")
  }
  
  this.lastResult = Math.pow(base, exponent) // eleva la base a la potencia del exponente // 
  return this.lastResult
}

module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
}