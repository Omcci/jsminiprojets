class GridGenerator {
    constructor() {
        this.run();
    }

    getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    createGrid(xAxis, yAxis) {
        const container = document.getElementById("container");
        for (let i = 0; i < yAxis; i++) {
            let row = document.createElement("tr");
            row.style.border = "1px solid";
            this.makeColumns(row, xAxis);
            container.appendChild(row);
        }


        setInterval(() => {
            const rows = container.getElementsByTagName("tr");
            const columns = container.getElementsByTagName("td");

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                for (let j = 0; j < columns.length; j++) {
                    const column = columns[j];
                    const randomColor = this.getRandomColor();
                    row.style.backgroundColor = `#${randomColor}`;
                    column.style.backgroundColor = `#${randomColor}`;
                }
            }
        }, Math.random() * 1000 + 1000)
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


