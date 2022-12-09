import {fizzBuzz,sum} from "./fizzbuzz";

describe('FizzBuzz',() => {
    describe('return number given',() => {
        it('should return "2" when 2 is given ',() => {
            expect(fizzBuzz(2)).toBe('2')
        })
        it.each([
            [1],
            [7],
            [11]
        ])('should return %i when %i is given',(n) => {
            expect(fizzBuzz(n)).toBe(n.toString())
        })
    })

    it('should return FIZZFIZZ when 3 is given ',() => {
        expect(fizzBuzz(3)).toBe('FIZZFIZZ')
    })
    it('should return BUZZBUZZ when 5 is given ',() => {
        expect(fizzBuzz(5)).toBe('BUZZBUZZ')
    })
    it('should return BUZZFIZZBUZZ when 15 is given ',() => {
        expect(fizzBuzz(15)).toBe('BUZZFIZZBUZZ')
    })
    it('should return "FIZZFIZZ" when 36 is given ',() => {
        expect(fizzBuzz(36)).toBe('FIZZFIZZ')
    })
    it('should return "FIZZBUZZFIZZ" when 353 is given ',() => {
        expect(fizzBuzz(353)).toBe('FIZZBUZZFIZZ')
    })
    it.each([
        [10],
        [20],
        [40]
    ])('should return BUZZ when %i is given',(n) => {
        expect(fizzBuzz(n)).toBe('BUZZ')
    })
    it.each([
        [6],
        [9],
        [12]
    ])('should return FIZZ when %i is given',(n) => {
        expect(fizzBuzz(n)).toBe('FIZZ')
    })
    it.each([
        [60],
        [90],
        [120]
    ])('should return FIZZBUZZ when %i is given',(n) => {
        expect(fizzBuzz(n)).toBe('FIZZBUZZ')
    })
    it.each([
        [2,'2'],
        [38,'FIZZ'],
        [76,'76'],
        [29,'29'],
        [3 * 18,'BUZZFIZZ'],
        [5 * 10,'BUZZBUZZ'],
        [15 * 17,'BUZZBUZZFIZZBUZZ'],
        [47589365,'BUZZFIZZBUZZBUZZ']
    ])('should return string when %i is given',(n,expected) => {
        expect(fizzBuzz(n)).toBe(expected)
    })
})

describe('Sum',() => {
    it('should return 3 when 3 is given ',() => {
        expect(sum("32")).toBe(32)
    })
    it('should return 0 when empty string is given ',() => {
        expect(sum("")).toBe(0)
    })
    it('should return 3 when "1,2" is given ',() => {
        expect(sum("1,2")).toBe(3)
    })

    it.each([
        ["2",2],
        ["38",38],
    ])('should return number when %i is given',(n,expected) => {
        expect(sum(n)).toBe(expected)
    })

    it.each([
        ["2,5",7],
        ["3,8",11],
        ["120,800",920],
    ])('should return sum number when %i is given',(n,expected) => {
        expect(sum(n)).toBe(expected)
    })

    it('should return 5 when "1,2,2" is given ',() => {
        expect(sum("1,2,2")).toBe(5)
    })

    it.each([
        ["2,5,0",7],
        ["3,8,18",29],
        ["120,800,1",921],
        ["1,1,1,1,1,1,1,1,1,1,1,1",12],
    ])('should return sum number when %i is given',(n,expected) => {
        expect(sum(n)).toBe(expected)
    })

    it('should return error(You can\'t pass forbidden characters ) when "1\n 2,2" is given ',() => {
        expect(() => sum("1\n 2,2")).toThrow('You can\'t pass forbidden characters ')
    })

    it('should return error(You can\'t pass forbidden characters elizabth ) when "1Elizabeth 2 2" is given ',() => {
        expect(() => sum("1Elizabeth 2 2")).toThrow('You can\'t pass forbidden characters elizabth ')
    })

    it('should return error(You can\'t pass forbidden characters elizabth ) when "Elizabeth',() => {
        expect(() => sum("Elizabeth")).toThrow('You can\'t pass forbidden characters elizabth')
    })

    it('should return error(You can\'t pass forbidden characters elizabth ) when "11Elizabeth2 2" is given ',() => {
        expect(() => sum("11Elizabeth2 2")).toThrow('You can\'t pass forbidden characters elizabth ')
    })

    it('should return error(You can\'t pass forbidden characters -elizabth ) when "-1Elizabeth3 2" is given',() => {
        expect(() => sum("-1Elizabeth3 2")).toThrowError('You can\'t pass forbidden characters -elizabth ')
    })

    it('should return error(You can\'t pass forbidden characters -elizabth ) when "-1Elizabeth-3 2" is given',() => {
        expect(() => sum("-1Elizabeth-3 2")).toThrowError("You can\'t pass forbidden characters -elizabth ")
    })

    it('should return error(You can\'t pass forbidden characters -elizabth ) when "-1Elizabeth-3 2" is given',() => {
        expect(() => sum("-1Elizabeth3 2-2")).toThrowError("You can\'t pass forbidden characters -elizabth ")
    })

    it("should return 153 when 1200,10,143 is given",() => {
        expect(sum("1200,10,143")).toBe(153)
    })
    it("should return 0 when 1200,10000,14563 is given",() => {
        expect(sum("1200,10000,14563")).toBe(0)
    })
    it.each([
        ["1465,5,0",5],
        ["310,10,20",340],
        ["11879,800,1",801],
        ["1200",0],
    ])('should return sum number when %i is given',(n,expected) => {
        expect(sum(n)).toBe(expected)
    })

    it('should return error(You cant pass negative number -1) when "-1,2,3" is given',() => {
        expect(() => sum("-1,2,3")).toThrowError("You can't pass negative number -1")
    })

    it('should return error(You cant pass negative number) when "-1,-2,3" is given',() => {
        expect(() => sum("-1,-2,3")).toThrowError("You can't pass negative number -1,-2")
    })

    it('should return 17 when "//a\n5a4a8" is given',() => {
        expect(sum("//[a]\n5a4a8")).toBe(17)
    })
    it('should return 17 when "//a\n5b4b8" is given',() => {
        expect(sum("//[b]\n5b4b8")).toBe(17)
    })
    it('should return error(You can\'t pass forbidden characters a) when "//b\n5a4a8" is given',() => {
        expect(()=>sum("//[b]\n5a4a8")).toThrow('You can\'t pass forbidden characters a')
    })
    it('should return 17 when "//%\n5%4%8" is given',() => {
        expect(sum("//[%]\n5%4%8")).toBe(17)
    })
    it('should return error(You can\'t pass forbidden characters a) when "//b\n5a4a8" is given',() => {
        expect(()=>sum("//[b]\n5,4,8")).toThrow('You can\'t pass forbidden characters ,')
    })
    it('should return 17 when "//[abcd][gpfj]\n5%4%8" is given',() => {
        expect(sum("//[abcd][gpfj][hgpl]\n5abcd4abcd8")).toBe(17)
    })
    it('should return error(You can\'t pass forbidden characters a) when "//b\n5a4a8" is given',() => {
        expect(()=>sum("//[abcd]\n5,4,8")).toThrow('You can\'t pass forbidden characters ,')
    })
})

