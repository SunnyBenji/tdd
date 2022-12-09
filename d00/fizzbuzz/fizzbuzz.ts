export const fizzBuzz = (n: number): string => {
    let result: string = "";
    const numberString: string = n.toString();
    for (let i: number = 0; i < numberString.length; i++ ) {
        if (numberString[i] === "3") result += "FIZZ";
        if (numberString[i] === "5") result += "BUZZ";
    }
    if (!(n%3)) result += "FIZZ";
    if (!(n%5)) result += "BUZZ";
    return result || numberString;
}

export const sum = (s: string): number => {

    let sum = s
    let delimiter = ','
    const pattern = /^\/\/(\[[^\]]*\])+\n/;
    if(!s) return 0;
    if (pattern.test(s)) {
        delimiter = pattern.exec(sum)[0]
        let delimiterArray = delimiter.match(/\[([^\]]*)\]/g)
        console.log()
        // console.log(delimiter.split(/(\[[^\]]*\])/g))
        sum = s.replace(pattern, '')
    }
    let stringSplit = sum.split(delimiter);
    let numberArray = stringSplit !== null ? stringSplit.map(str => parseInt(str, 10)) : [];
    let endPattern = new RegExp(`[0-9\n${delimiter}]`, "g")
    let forbiddenCharacter = sum.replace(endPattern, "")
    if (forbiddenCharacter.length > 0 && unrepeated(forbiddenCharacter.toLocaleLowerCase()) != "-") throw new Error("You can't pass forbidden characters "+ unrepeated(forbiddenCharacter.toLocaleLowerCase()))
    if(numberArray.length > 0) return returnSum(numberArray);
    return 0;
}

function returnSum(numberArray: Array<number>) : number {
    let result : number = 0;
    let negativeNumber: Array<number> = []
    for(let i: number = 0; i < numberArray.length; i++) {
        if (isNegative(numberArray[i])) negativeNumber.push(numberArray[i])
        else if (isInferiorToThousand(numberArray[i])) result += numberArray[i];
    }
    if (negativeNumber.length > 0) throw new Error("You can't pass negative number " + negativeNumber)
    else return result;
}

function isNegative(number: number) : boolean {
    return number < 0;
}

function isInferiorToThousand(number: number): boolean {
    return number <= 1000;
}

function unrepeated(str : string): string{
    // @ts-ignore
    return [...new Set(str)].join('');
}


