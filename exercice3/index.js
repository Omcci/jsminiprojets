class MyMorpionXO {
  constructor() {
    this.currentPlayerX = true;
    this.gameOver = false;
    this.movesCount = 0;
    this.winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.run();
  }

  createGrid(xAxis, yAxis) {
    const container = document.getElementById("container");
    this.cells = [];

    for (let i = 0; i < yAxis; i++) {
      let row = document.createElement("tr");
      row.style.border = "1px solid";

      // this.makeColumns(row, xAxis)
      // container.appendChild(row)
      const rowCells = [];

      for (let j = 0; j < xAxis; j++) {
        let cell = document.createElement("td");
        cell.style.border = "1px solid";
        cell.style.width = "50px";
        cell.style.height = "50px";
        cell.style.overflow = "hidden";
        cell.style.textAlign = "center";
        cell.style.verticalAlign = "middle";
        cell.dataset.state = "empty";

        rowCells.push(cell);
        row.appendChild(cell);

        cell.addEventListener("click", (e) => this.handleClickCell(e.target));
      }
      this.cells.push(rowCells);
      container.appendChild(row);
    }

    // for (let i = 0; i < yAxis; i++) {
    //     for (let j = 0; j < xAxis; j++) {
    //         const cell = this.cells[i][j]
    //         cell.addEventListener("click" , () => this.handleClickCell(cell))
    //     }

    // }
  }

  handleClickCell(cell) {
    if (!this.gameOver && cell.dataset.state === "empty") {
      const currentPlayer = this.currentPlayerX ? "X" : "O";

      const img = document.createElement("img");
      img.src = currentPlayer === "X" ? "./x.png" : "./o.png";
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.opacity = 0;
      img.style.transition =
        "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";

      cell.innerHTML = "";
      cell.appendChild(img);

      setTimeout(() => {
        img.style.opacity = 1;
        img.style.transform = "scale(1)";
      }, 10);

      cell.dataset.state = currentPlayer;

      this.currentPlayerX = !this.currentPlayerX;
      this.movesCount++;

      if (this.checkWin(currentPlayer)) {
        this.handleWin(currentPlayer);
      } else if (this.movesCount > 8) {
        this.handleTie();
      }
    }
  }

  checkWin(player) {
    for (const combo of this.winningCombos) {
      const [index1, index2, index3] = combo;
      const cell1 = this.cells[index1 % 3][(index1 / 3) | 0];
      const cell2 = this.cells[index2 % 3][(index2 / 3) | 0];
      const cell3 = this.cells[index3 % 3][(index3 / 3) | 0];

      if (
        cell1.dataset.state === player &&
        cell2.dataset.state === player &&
        cell3.dataset.state === player
      ) {
        return true;
      }
    }
    return false;
  }

  handleWin(player) {
    this.gameOver = true;
    const resultElement = document.getElementById("result");
    resultElement.style.opacity = 0;
    resultElement.style.transition =
      "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
    resultElement.textContent = `${player} wins!`;
    setTimeout(() => {
        resultElement.style.opacity = 1;
        resultElement.style.transform = "scale(1.2)";
      }, 10);


  }

  handleTie() {
    this.gameOver = true;
    const resultElement = document.getElementById("result");
    resultElement.style.opacity = 0;
    resultElement.style.transition =
      "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
    resultElement.textContent = "It's a tie!";
    setTimeout(() => {
        resultElement.style.opacity = 1;
        resultElement.style.transform = "scale(1.2)";
      }, 10);
  }

  middleware(xAxis, yAxis) {
    this.createGrid(xAxis, yAxis);
  }

  run(xAxis, yAxis) {
   this.middleware(xAxis, yAxis)
  }
}

