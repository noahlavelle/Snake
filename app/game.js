class Food {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.length = 5;
        this.moveDir = [0, 0];
    }

    right() { if (this.moveDir[0] !== -1) this.moveDir = [1, 0]; }
    left() { if (this.moveDir[0] !== 1) this.moveDir = [-1, 0]; }
    up() { if (this.moveDir[1] !== -1) this.moveDir = [0, 1]; }
    down() { if (this.moveDir[1] !== 1) this.moveDir = [0, -1]; }
}

class Game {
    constructor() {
        const snake = new Snake(this, 0, 0);
        this.snake = snake;
        this.tail = [];
        this.food = new Food(this, ...this.makeFoodCoords());
        this.started = false;
        this.highscore = 0;

        this.tick(this);

        onkeydown = function(e) {
            switch(e.keyCode) {
                case 65:
                    snake.left(); 
                    break; 
                case 87:
                    snake.down(); 
                    break; 
                case 68:
                    snake.right(); 
                    break; 
                case 83:
                    snake.up(); 
                    break;
                case 37:
                    snake.left(); 
                    break; 
                case 38:
                    snake.down(); 
                    break; 
                case 39:
                    snake.right(); 
                    break; 
                case 40:
                    snake.up(); 
                    break; 
            }
        }
    }

    makeFoodCoords() {
        return [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
    }

    end() {
        this.snake.game = game;
        this.snake.x = 0;
        this.snake.y = 0;
        this.snake.length = 5;
        this.snake.moveDir = [0, 0];
        this.food = new Food(this, ...this.makeFoodCoords());
        this.tail = [];
        this.started = false;

        // $('#score').html(0);
    }

    tick(game) {
        if (game.snake.x === game.food.x && game.snake.y === game.food.y) {
            game.food = new Food(game, ...game.makeFoodCoords());
            game.snake.length++;
        }

        if (game.tail.find(e => {
            return e[0] === game.snake.x && e[1] === game.snake.y;
        }) && game.started) {
            game.end();
        }

        game.tail.push([game.snake.x, game.snake.y]);
        if (game.tail.length > game.snake.length) {
            game.tail.shift();
        }
        

        game.snake.x = game.snake.x + game.snake.moveDir[0];
        game.snake.y = game.snake.y + game.snake.moveDir[1];

        if (game.snake.x >= gridsize
        || game.snake.x < 0
        || game.snake.y >= gridsize
        || game.snake.y < 0) {
            game.end();
        }
        
        if (game.snake.x > 0 || game.snake.y > 0) game.started = true;

        clear();

        draw(game.food.x, game.food.y, 'white');
        draw(game.snake.x, game.snake.y);
        for (const e of game.tail) {
            draw(e[0], e[1]);
        }

        write('Score: ' + (game.snake.length - 5).toString(), 2);

        if (game.highscore < game.snake.length - 5) {
            game.highscore = game.snake.length - 5;
        }

        write('Highscore: ' + game.highscore.toString(), 3.5);

        setTimeout(() => {game.tick(game)}, Math.max(1000 / ((game.snake.length + 3) * 2), 1000 / 30));
    }
}