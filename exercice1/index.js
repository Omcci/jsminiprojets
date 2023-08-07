// class GridGenerator {
    
//     constructor() {
//         this.run();
//     }

//     getRandomColor() {
//         setInterval(() => {
//             this.randomColor  = Math.floor(Math.random()*16777215).toString(16);
            
//         },Math.random() * 1000 + 1000)
//         // let intervalId = setInterval(randomColor, 1000)

//     }


//     createGrid(xAxis, yAxis) {
//         const container = document.getElementById("container")
//         for (let i = 0; i < yAxis; i++) {
//             let row = document.createElement("tr")
//             row.style.border="1px solid"
//             // const rndInt = Math.floor(Math.random() * 2) + 1
           
//             // if (
//             //     // i % 2 != 0 && 
//             //     rndInt === 2) {
//             //         const randomColor = Math.floor(Math.random() * 16777215).toString(16);

//             //     row.style.backgroundColor= `#${randomColor}`;
//             // }
//             this.makeColumns(row, xAxis);
//             container.appendChild(row); 
//         }
//     }


//     makeColumns(row, columnNum) {
//         console.log("column" , columnNum)
//         for (let c = 0; c < columnNum; c++) {
//             let column = document.createElement("td")
//             // let randomColor = Math.floor(Math.random()*16777215).toString(16);
//             column.style.border="1px solid"
//             // if (
//             //     c % 2 != 0 && 
//             //     rndInt == 1) {
//             //     column.style.backgroundColor=`${randomColor}`
//             // }
//             const rndInt = Math.floor(Math.random() * 2) + 1;
//             if (rndInt === 1) {
//                 const randomColor = Math.floor(Math.random() * 16777215).toString(16);

//                 column.style.backgroundColor = `#${randomColor}`;
//             }
//             row.appendChild(column); 
//         }
//     }

//     run(xAxis, yAxis) {
//         this.getRandomColor()
//         this.createGrid(xAxis, yAxis);
//     }
// }

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
                for (let j=0; j < columns.length; j++) {
                    const column = columns[j]
                    const rndInt = Math.floor(Math.random() * 2) + 1;

                    if (rndInt === 1) {
                        const randomColor = this.getRandomColor();
                        row.style.backgroundColor = `#${randomColor}`;
                    } else {
                        const randomColor = this.getRandomColor();

                        column.style.backgroundColor = `#${randomColor}`;

                        
                    }

                }
               
            }
        }, Math.random() * 1000 + 1000);
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

