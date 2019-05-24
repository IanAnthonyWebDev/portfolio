
var keyInput = {
    getKey: function(e) {
        if(gameState.hasWon === false && gameState.isPlaying === true) {
            //console.log(e);
            var key = e.key;
            if(key === 'w' || key === 'ArrowUp' || key === 'k') {
                //console.log('Going Up!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x,player.y-1));
            }
            else if(key === 'a' || key === 'ArrowLeft' || key === 'h') {
                //console.log('Going Left!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x-1,player.y));
            }
            else if(key === 's' || key === 'ArrowDown' || key === 'j') {
                //console.log('Going Down!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x,player.y+1));
            }
            else if(key === 'd' || key === 'ArrowRight' || key === 'l') {
                //console.log('Going Right!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x+1,player.y));
            }
            // Diagonal Movement for Nethack Controls Only
            
            else if(key === 'u') {
                //console.log('Going Up Right!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x+1,player.y-1));
            }
            else if(key === 'n') {
                //console.log('Going Down Right!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x+1,player.y+1));
            }
            else if(key === 'b') {
                //console.log('Going Down Left!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x-1,player.y+1));
            }
            else if(key === 'y') {
                //console.log('Going Up Left!');
                viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(player.x-1,player.y-1));
            }
        }
    }
};

