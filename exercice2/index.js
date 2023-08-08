class ProgressBar {
    constructor(sum) {
        this.sum = sum;
        this.segment = 0;
        this.progressFill = null;
        this.initialization();
        this.interval = setInterval(() => {
            this.displayBar()
        }, 10)
    }

    initialization() {
        this.progressFill = document.getElementById("progressFill");
        this.progressFill.style.width = 0;
    }

    displayBar() {
        this.segment++;

        if (this.segment >= this.sum) {
            clearInterval(this.interval);
        }

        const fillWidth = (this.segment / this.sum) * 100;
        this.progressFill.style.width = `${fillWidth}%`;
    }
}
