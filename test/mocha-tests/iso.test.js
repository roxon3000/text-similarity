import SimilarityEngine from '../../src/engine/similarityengine.js'
import assert from 'assert'

describe('Simularity Engine Test', () => {
    
    it('funny 1', async () => {

        var se = new SimilarityEngine()
        var input= "pro-autocracy side"
        var target="pro-democracy side"
        var score = se.getSimilarityScore(input, target)
        console.log("se.getSimilarityScore('" + input +  "," + target + "')=" + score)
 
        assert.deepStrictEqual(score,83)

    })
})