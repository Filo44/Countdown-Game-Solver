//*Symbol Conversion dictionary
const symConv = { "Multiplication": "*", "Subtraction": "-", "Addition": "+", "Division": "/" }
//*Target integer
const target = 405
//*Numbers array
let numbers = [1, 2, 3, 4, 100]
//*Visited 2d array
let visited = []
//*Methods
var methods = []


//* Recursive function
//Params:
//Actives:array. Passes through the numbers as parameter actives. 
//Operations
//Depth, debug tool

function helper(actives, operations, depth) {
    // console.log("----------")
    // console.log(depth + ":")
    // console.log(actives)
    // console.log(structuredClone(actives))
    //* Checks if in the active array there is the aim number
    //* Checks if this active array has already been visited
    if (actives.includes(target)) {
        // console.log(operations)
        methods.push(operations)
        // console.log("Done!!!")
        return;
    }
    if (subArrayCheck(visited, actives)) {
        return;
    }
    //* append the active array to the visited array
    // !Uncomment after
    visited.push(actives)
    //* Loop over all possible number combinations in the actives array
    for (let i = 0; i < actives.length; i++) {
        let firstEl = actives[i]
        for (let j = i + 1; j < actives.length; j++) {
            //* For each two numbers call the recursive function if:
            let secondEl = actives[j]
            //Addition, always
            if (true) {
                let newActives = structuredClone(actives);
                let newOperations = structuredClone(operations);
                let product = firstEl + secondEl
                // console.log("Addition")
                // console.log("First El: " + firstEl)
                // console.log("Second El: " + secondEl)
                // console.log("Product: " + product)
                // console.log("Initial Actives:" + newActives)
                newActives.splice(i, 1);
                newActives.splice(j - 1, 1);
                newActives.push(product)
                newOperations.push({ type: "Addition", firstEl: firstEl, secondEl: secondEl, product: product, nowActives: "[" + newActives.toString() + "]" })
                // console.log("End:" + newActives)
                helper(newActives, newOperations, depth + 1)
            }
            //Multiplication, always
            if (true) {
                let newActives = structuredClone(actives);
                let newOperations = structuredClone(operations);
                let product = firstEl * secondEl
                // console.log("Multiplication")
                // console.log("First El: " + firstEl)
                // console.log("Second El: " + secondEl)
                // console.log("Product: " + product)
                // console.log("Initial Actives:" + newActives)
                newActives.splice(i, 1);
                newActives.splice(j - 1, 1);
                newActives.push(product)
                newOperations.push({ type: "Multiplication", firstEl: firstEl, secondEl: secondEl, product: product, nowActives: "[" + newActives.toString() + "]" })
                // console.log("End:" + newActives)
                helper(newActives, newOperations, depth + 1)
            }
            //Subtraction, doesn't go negative
            if (firstEl > secondEl) {
                let newActives = structuredClone(actives);
                let newOperations = structuredClone(operations);
                let product = firstEl - secondEl
                // console.log("Subtraction")
                // console.log("First El: " + firstEl)
                // console.log("Second El: " + secondEl)
                // console.log("Product: " + product)
                // console.log("Initial Actives:" + newActives)
                newActives.splice(i, 1);
                newActives.splice(j - 1, 1);
                newActives.push(product)
                newOperations.push({ type: "Subtraction", firstEl: firstEl, secondEl: secondEl, product: product, nowActives: "[" + newActives.toString() + "]" })
                // console.log("End:" + newActives)
                helper(newActives, newOperations, depth + 1)
            }
            //Division, if it will be a fraction
            if (isInteger(firstEl / secondEl)) {
                let newActives = structuredClone(actives);
                let newOperations = structuredClone(operations);
                let product = firstEl / secondEl
                // console.log("Division")
                // console.log("First El: " + firstEl)
                // console.log("Second El: " + secondEl)
                // console.log("Product: " + product)
                // console.log("Initial Actives:" + newActives)
                newActives.splice(i, 1);
                newActives.splice(j - 1, 1);
                newActives.push(product)
                newOperations.push({ type: "Division", firstEl: firstEl, secondEl: secondEl, product: product, nowActives: "[" + newActives.toString() + "]" })
                // console.log("End:" + newActives)
                helper(newActives, newOperations, depth + 1)
            }
        }
    }
    return;
}

//* Function which checks if number is a fraction
function isInteger(num) {
    return Number.isInteger(num)
}

//* Array in subarray function, why can't js have this natively. I have programmed this too many times
function subArrayCheck(motherArray, targetArray) {
    return motherArray.some(arrayToCheck => {
        if (arrayToCheck == targetArray) {
            return true
        }
    })
}

//*Function which parses methods and converts to human readable string
function methodParse(tpMethods) {
    let r = tpMethods.map(method => {
        let operationString = method.map(({ type, firstEl, secondEl, product, nowActives }) => {
            return (firstEl + " " + symConv[type] + " " + secondEl + " = " + product)
        }).join("\n")
        let r2 = "---------\n" + operationString
        return r2;
    }).join("\n")
    return r
}

//*Calls recursive function
helper(numbers, [], 0)
// console.log(methods)
console.log(methodParse(methods))