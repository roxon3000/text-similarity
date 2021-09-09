import SimilarityEngine from '../../src/engine/similarityengine.js'
import assert from 'assert'

describe('Simularity Engine Test', () => {
    
    it('same same', async () => {

        let se = new SimilarityEngine()
        let input = "COVID VACCINE"
        let target = "covid-19 vaccines"
        
        let score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,100)

    })

    it('test 1', async () => {

        var se = new SimilarityEngine()
        var input = "Trump Impeachment Trial"
        var target = "Trumps impeachment"
        
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,88)

        score = se.getSimilarityScore(target, input)
        console.log("se.getSimilarityScore('" + target +  "," + input + "')=" + score)
 
        assert.deepStrictEqual(score,88)


    })

    it('funny 1', async () => {

        var se = new SimilarityEngine()
        var input="pro-autocracy side"
        var target="pro-democracy side"
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,78)

    })
    
    it('hmmmm 2', async () => {

        var se = new SimilarityEngine()
        var input="evidence review"
        var target="Biden"

        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score, 45)

    })

    it('hmmmm 1', async () => {

        var se = new SimilarityEngine()
        var input="Multibillion Dollar Valuation"
        var target="3 billion"
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,-1)

    })

    it('weird 1', async () => {

        var se = new SimilarityEngine()
        var input="60-YEAR-OLD WOMAN 12"
        var target="27-year-old began"
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,57)

    })

    it('one to two word', async () => {

        var se = new SimilarityEngine()
        var input="escape accountability"
        var target="Accountability"
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,83)

    })

    it('long test', async () => {

        var se = new SimilarityEngine()
        var input = "the unnamed narrator of \"Pregnancy Diary\" is a young woman who lives with her sister, newly pregnant, and her sister's husband. \"Pregnancy Diary\" is told in an epistolary format, with the narrator keeping a meticulous journal of her sister's pregnancy and reactions to it.[6] The narrator's sister grows obsessed with scents and food, particularly sweet food, and entrusts the narrator to cook for her to sate her cravings.[7]"        
        var target = "A recurring theme of the collection is food, particularly the subversion of feeding other people from an act of caring into one of sadistically undermining the other's wellbeing. In \"The Diving Pool\", one of the ways Aya torments Rie is to feed her spoiled and rotten food, hoping to sicken the girl under the guise of rewarding her; in \"Pregnancy Diary\", the focus of the story is the narrator's subverted caregiving for her pregnant sister, feeding her food made with tainted ingredients with the hopes of disfiguring her child.[7]"
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,55)

    })

    it('test 1a', async () => {
        /*
*******************simEng.getSimilarityScore('Trumps impeachment','Trumps impeachment trial;) = 89
*******************simEng.getSimilarityScore('Trumps impeachment','Trump Impeachment Trial;) = 70

        */

        var se = new SimilarityEngine()
        var input = "Trumps impeachment"
        var target = "Trump Impeachment Trial"
        
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,88)

    })
    
    it('high score', async () => {

        var se = new SimilarityEngine()
        var input = "Trump Impeachment Trial"
        var target = "Trumps impeachment trials"
        
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,100)


    })



    it('cap letter char test', async () => {

        var se = new SimilarityEngine()

        var score = se.getSimilarityScore('Super Bowl','Super Bowl ad')
        console.log("se.getSimilarityScore('Super Bowl','Super Bowl ad')=" + score)
        assert.deepStrictEqual(score,91)

        score = se.getSimilarityScore('Super Bowl ad','Super Bowl')
        console.log("se.getSimilarityScore('Super Bowl ad','Super Bowl')=" + score)
        assert.deepStrictEqual(score,91)


    })  

    it('3 char test', async () => {

        var se = new SimilarityEngine()

        var score = se.getSimilarityScore(" hello my name is jeff ", "  what the hell is going on my name is bob, what is to my left, it's all the same")
        console.log("se.getSimilarityScore('hello my name is jeff ", "  what the hell is going on my name is bob, what is to my left, it's all the same')=" + score)
       assert.deepStrictEqual(score,-1)


    })
  
    it('whitespace test', async () => {

        var se = new SimilarityEngine()
        var input = " hello my name is jeff "
        var target = "  hello   myname is      jeff     "

        var score = se.getSimilarityScore(input, target )
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
        assert.deepStrictEqual(score,100)

    })
    
    it('plagiarsm test', async () => {

        var se = new SimilarityEngine()
        var input = "Descartes has been heralded as the first modern philosopher. He is famous for having made an important connection between geometry and algebra, which allowed for the solving of geometrical problems by way of algebraic equations. He is also famous for having promoted a new conception of matter, which allowed for the accounting of physical phenomena by way of mechanical explanations. However, he is most famous for having written a relatively short work, Meditationes de Prima Philosophia (Meditations On First Philosophy), published in 1641, in which he provides a philosophical groundwork for the possibility of the sciences."
        var target = "Descartes is famous for being the first modern philosopher. He promoted a new concept of matter which allowed for the accounting of physical phenomena by way of mechanical explanations and an important connection between geometry and algebra, which allowed for the solving of geometrical problems by way of algebraic equations. However, he is best known for having written Meditations On First Philosophy, published in 1641, in which he provides a philosophical groundwork for the possibility of the sciences."

        var score = se.getSimilarityScore(input, target )
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
        assert.deepStrictEqual(score,88)

    })

    it('number test', async () => {

        var se = new SimilarityEngine()
        var input = "Give me one good reason"
        var target = "Give me 1 good reason"

        var score = se.getSimilarityScore(input, target )
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
        assert.deepStrictEqual(score,100)

    })
})