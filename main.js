const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+"];
let output = "";

const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        try {
            // Remplacer % par /100 et évaluer l'expression
            output = eval(output.replace(/%/g, "/100"));
            // Arrondir à 2 décimales pour éviter les erreurs de précision
            output = Math.round(output * 100) / 100;
        } catch (error) {
            output = "Erreur";
            display.value = output;
            return;
        }
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.slice(0, -1);
    } else {
        // Éviter de commencer par un opérateur spécial
        if (output === "" && specialChars.includes(btnValue)) return;
        // Éviter les opérateurs consécutifs
        if (specialChars.includes(btnValue) && specialChars.includes(output[output.length - 1])) return;
        output += btnValue;
    }
    display.value = output;
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
