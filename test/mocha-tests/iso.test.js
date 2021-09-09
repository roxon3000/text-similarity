import SimilarityEngine from '../../src/engine/similarityengine.js'
import assert from 'assert'

describe('Simularity Engine Test', () => {
    
    it('number test', async () => {

        var se = new SimilarityEngine()
        var input = "Give me one good reason"
        var target = "Give me 1 good reason"

        var score = se.getSimilarityScore(input, target )
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
        assert.deepStrictEqual(score,100)

    })
})