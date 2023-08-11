class ProgressBar {
    constructor(sum) {
        this.sum = sum;
        this.segment = 0;
        this.progressFill = null;
        this.progressPercentage = null
        this.initialization();
        this.interval = setInterval(() => {
            this.displayBar()
        }, 10)
    }

    initialization() {
        this.progressFill = document.getElementById("progressFill");
        this.progressPercentage = document.getElementById("progressPercentage"); 
        this.progressFill.style.width = 0;
        this.progressPercentage.innerText="0%"
        const resetButton = document.getElementById("resetButton"); 
        resetButton.addEventListener("click", () => this.resetProgress());
    }

    resetProgress() {
        this.segment = 0;
        this.progressFill.style.width = "0%";
        this.progressPercentage.innerText = "0%";
        clearInterval(this.interval);
        this.interval = setInterval(() => this.displayBar(), 10);
    }

    displayBar() {
        this.segment++;

        if (this.segment >= this.sum) {
            clearInterval(this.interval);
        }

        const fillWidth = (this.segment / this.sum) * 100;
        this.progressFill.style.width = `${fillWidth}%`;
        this.progressPercentage.innerText = `${Math.floor((this.segment / this.sum) * 100)}%`; 

    }
}