// Individual Grid Sections, with Coordinates and type(used to store its char)
class GridBlock {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

class MapGrid {
     constructor(baseString, columns, lines, startX, startY) {
        this.baseString = baseString;
        this.columns = columns;
        this.lines = lines;
        this.startX = startX;
        this.startY = startY;
     }
}

class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var viewGrid = {
    sizeX: 30,
    sizeY: 10,
    generateMap: function(map, playerPos, movePos) {
        var grid = document.querySelector('#map-grid');
        var str = map.baseString;
        var mapColumns = map.columns;
        //var gridColumns = 40;
        var filledColumns = 0;
        var currentY = 0;
        var skipNext = false;
        var index = 0;
        grid.innerHTML = '';
        for(var index = 0; index < str.length; index++) {
            if(skipNext === false && str.charAt(index) !== '{') {
                var newGrid = document.createElement('p');
                newGrid.textContent = str.charAt(index);
                if(newGrid.textContent === ']' || newGrid.textContent === '[') {
                    newGrid.textContent = ' ';
                    skipNext = true;
                }
                grid.appendChild(newGrid);
                newGrid.classList.add('grid-block');
                
                //console.log('Line: '+currentY+'. Column: '+filledColumns+'. Index: '+index+'. Char: '+str.charAt(index));

                // Check if the Current Tile is the Relic's Location
                if(filledColumns === holyGrail.x && currentY === holyGrail.y) {
                    if(gameState.goalRelic === 'grail') newGrid.textContent = 'H';
                    else if(gameState.goalRelic === 'spear') newGrid.textContent = 'S';
                    else if(gameState.goalRelic === 'cross') newGrid.textContent = 'T';
                }

                // Check if current tile has the player's coordinates
                if(filledColumns === playerPos.x && currentY === playerPos.y) {
                    newGrid.textContent = '@';
                    // Set Player Tile to Current If This is the original map generation
                    player.tileHolder = new PlayerHolder(newGrid, str.charAt(index));
                }


                // Check if Current Tile has the player's desired move coordinates
                if(filledColumns === movePos.x && currentY === movePos.y && (movePos.x != player.x || movePos.y != player.y)) {
                    // Check if the tile is passable, open ground
                    var char = str.charAt(index);
                    if(char != '-' && char != '|' && char != ' ') {
                        // If open Terrain, Set the tile's content to player(@)
                        // And Update the Player's Position variables, both on the player and the one passed into this function
                        // Consider removing playerPos and just using player.x and player.y?
                        newGrid.textContent = '@';
                        player.x = movePos.x;
                        player.y = movePos.y;
                        playerPos = movePos;

                        // And reset the old player tile to its original content (which was stored in player.tileHolder)
                        if(player.tileHolder != 'null') {
                            player.tileHolder.element.textContent = player.tileHolder.content;
                            player.tileHolder = new PlayerHolder(newGrid, str.charAt(index));
                        }
                        if(player.x === holyGrail.x && player.y === holyGrail.y) gameState.victory();
                        else {
                            // Save The Player's New Position and tileHolder, Unless Victory
                            gameState.savePosition();
                        }
                    }
                }

                // Show Coordinates
                //newGrid.textContent = ' |'+currentY+', '+filledColumns+'|';
                // Record that one more grid element has been filled (to keep track of when we reach the end of the grid-row)
                filledColumns++;
            }
            else skipNext = false;

            if(filledColumns  >= mapColumns) {
                filledColumns = 0;
                currentY++;
            }

            // When the view grid is larger than the map, fill extra columns with spaces before continuing to iterate
            /*if(filledColumns >= mapColumns && filledColumns < gridColumns) {
                while(filledColumns < gridColumns) {
                    var newEmptyGrid = document.createElement('p');
                    newEmptyGrid.textContent = ' ';
                    grid.appendChild(newEmptyGrid);
                    newEmptyGrid.classList.add('grid-block');
                    filledColumns++;
                }
                filledColumns = 0;
            }*/
        }
    }
};

class PlayerHolder {
    constructor(element, content) {
        this.element = element;
        this.content = content;
    }
}

var player = {
    x: 2,
    y: 2,
    tileHolder: 'null',
    name: 'Squire Pyle',
    grails: 0,
    spears: 0,
    crosses: 0
};

var holyGrail = {
    x: 21,
    y: 4
};

var gameState = {
    hasWon: false,
    isPlaying: false,
    goalRelic: 'grail',
    victory: function() {
        const container = document.querySelector('.container');
        const winDiv = document.createElement('div');
        const winP = document.createElement('p');
        const winBtn = document.createElement('button');
        winDiv.id = 'victory';
        container.appendChild(winDiv);
        winDiv.appendChild(winP);
        winDiv.appendChild(winBtn);

        // Increase Player Relics
        if(this.hasWon === false) {
            if(this.goalRelic === 'grail') player.grails++;
            else if(this.goalRelic === 'spear') player.spears++;
            else if(this.goalRelic === 'cross') player.crosses++;
        }
        this.hasWon = true;

        // Save Player Relics
        this.savePosition();

        if(this.goalRelic === 'grail' && player.grails === 1) winP.textContent = 'Congratulations '+player.name+'! You have captured the Holy Grail and completed your quest!';
        else if(this.goalRelic === 'spear' && player.spears === 1) winP.textContent = 'Congratulations '+player.name+'! You have captured the Spear of Destiny and completed your quest!';
        else if(this.goalRelic === 'cross' && player.crosses === 1) winP.textContent = 'Congratulations '+player.name+'! You have captured the True Cross and completed your quest!';
        else if(this.goalRelic === 'grail') winP.textContent = 'Congratulations '+player.name+'! You have captured another Holy Grail and completed your quest! You now have '+player.grails+' Holy Grails!';
        else if(this.goalRelic === 'spear') winP.textContent = 'Congratulations '+player.name+'! You have captured another Spear of Destiny and completed your quest! You now have '+player.spears+' Spears of Destiny!';
        else if(this.goalRelic === 'cross') winP.textContent = 'Congratulations '+player.name+'! You have captured another True Cross and completed your quest! You now have '+player.crosses+' True Crosses!';
        winBtn.textContent = 'Start New Quest';
        //winBtn.addEventListener('click', () => {location.reload();});
        winBtn.addEventListener('click', () => {
            //location.reload();
            // Delete Victory Popup Window
            winDiv.parentElement.removeChild(winDiv);
            // Set Victory to False
            this.hasWon = false;
            // Reset Player Variables to Default
            player.x = 2;
            player.y = 2;
            player.tileHolder = 'null';

            this.savePosition();

            // And Rerender the Map
            this.setGoalRelic();
            viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(2,2));
        });
    },
    startUp: function() {
        console.log('Start Up');
        if(localStorage.getItem('grail-save') != null) {
            const save = JSON.parse(localStorage.getItem('grail-save'));
            const savedx = save.savedPlayer.x;
            const savedy = save.savedPlayer.y;
            player.name = save.savedPlayer.name;
            player.grails = save.savedPlayer.grails;
            player.spears = save.savedPlayer.spears;
            player.crosses = save.savedPlayer.crosses;
            gameState.hasWon = save.hasWon;
            gameState.goalRelic = save.goalRelic;
            gameState.isPlaying = true;
            //this.setGoalRelic();
            viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(savedx, savedy));
        }
        else {
            //viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(2,2));
            
            // Create Character Screen
            const charDiv = document.createElement('div');
            const charP = document.createElement('p');
            const charInput = document.createElement('input');
            const charBtn = document.createElement('button');
            const container = document.querySelector('.container');
            
            container.appendChild(charDiv);
            charDiv.appendChild(charP);
            charDiv.appendChild(charInput);
            charDiv.appendChild(charBtn);

            // Assign Classes and Ids
            charDiv.classList.add('character-menu');

            // Assign Text Values and Select Input Field
            charP.textContent = 'Name Your Character:';
            charInput.value = 'Squire Pyle';
            charInput.select();
            charInput.setSelectionRange(charInput.value.length,charInput.value.length);
            charBtn.textContent = 'Start Quest';

            // Add Start Game Function to charBtn
            charBtn.addEventListener('click', function(e){
                console.log(e);
                if(e.srcElement === charBtn) {
                    gameState.createCharacter(charInput.value, charDiv);
                }
            });
        }

    },
    setGoalRelic: function() {
        var grails = player.grails;
        var spears = player.spears;
        var crosses = player.crosses;
        if(grails >= 1) {
            if(spears === 0) this.goalRelic = 'spear';
            else if(crosses === 0) this.goalRelic = 'cross';
            else {
                var rand = Math.floor(Math.random() * 3);
                if(rand === 0) this.goalRelic = 'grail';
                else if(rand === 1) this.goalRelic = 'spear';
                else this.goalRelic = 'cross';
            }
        }
        this.savePosition();
    },
    savePosition: function() {
        const newSave = new Save(player, gameState.hasWon, gameState.goalRelic);
        localStorage.setItem('grail-save', JSON.stringify(newSave));
    },
    createCharacter: function(name, characterMenu) {
        // Delete Character Menu, Set Player Name, and Build Map
        characterMenu.parentElement.removeChild(characterMenu);
        player.name = name;
        gameState.isPlaying = true;
        viewGrid.generateMap(maps.map1, new Pos(player.x, player.y), new Pos(2,2));
        this.savePosition();
    }
};

class Save {
    constructor(savedPlayer, hasWon, goalRelic) {
        this.savedPlayer = savedPlayer;
        this.hasWon = hasWon;
        this.goalRelic = goalRelic
    }
}

var maps = {
    map1: new MapGrid("{|------------|              [1 {|............|              [2 {|.....------.|  ----------- [3 {|-----|    |.|  |.........| [4 {           |.|  |....H....| [5 {           |.|__|.........| [6 {           |..............| [7 {           |--------------| [8 ", 30, 8, 1, 1)
};
window.addEventListener('keydown', keyInput.getKey, false);
gameState.startUp();



