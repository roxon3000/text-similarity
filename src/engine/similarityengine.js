import {SUFFIX_LIST} from '../dictionary/nonroot.js'
import {SAME_SAME} from '../dictionary/mebrain.js'
import 'core-js'

class SimilarityEngine {

    getSimilarityScore(input, target){
       
        //if they exactly equal, return 0
        if(input === target){
            return 0
        }

        //go to lower case
        input = input.toLowerCase()
        target = target.toLowerCase()

        input = input.trim()
        target = target.trim()

        //normalize spaces
        input = input.replaceAll(/[ ]{2,}/g, " ")
        target = target.replaceAll(/[ ]{2,}/g, " ")

        //remove white space
        var m1a = input.replaceAll(/\s/g, '')
        var m2a = target.replaceAll(/\s/g, '')

        //remove new lines
        m1a = m1a.replaceAll(/\n/g, '')
        m2a = m2a.replaceAll(/\n/g, '')
        
        var score = 0

        //return 100 if phrases equal after whitespace removal
        if(m1a === m2a){
            return 100
        }

        //length difference must be greater than 50%
        var lengthDiff = Math.abs(m1a.length - m2a.length)
        if(lengthDiff/(m1a.length + m2a.length) > .5){
            return -1
        }

        //matching words
        var wordScoreResults = this.getMatchingWordsScore(input, target)
        score = score + wordScoreResults.wordScore

        //use character match on non matching words
        var remInputString = wordScoreResults.remInputString
        var remTargetString = wordScoreResults.remTargetString
        
        if(remInputString && remInputString.trim().length > 0 &&
            remTargetString && remTargetString.trim().length > 0 ) {
                
                var overallCharScore = 0
                for(var csi = 15; csi > 3; csi--){
                    var charScore = 0
                    if(remTargetString.length > csi){
                        var charMatchCountResult = this.getCharMatchScore(remInputString, remTargetString, csi, target.length)
                        charScore = charMatchCountResult.charMatchScore
                        remTargetString = charMatchCountResult.remainingTarget
                        remInputString = charMatchCountResult.remainingInput
                        overallCharScore = overallCharScore + charScore 
                    }
                    
                }

            //console.log("word score:" + score)
            //console.log("overallCharScore :" + (overallCharScore*100))
            score = score + (overallCharScore*100)
        }

        var matchingPercentage = 1 - ((remInputString.length + remTargetString.length) /  (input.length + target.length))

        //if(matchingPercentage * 100 > score){
        //    score = matchingPercentage * 100
        //}

        //score = (score > 100 ) ? 100 : score 

        //use straight matching percentage
        score = matchingPercentage * 100

        return Math.round(score)

    }

    getMatchingWordsScore(input, target){
        //matching words
        var inputNonMatch = []
        var targetNonMatch = []
        var m1bArr =  input.split(/\s/)
        var m2bArr =  target.split(/\s/)
        var inputWordCount = (m1bArr) ? m1bArr.length : 0
        var targetWordCount = (m2bArr) ? m2bArr.length : 0
        var wordScore = 0
        var wordMatch = 0
        var wordMatchLength = 0

        targetNonMatch = m2bArr.slice()

        if(m1bArr && m1bArr.length > 0){
            m1bArr.forEach( (el, index) => {
                let matchEl = m2bArr.find( (arel) => {
                    let f = arel === el
                    //only try suffix if first 3 chars are the same
                    let first3 = (arel.length > 2 && el.length > 2) ? (arel.substring(0,3) === el.substring(0,3)) : false
                    if(!f && first3){
                        //try suffixes
                        for(let sfx = 0; sfx < SUFFIX_LIST.length; sfx++){
                            //console.log((arel + SUFFIX_LIST[sfx]) + " === " + el )
                            //console.log((el + SUFFIX_LIST[sfx]) + " === " + arel )
                            f = ((arel + SUFFIX_LIST[sfx]) === el ) || ((el + SUFFIX_LIST[sfx]) === arel )
                            if(f){
                                break
                            }   
                        }

 

                    }
                    
                    if(!f){
                        //try same same from mebrain
                        for(let mbx = 0; mbx < SAME_SAME.length; mbx++){
                            //el is found in a same-same array, test if arel equals any other of the same-sames
                            let ssMatch1 = null
                            ssMatch1 = SAME_SAME[mbx].values.find( (ssEl) => ssEl === el)

                            if(ssMatch1){
                                //if el is found, see if arel matches in the same array                                
                                let ssMatch2 = SAME_SAME[mbx].values.find( (ssEl) => ssEl === arel)                                
                                f = (ssMatch2) ? true : false
                                if(f){
                                    el = ssMatch2
                                    break
                                }
                            }

                        }
                    }

                    return f
                })
                if(matchEl){
                    wordMatch++    
                    wordMatchLength = wordMatchLength + el.length

                    var m2cPos = targetNonMatch.indexOf(el)
                    targetNonMatch.splice(m2cPos, 1)
                }else{
                    inputNonMatch.push(el)
                }
            })
        }


        //var wordDiffAdj = Math.abs(inputWordCount - targetWordCount)/2
        //removed wordScorTempCount, but leaving in code for now.  This was scoring too high when matching on small words        
        //var wordScoreTempCount = (wordMatch * 2) / ((inputWordCount + targetWordCount) - wordDiffAdj)
        var wordScoreTempLength = wordMatchLength / ((target.length + input.length)/ 2)
        //use the higher value, matching as percentage words, or matching as a percentage of length
        wordScore = wordScoreTempLength * 100

        //use character match on non matching words
        var remInputString = (inputNonMatch) ? inputNonMatch.join('') : ""
        var remTargetString = (targetNonMatch) ? targetNonMatch.join('') : ""

        return {
            "wordScore" : wordScore,
            "remInputString" : remInputString,
            "remTargetString" : remTargetString
        }
    }

    getCharMatchScore(input, target, numChars, originalLength){
        // this algorithm allows for duplicate searching from input to target
        //  even if the target is matched on more than once.
        //  a max ceiling is applied in the end
        target = (target) ? target : ""
        input = (input) ? input : ""

        var charMatchCount = 0
        var matchMax = Math.round(target.length / numChars)
        var matchSequence = ""
        var remainingTarget = target
        var remainingInput = input

        for(var index = 0; index < (input.length - numChars); index++) { 

            matchSequence = remainingInput.substring(index, index + numChars)
            if(!matchSequence || matchSequence.length < 1 || index >= (remainingInput.length - numChars)){
                break
            }
            
            var fIx = remainingTarget.indexOf(matchSequence)

            while(fIx >= 0){
                charMatchCount++
                var part1 = remainingTarget
                var part2 = remainingTarget
                var part1i = remainingInput
                var part2i = remainingInput
                remainingTarget = part1.substring(0, fIx) + part2.substring(fIx + numChars, part2.length)
                remainingInput = part1i.substring(0, index) + part2i.substring(index + numChars, part2i.length)
                fIx = remainingTarget.indexOf(matchSequence)
            }            
        }

        if(charMatchCount > matchMax){
            charMatchCount = matchMax
        }

        var charMatchScore = (charMatchCount * numChars) / ((target.length + input.length)/ 2)

        //experimental 
        // give a premium to long char sequences
        //if(charMatchScore > 0){
        //    charMatchScore = charMatchScore + ((numChars*1.2)/100)
        //}
        
        return {
            "charMatchScore" : charMatchScore,
            "remainingTarget" : remainingTarget,
            "remainingInput" : remainingInput
        }

    }

}

export default SimilarityEngine