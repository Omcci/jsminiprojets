class BatailleNavale {
    constructor() {
        this.matrix = [
            // Votre matrice ici
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
            [0, 3, 3, 3, 0, 0, 0, 0, 0, 4, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.ships = {
            1: { name: "Torpilleur", size: 2, hits: 0 },
            2: { name: "Sous-marin1", size: 3, hits: 0 },
            3: { name: "Sous-marin2", size: 3, hits: 0 },
            4: { name: "Croiseur", size: 4, hits: 0 },
            5: { name: "Porte avion", size: 5, hits: 0 }
        };
        this.shipsSunk = 0;

        // this.sunkShips = [];
        this.initGame();
    }

    // checkShipSunk(shipId) {
    //     if (this.ships[shipId].hits === this.ships[shipId].size) {
    //         this.sunkShips.push(this.ships[shipId].name);
    //         alert(this.ships[shipId].name + " coulé!");
    //         if (this.sunkShips.length === Object.keys(this.ships).length) {
    //             alert("Vous avez gagné!");
    //         }
    //     }
    // }

    checkShipSunk(shipId) {
        if (this.ships[shipId].hits === this.ships[shipId].size) {
            this.shipsSunk++;
            const gameInfo = document.getElementById("game-info");
            gameInfo.textContent = this.ships[shipId].name + " coulé!";
        }
    }

    // initGame() {
    //     const container = document.getElementById("container");
    //     const cells = container.querySelectorAll("td");
    //     cells.forEach((cell, index) => {
    //         cell.addEventListener("click", () => {
    //             const row = Math.floor(index / 12);
    //             const col = index % 12;

    //             const shipId = this.matrix[row][col];
    //             if (shipId !== 0) {
    //                 cell.style.backgroundColor = "red";
    //                 this.ships[shipId].hits++;
    //                 this.checkShipSunk(shipId);
    //             } else {
    //                 cell.style.backgroundColor = "blue";
    //             }
    //         });
    //     });
    // }

    initGame() {
        const container = document.getElementById("container");
        const cells = container.querySelectorAll("td");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                const row = Math.floor(index / 12);
                const col = index % 12;
                const shipId = this.matrix[row][col];
                
                if (shipId !== 0) {
                    cell.style.backgroundColor = "red";
                    this.ships[shipId].hits++;
                    this.checkShipSunk(shipId);
                } else {
                    cell.style.backgroundColor = "blue";
                }
                this.updateGameInfo();
            });
        });
    }

    updateGameInfo() {
        const gameInfo = document.getElementById("game-info");
        if (this.shipsSunk === 5) {  // Si tous les 5 bateaux sont coulés
            gameInfo.textContent = "Vous avez gagné!";
        } else {
            gameInfo.textContent = `Bateaux coulés: ${this.shipsSunk}/5`;
        }
    }

}

// Lancez le jeu après avoir généré la grille
const instance = new GridGenerator();
instance.run(12, 12);
const jeu = new BatailleNavale();
