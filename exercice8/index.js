class GridGenerator {
    constructor() {
    }

    createGrid(xAxis, yAxis) {
        const container = document.getElementById("container");

         // Ajouter les entêtes de colonne (1, 2, ..., 12)
         let headerRow = document.createElement("tr");
         let cornerHeader = document.createElement("th");
         headerRow.appendChild(cornerHeader);

         for (let col = 1; col <= xAxis; col++) {
            let th = document.createElement("th");
            th.textContent = col;
            headerRow.appendChild(th);
        }
        container.appendChild(headerRow);

        for (let i = 0; i < yAxis; i++) {
            let row = document.createElement("tr");
            row.style.border = "1px solid";

            let rowHeader = document.createElement("th");
            rowHeader.textContent = String.fromCharCode(65 + i);
            row.appendChild(rowHeader);

            this.makeColumns(row, xAxis);
            container.appendChild(row);
        }
    }


    makeColumns(row, columnNum) {
        console.log("column", columnNum);
        for (let c = 0; c < columnNum; c++) {
            let column = document.createElement("td");
            column.style.border = "1px solid";
            row.appendChild(column);
        }
    }


    run(xAxis, yAxis) {
        this.createGrid(xAxis, yAxis);
    }
}

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

document.addEventListener("DOMContentLoaded", function() {
    const instance = new GridGenerator();
    instance.run(12, 12);
    
    // Vous devriez attendre que la grille soit complètement générée avant d'initialiser le jeu.
    const jeu = new BatailleNavale();
});

// Fonction pour redémarrer le jeu
function restartGame() {
    location.reload();
}