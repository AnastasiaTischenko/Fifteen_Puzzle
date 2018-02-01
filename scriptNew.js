const fifteenGame = (() => {
    const GAME_BLOCK = 'game__block';
    let values = [];
    let blocks;
    let correctArray;
	let gameField = document.getElementsByClassName('game-field')[0];
    let ind;
    
    function initGame(){
       	createValues();
        createDomFragment();
        blocks = document.getElementsByClassName(GAME_BLOCK);
       	addListeners();
    }
    
    function createValues(){
        gameField.style.display = 'block';
        for (let i = 0; i < 16; i++){
            (i === 15) ? (values.push(null)) : (values.push(i + 1))
        }
        correctArray = values.slice(0, values.lenght);
        randomize();
    }
    
    function refreshGame() {
        if (ind !== 0){
            randomize();
            bloksArrayBinding();
        }
    }
    
    function bloksArrayBinding() {
        values.forEach((el, i) => {
            if (el != blocks[i].innerHTML){
                blocks[i].innerHTML = el;
            }
        })
    }
    
    function randomize(){
        values.sort(() => Math.random() - 0.5);
    }
    
    function createDomFragment(){
        const fragment = document.createDocumentFragment();
        values.forEach(value => {
            const block = document.createElement('div');
            
            block.classList.add(GAME_BLOCK);
            block.textContent = value;
            fragment.appendChild(block);
        })
        gameField.appendChild(fragment)
    }
    
    function addListeners(){
        ind++;
        gameField.addEventListener('click', moveBlock, false)
    }
    
    function moveBlock(event){
        if (event.target.className === GAME_BLOCK){
            const index = values.indexOf(+event.target.innerText);

            swap(index);
            checkWinner();
        }
    }
    
    function swap(index){
        if (values[index + 1] === null && index !== 3 && index !== 7 && index !== 11){
            ([values[index], values[index + 1]] = [values[index + 1], values[index]]);
            ([blocks[index].innerText, blocks[index + 1].innerText] = [blocks[index + 1].innerText, blocks[index].innerText]);
        }
        if (values[index - 1] === null && index !== 4 && index !== 8 && index !== 12){
            ([values[index - 1], values[index]] = [values[index], values[index - 1]]);
            ([blocks[index - 1].innerText, blocks[index].innerText] = [blocks[index].innerText, blocks[index - 1].innerText]);
        }
        if (values[index + 4] === null){
            ([values[index], values[index + 4]] = [values[index + 4], values[index]]);
            ([blocks[index].innerText, blocks[index + 4].innerText] = [blocks[index + 4].innerText, blocks[index].innerText]);
        }
        if (values[index - 4] === null){
            ([values[index - 4], values[index]] = [values[index], values[index - 4]]);
            ([blocks[index - 4].innerText, blocks[index].innerText] = [blocks[index].innerText, blocks[index - 4].innerText]);
        }
    }
    
    function closeGame(){//wrong working
       	gameField.style.display = 'none';
        gameField.removeEventListener('click', moveBlock, false)
        ind--;
        values = [];
        gameField.innerHTML = '';
        
    }
    
    function checkWinner() {
        if (ddd()){
            document.getElementsByClassName('winner')[0].innerHTML = 'You are winner !';
        }
    }
    
    function ddd() {
        return values.every((val, i) => i === values.length - 1 && val === null ? true : val === i + 1);
    } 
    
    function solveGame() {
        gameField.removeEventListener('click', moveBlock, false);
        ind--;
        values = correctArray.slice(0, correctArray.lenght)
        bloksArrayBinding();
    }
    
    return {
		init: function(){
            initGame();
        },
        refresh: function(){
            refreshGame();
        },
        solve: function(){
        	solveGame();
        },
        exit: function(){
            closeGame();
        }
	}
})();

document.getElementsByClassName('start')[0].addEventListener('click', function(){
    fifteenGame.init();
    this.setAttribute("disabled", "disabled");
}, false);

document.getElementsByClassName('refresh')[0].addEventListener('click', fifteenGame.refresh , false);

document.getElementsByClassName('solve')[0].addEventListener('click', fifteenGame.solve, false);

document.getElementsByClassName('close')[0].addEventListener('click', function(){
    fifteenGame.exit();
    document.getElementsByClassName('start')[0].removeAttribute("disabled")
}, false);