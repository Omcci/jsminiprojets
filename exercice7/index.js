class ConsoleApp {
  constructor(consoleElement = document.getElementById("console")) { // DONNE UNE VALEUR PAR DEFAUT A CONSOLEELEMENT //
    this.consoleElement = consoleElement;
    // this.consoleElement = document.getElementById("console");
    this.consoleHeader = document.getElementById("consoleHeader");
    this.commandInput = document.getElementById("commandInput");
    this.consoleBody = this.consoleElement.querySelector(".consolebody"); // DOCUMENT.QUERY ?
    this.handleCommandInputBound = this.handleCommandInput.bind(this); // EXPLICATION ?
    this.commandInput.addEventListener("keydown", this.handleCommandInputBound); // HANDLECOMMANDINPUTBOUND EST APPELER LORS DE L'APPUI D'UNE TOUCHE DANS CET ELEM
    this.waitingForCommandData = false;
    this.notes = []; // LIEU DE STOCKAGE DES NOTES
    this.currentCommand = "" // LIEU DE STOCKAGE DE LA COMMAND EN COURS
    this.numberOfNotes = 0; // COMBIEN DE NOTES SONT ATTENDUES OU ONT ETE ENTREES
    this.initDraggable();
  }


  // ---------- METHOD TO DISPLAY CONTENT ON THE CONSOLE ----------//
  writeToConsole(message, prepend = true, addPrefix = true) {
    const newLine = document.createElement("p");
    newLine.textContent = addPrefix ? `> ${message}` : message;
    if (prepend) {
      if (this.consoleBody.firstChild) {
        this.consoleBody.insertBefore(newLine, this.consoleBody.firstChild);
      } else {
        this.consoleBody.appendChild(newLine);
      }
    } else {
      this.consoleBody.appendChild(newLine);
    }
  }

  // ---------- METHOD TO HANDLE COMMANDS ----------//
  processCommand(command) {
    if (command === "clear") {
      this.clearConsole();
      return;
    }
    if (command === "exit") {
      this.spawnConsoles();
      return;
    }
    if (this.waitingForCommandData) {
      if (this.currentCommand === "average") {
        if (this.numberOfNotes === 0) {
          const nbNotes = parseInt(command, 10);
          if (!isNaN(nbNotes)) {
            this.numberOfNotes = nbNotes;
            this.writeToConsole(`Enter ${nbNotes} notes:`, true);
          } else {
            this.writeToConsole("Invalid number. Please enter a valid number of notes.");
          }
        } else {
          this.handleAverageInput(command);
        }
      }
    } else if (command === "help") {
      this.writeToConsole("List of commands:", false);
      this.writeToConsole("average - Calculate the average of notes.", false);
      this.writeToConsole("clear - Clear the console.", false);
      this.writeToConsole("exit - Exit the console.", false);
    } else if (command === "average") {
      this.writeToConsole("Enter the number of notes: ", false, false);
      this.waitingForCommandData = true;
      this.currentCommand = "average";
    } else {
      this.writeToConsole('Unknown command. Type "help" for a list of commands.');
    }
  }

  // ---------- METHOD TO GET THE AVERAGE LOGIC ----------//
  handleAverageInput(command) {
    const note = parseFloat(command);
    if (!isNaN(note)) {
      this.notes.push(note);
      if (this.notes.length < this.numberOfNotes) {
        this.writeToConsole(`Enter note #${this.notes.length + 1}:`, true, false);
      } else {
        const sum = this.notes.reduce((total, n) => total + n, 0);
        const average = sum / this.notes.length;
        this.writeToConsole(`The average of the notes is: ${average.toFixed(2)}`);
        this.waitingForCommandData = false;
        this.numberOfNotes = 0;
        this.notes = [];
        this.currentCommand = "";
      }
    } else {
      this.writeToConsole("Invalid note. Please enter a valid number.");
    }
  }

  // ---------- METHOD TO TYPE ON CONSOLE ----------//
  handleCommandInput(event) {
    if (event.key === "Enter") {
      const input = this.commandInput.value.trim();
      // We won't immediately write the input now. Let's handle it first.
      this.processCommand(input);
      this.commandInput.value = "";
    }
  }

  // ---------- METHOD TO CLEAR THE CONSOLE ----------//
  clearConsole() {
    // 1. Preserve the input element
    const preservedInput = this.commandInput.cloneNode(true);

    // 2. Clear the contents of the console body.
    this.consoleBody.innerHTML = '';

    // 3. Append the preserved input back to the console body.
    this.consoleBody.appendChild(preservedInput);

    // 4. Reassign commandInput to the new input field.
    this.commandInput = preservedInput;

    // 5. Reattach the event listener to the new input field.
    this.commandInput.addEventListener("keydown", this.handleCommandInputBound);

    // 6. Reset internal states.
    this.waitingForCommandData = false;
    this.numberOfNotes = 0;
    this.notes = [];

    // 7. Provide feedback to the user.
    this.writeToConsole("Console cleared.");

    // 8. Ensure the input remains focused
    this.commandInput.focus();
  }


  // ---------- METHOD TO SPAWN CONSOLES ----------//
  spawnConsoles() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const newConsoleElement = this.consoleElement.cloneNode(true);
        document.body.appendChild(newConsoleElement);

        const xOffset = 10 * (i + 1);
        const yOffset = 10 * (i + 1);

        newConsoleElement.style.left = `${this.consoleElement.offsetLeft + xOffset}px`;
        newConsoleElement.style.top = `${this.consoleElement.offsetTop + yOffset}px`;

        // Init new ConsoleApp for each new console
        new ConsoleApp(newConsoleElement);
      }, i * 100);  // 500ms delay
    }
  }


  // ------------- METHODS TO DRAG THE WINDOW --------------- //

  initDraggable() {
    this.consoleHeader.addEventListener("mousedown", this.startDrag.bind(this));
    this.onDragBound = this.onDrag.bind(this); // Bound functions
    this.stopDragBound = this.stopDrag.bind(this); // Bound functions
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

    // conditions pour que la fenêtre ne dépasse par le viewport //
    if (x < 0) x = 0; // limite coté gauche
    if (y < 0) y = 0; // limite en haut
    if (x + this.consoleElement.offsetWidth > window.innerWidth) {
      x = window.innerWidth - this.consoleElement.offsetWidth; // limite à droite
    }
    if (y + this.consoleElement.offsetHeight > window.innerHeight) {
      y = window.innerHeight - this.consoleElement.offsetHeight; // limite en bas
    }

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
