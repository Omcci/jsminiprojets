// class ConsoleApp {
//   constructor() {
//     this.consoleElement = document.getElementById("console");
//     this.consoleHeader = document.getElementById("consoleHeader");

//     this.onDragBound = this.onDrag.bind(this);
//     this.stopDragBound = this.stopDrag.bind(this);
//     this.handleCommandInputBound = this.handleCommandInput.bind(this);

//     this.initConsole();
//     this.initDraggable();

//     this.waitingForCommandData = false;
//   }

//   initConsole() {
//     this.consoleBody = this.consoleElement.querySelector(".consolebody");
//     this.commandInput = this.consoleElement.querySelector("#commandInput");
//     this.commandInput.addEventListener("keydown", this.handleCommandInputBound);
//   }

//   writeToConsole(message) {
//     const newLine = document.createElement("p");
//     newLine.textContent = `> ${message}`;
//     this.consoleBody.insertBefore(newLine, this.consoleBody.firstChild);
//   }

//   processCommand(command) {
//     if (this.waitingForCommandData) {
//       this.handleAverageInput(command);
//     } else if (command === "help") {
//       this.writeToConsole("Available commands:");
//       this.writeToConsole(" - help: Display a list of commands");
//       this.writeToConsole(" - average: Calculate the average of a set of notes");
//     } else if (command === "average") {
//       this.writeToConsole("Enter the number of notes:");
//       this.waitingForCommandData = true;
//     } else {
//       this.writeToConsole('Commande inconnue. Tapez "help" pour voir la liste des commandes.');
//     }
//   }

//   handleAverageInput(command) {
//     const nbNotes = parseInt(command, 10);
//     if (!isNaN(nbNotes)) {
//       this.commandInput.removeEventListener("keydown", this.handleCommandInputBound);
//       this.commandInput.value = "";
//       this.waitingForCommandData = false;
//       this.writeToConsole(`Enter ${nbNotes} notes:`);

//       const self = this;
//       let noteCounter = 0;
//       const notes = [];

//       function processNoteEntry(e) {
//         if (e.key === "Enter") {
//           const note = parseFloat(self.commandInput.value);
//           if (!isNaN(note)) {
//             notes.push(note);
//             noteCounter++;
//             self.commandInput.value = "";
//             if (noteCounter < nbNotes) {
//               self.writeToConsole(`Enter note #${noteCounter + 1}:`);
//             } else {
//               const sum = notes.reduce((total, n) => total + n, 0);
//               const average = sum / nbNotes;
//               self.writeToConsole(`The average of the notes is: ${average.toFixed(2)}`);
//               self.commandInput.removeEventListener("keydown", processNoteEntry);
//               self.commandInput.addEventListener("keydown", self.handleCommandInputBound);
//             }
//           } else {
//             self.writeToConsole("Invalid number of notes. Please try again.");
//           }
//         }
//       }

//       this.commandInput.removeEventListener("keydown", this.handleAverageInput);
//       this.commandInput.addEventListener("keydown", processNoteEntry);
//     }
//   }

//   handleCommandInput(event) {
//     if (event.key === "Enter") {
//       const input = this.commandInput.value.trim();
//       if (input !== "") {
//         this.writeToConsole(input);
//         this.processCommand(input);
//         this.commandInput.value = "";
//       }
//     }
//   }

//   initDraggable() {
//     this.consoleHeader.addEventListener("mousedown", this.startDrag.bind(this));

//     this.offsetX = 0;
//     this.offsetY = 0;
//   }

//   startDrag(event) {
//     this.offsetX = event.clientX - this.consoleElement.getBoundingClientRect().left;
//     this.offsetY = event.clientY - this.consoleElement.getBoundingClientRect().top;
//     document.addEventListener("mousemove", this.onDragBound);
//     document.addEventListener("mouseup", this.stopDragBound);
//   }

//   onDrag(event) {
//     const x = event.clientX - this.offsetX;
//     const y = event.clientY - this.offsetY;
//     this.consoleElement.style.left = x + "px";
//     this.consoleElement.style.top = y + "px";
//   }

//   stopDrag() {
//     document.removeEventListener("mousemove", this.onDragBound);
//     document.removeEventListener("mouseup", this.stopDragBound);
//   }
// }

// const app = new ConsoleApp();

class ConsoleApp {
  constructor() {
    this.consoleElement = document.getElementById("console");
    this.consoleHeader = document.getElementById("consoleHeader");

    this.commandInput = document.getElementById("commandInput");
    this.consoleBody = this.consoleElement.querySelector(".consolebody");
    this.commandInput.addEventListener("keydown", this.handleCommandInput.bind(this));
    this.waitingForCommandData = false;
    this.notes = [];
    this.numberOfNotes = 0; // New property to keep track of the number of notes
    this.initDraggable();


  }

  writeToConsole(message) {
    const newLine = document.createElement("p");
    newLine.textContent = `> ${message}`;
    this.consoleBody.appendChild(newLine);
  }

  processCommand(command) {
    if (this.waitingForCommandData) {
      if (this.numberOfNotes === 0) {
        const nbNotes = parseInt(command, 10);
        if (!isNaN(nbNotes)) {
          this.numberOfNotes = nbNotes;
          this.writeToConsole(`Enter ${nbNotes} notes:`);
        } else {
          this.writeToConsole("Invalid number. Please enter a valid number of notes.");
        }
      } else {
        this.handleAverageInput(command);
      }
    } else if (command === "average") {
      this.writeToConsole("Enter the number of notes:");
      this.waitingForCommandData = true;
    } else {
      this.writeToConsole('Unknown command. Type "average" to calculate the average of notes.');
    }
  }

  handleAverageInput(command) {
    const note = parseFloat(command);
    if (!isNaN(note)) {
      this.notes.push(note);
      if (this.notes.length < this.numberOfNotes) {
        this.writeToConsole(`Enter note #${this.notes.length + 1}:`);
      } else {
        const sum = this.notes.reduce((total, n) => total + n, 0);
        const average = sum / this.notes.length;
        this.writeToConsole(`The average of the notes is: ${average.toFixed(2)}`);
        this.waitingForCommandData = false;
        this.numberOfNotes = 0; // Reset for the next time
        this.notes = [];
      }
    } else {
      this.writeToConsole("Invalid note. Please enter a valid number.");
    }
  }


  handleCommandInput(event) {
    if (event.key === "Enter") {
      const input = this.commandInput.value.trim();
      this.writeToConsole(input);
      this.processCommand(input);
      this.commandInput.value = "";
    }
  }

  initDraggable() {
    this.consoleHeader.addEventListener("mousedown", this.startDrag.bind(this));
    document.addEventListener("mousemove", this.onDrag.bind(this));
    document.addEventListener("mouseup", this.stopDrag.bind(this));
  }

  startDrag(event) {
    this.offsetX = event.clientX - this.consoleElement.getBoundingClientRect().left;
    this.offsetY = event.clientY - this.consoleElement.getBoundingClientRect().top;
    document.addEventListener("mousemove", this.onDragBound); // Use the bound function
    document.addEventListener("mouseup", this.stopDragBound); 
  }

  onDrag(event) {
    const x = event.clientX - this.offsetX;
    const y = event.clientY - this.offsetY;
    this.consoleElement.style.left = x + "px";
    this.consoleElement.style.top = y + "px";
  }

  stopDrag() {
    this.offsetX = 0;
    this.offsetY = 0;
    document.removeEventListener("mousemove", this.onDragBound); // Use the bound function
    document.removeEventListener("mouseup", this.stopDragBound);
  }
}

const app = new ConsoleApp();
