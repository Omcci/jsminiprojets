  //------------------------CONSOLE + AVERAGE LOGIC ------------------------ //
    //   const consoleBody = document.querySelector(".consolebody");
    //   const commandInput = document.getElementById("commandInput");

    //   function writeToConsole(message) {
    //     const newLine = document.createElement("p");
    //     newLine.textContent = `> ${message}`;
    //     consoleBody.insertBefore(newLine, consoleBody.firstChild);
    //   }

    //   function processCommand(command) {
    //     if (command === "help") {
    //       writeToConsole("Available commands:");
    //       writeToConsole(" - help: Display a list of commands");
    //       writeToConsole(" - average: Calculate the average of a set of notes");
    //     } else if (command === "average") {
    //       writeToConsole("Enter the number of notes:");
    //       commandInput.removeEventListener("keydown", handleCommandInput);
    //       commandInput.addEventListener("keydown", handleAverageInput);
    //     } else {
    //       writeToConsole(
    //         'Commande inconnue. Tapez "help" pour voir la liste des commandes.'
    //       );
    //     }
    //   }

    //   function handleAverageInput(event) {
    //     if (event.key === "Enter") {
    //       const nbNotes = parseInt(commandInput.value, 10);
    //       if (!isNaN(nbNotes)) {
    //         commandInput.removeEventListener("keydown", handleAverageInput);
    //         commandInput.value = "";
    //         const notes = new Array(nbNotes);
    //         let sum = 0;
    //         let noteCounter = 0;
    //         writeToConsole(`Enter ${nbNotes} notes:`);
    //         commandInput.addEventListener(
    //           "keydown",
    //           function processNoteEntry(event) {
    //             if (event.key === "Enter") {
    //               const note = parseFloat(commandInput.value);
    //               if (!isNaN(note)) {
    //                 notes[noteCounter] = note;
    //                 sum += note;
    //                 noteCounter++;
    //                 commandInput.value = "";
    //                 if (noteCounter < nbNotes) {
    //                   writeToConsole(`Enter note #${noteCounter + 1}:`);
    //                 } else {
    //                   const average = sum / nbNotes;
    //                   writeToConsole(
    //                     `La moyenne des notes est : ${average.toFixed(2)}`
    //                   );
    //                   commandInput.removeEventListener(
    //                     "keydown",
    //                     processNoteEntry
    //                   );

    //                   commandInput.addEventListener(
    //                     "keydown",
    //                     handleCommandInput
    //                   );
    //                 }
    //               }
    //             }
    //           }
    //         );
    //       }
    //     }
    //   }

    //   function handleCommandInput(event) {
    //     if (event.key === "Enter") {
    //       const input = commandInput.value.trim();
    //       if (input !== "") {
    //         writeToConsole(input);
    //         processCommand(input);
    //         commandInput.value = "";
    //       }
    //     }
    //   }

    //   commandInput.addEventListener("keydown", handleCommandInput);

    //   //------------------- DRAGGABLE BLOC -----------------------------------//
    //   const consoleElement = document.getElementById("console");
    //   const consoleHeader = document.getElementById("consoleHeader");

    //   consoleHeader.addEventListener("mousedown", startDrag);

    //   let offsetX, offsetY;

    //   function startDrag(event) {
    //     offsetX = event.clientX - consoleElement.getBoundingClientRect().left;
    //     offsetY = event.clientY - consoleElement.getBoundingClientRect().top;
    //     document.addEventListener("mousemove", onDrag);
    //     document.addEventListener("mouseup", stopDrag);
    //   }

    //   function onDrag(event) {
    //     const x = event.clientX - offsetX;
    //     const y = event.clientY - offsetY;
    //     consoleElement.style.left = x + "px";
    //     consoleElement.style.top = y + "px";
    //   }

    //   function stopDrag() {
    //     document.removeEventListener("mousemove", onDrag);
    //     document.removeEventListener("mouseup", stopDrag);
    //   }