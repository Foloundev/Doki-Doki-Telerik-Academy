let blts = [];
blts.push({
    x: 1000,
    y: 600,
    dx: 1,
    dy: -1,
    health: 100
});

let player = {
    x: 0,
    y: 0,
    dy: 0,
    size: 50
}

let yashuMultiplier = 2;
let yashuPos = {
    sizex: 208*yashuMultiplier,
    sizey: 223*yashuMultiplier,
    offsetY: 223*yashuMultiplier-170
};

//blts[5].x;
//blts[5].health = blts[5].health + 7;
//blts[5] = blts[blts.length - 1];
//blts.pop();
function init() {
}
function update() {
    switch (avlblOpts){
        case 0:
            break;
        case 1:
            if(isKeyPressed[49]){
                slctOpt = 1;
                startDialogue(1);
            }
            break;
        case 2:
            if(isKeyPressed[49]){
                slctOpt = 1;
                startDialogue(1);
            }
            else if(isKeyPressed[50]){
                slctOpt = 2;
                startDialogue(2);
            }
            break;
        case 3:
            if(isKeyPressed[49]){
                slctOpt = 1;
                startDialogue(1);
            }
            else if(isKeyPressed[50]){
                slctOpt = 2;
                startDialogue(2);
            }
            else if(isKeyPressed[51]){
                slctOpt = 3;
                startDialogue(3);
            }
            break;
    }
}

let choices = [
    ["おはようー！", "死ね！"],
    ["何時"],
    ["こんにちは", "さようなら"]
], avlblOpts = 0, slctOpt = 0;

let currentText = "", currentIndex = 0, timer = 0, nextText = false;
let textArray = [   //add space before text
    [" オイオイオイ。 お前は誰ですか。", 
    " そうだ…",],
    [" おはよー"],
    [" 本当に"]
],
 affectedIndex = 0,
 textIndex = 0,
 choiceIndex = 0,
 fullText, interval, yashuName = "ヤシュくん";

let proceedText = "";
function draw() {
    drawImage(backshot, 0, 0, innerWidth, innerHeight);
    drawImage(yashu, 0, innerHeight/2-yashuPos.offsetY, yashuPos.sizex, yashuPos.sizey);
    drawImage(bb, 0, innerHeight/2+100, innerWidth, innerHeight/2);

    context.fillStyle = "white";
    context.font = "25px Hiragino Kaku Gothic Pro";
    context.fillText(yashuName, 10, innerHeight/2+110);
    
    context.fillStyle = "white";
    context.font = "30px Hiragino Kaku Gothic Pro";
    context.fillText(currentText, 25, innerHeight/2+170);
    
    if(nextText) {
        proceedText = "Click mouse to proceed..."
    } else if(!nextText) {
        proceedText = "";
    }

    context.fillStyle = "white";
    context.font = "15px Hiragino Kaku Gothic Pro";
    context.fillText(proceedText, innerWidth-250, innerHeight-50);

    if(reachedEnd){
        callChoices();
    }

    interval = setInterval(letterByLetter, 100);
}

function startDialogue(choiceIdx) {
    affectedIndex = choiceIdx; // Set the affected index based on the choice
    textIndex = 0; // Reset to the first text of the selected dialogue
    currentText = ""; // Clear the current text
    currentIndex = 0; // Reset the current index for letter-by-letter effect
    nextText = false; // Ensure "next" is not already set
    reachedEnd = false; // Reset end-of-dialogue flag
    clearInterval(interval); // Clear any existing intervals
    interval = setInterval(letterByLetter, 100); // Restart letter-by-letter display
    if (choiceIdx === 1) {
        // Example: Update the choices and reset choiceIndex
        choices[2];
    } else if (choiceIdx === 2) {
        // Another example for different paths
        choices[3];
    }
}

function callChoices() {
    for(let i = 0; i < choices[choiceIndex].length; i++){
        if (i == 0) avlblOpts = 0;
        context.fillStyle = "white";
        context.font = "30px Hiragino Kaku Gothic Pro";
        let delta = i * 50;
        context.fillText(`${i+1}. ${choices[choiceIndex][i]}`, innerWidth-250, innerHeight-250+delta);
        avlblOpts++
    }
}

let reachedEnd = false;
function letterByLetter(){
    fullText = textArray[affectedIndex][textIndex];
    let offset = 10;
    if (currentIndex < fullText.length - 1) {
        if(timer < 10){
            timer++;
            yashuPos.offsetY - offset;
        }
        else{
            currentIndex++;
            currentText += fullText[currentIndex];
            timer = 0;
            yashuPos.offsetY + offset * 10;
        }
} else {
    if(textArray[affectedIndex][textIndex+1] != undefined){
        nextText = true;
        reachedEnd = false;
    }
    else {
        reachedEnd = true;
    }
    clearInterval(interval);
}
}

function mouseup() {
    if(nextText) {
        textIndex++;
        currentText = "";
        currentIndex = 0;
        timer = 0;
        interval = setInterval(letterByLetter, 1)
        nextText = false;
    }
}
function keyup(key) {
    
}

