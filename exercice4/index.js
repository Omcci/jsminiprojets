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
        this.renderWorldMap()
        this.run();
        this.clickedCountries = [];

        const toggleListButton = document.getElementById("toggleListButton");
        toggleListButton.addEventListener("click", () => this.toggleClickedCountriesList());
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

    renderWorldMap() {
        const worldMapContainer = document.getElementById("worldMap")
     
        const countryLegend = document.getElementById("countryLegend")
        // fetch('./map.svg')
        //     .then(response => response.text())
        //     .then(svgContent => {
        //         worldMapContainer.innerHTML = svgContent;
        //     })
        //     .catch(error => {
        //         console.error("Error fetching or rendering SVG:", error);
        //     });

        const objectElement = document.createElement("object");
        objectElement.data = './map.svg';
        objectElement.type = 'image/svg+xml';

        objectElement.addEventListener("load", () => {
            const svgDocument = objectElement.contentDocument;


            const countries = svgDocument.querySelectorAll("path");
            countries.forEach((country) => {
                country.addEventListener("mouseover", (e) => this.handleCountryMouseOver(e, countryLegend));
                country.addEventListener("mouseout", (e) => this.handleCountryMouseOut(e, countryLegend));
                country.addEventListener("click", (e) => this.handleCountryClick(e, country, countryLegend));
            });
        })

        worldMapContainer.appendChild(objectElement);


    }
    handleCountryMouseOver(event, legendElement) {

        console.log("Mouse over:", event.target);
        const countryName = event.target.getAttribute("data-name");
        legendElement.textContent = countryName;
        event.target.style.fill = "#008A8A";
    }

    handleCountryMouseOut(event, legendElement) {
        legendElement.textContent = "";
        event.target.style.fill = "";
    }

    handleCountryClick(event, country, legendElement) {

        const countryName = country.getAttribute("id");
        const formatedCountryName = countryName.charAt(0).toUpperCase() + countryName.slice(1)
        legendElement.style.fontSize = "26px";
        legendElement.style.fontFamily = "fantasy";
        legendElement.textContent = `${formatedCountryName}`;
        this.clickedCountries.includes(formatedCountryName) == "" ? this.clickedCountries.push(formatedCountryName) : ""

        const clickedCountriesList = document.getElementById("clickedCountriesList");
        clickedCountriesList.style.fontFamily = "fantasy";

        const bulletedList = this.clickedCountries.map(country => `• ${country}`).join("<br>");
        clickedCountriesList.innerHTML = `Clicked Countries:<br><br>${bulletedList}`;

        country.setAttribute("fill", "#DC143C");

        this.updateClickedCountriesList();
    }

    toggleClickedCountriesList() {
        const clickedCountriesList = document.getElementById("clickedCountriesList");
        if (clickedCountriesList.style.display === "none") {
            clickedCountriesList.style.display = "block";
            setTimeout(() => {
                clickedCountriesList.style.opacity = 1;
                clickedCountriesList.style.transform = "scale(1)";
            }, 150);


        } else {
            clickedCountriesList.style.opacity = 0;
            clickedCountriesList.style.transform = "scale(0.8)";
            setTimeout(() => {
                clickedCountriesList.style.display = "none";
            }, 500); // Wait for the transition to complete before hiding
        }
    }

    // Update the content of the clicked countries list
    updateClickedCountriesList() {
        const clickedCountriesList = document.getElementById("clickedCountriesList");
        const bulletedList = this.clickedCountries.map(country => `• ${country}`).join("<br>");
        clickedCountriesList.innerHTML = `<strong>Countries saved :</strong><br><br>${bulletedList}`;
    }

    run(xAxis, yAxis) {
        this.createGrid(xAxis, yAxis);
    }

}

