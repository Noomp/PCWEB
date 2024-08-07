const jsConfetti = new JSConfetti()

class question {
    constructor(qn, ans) {
        this.qn = qn;
        this.ans = ans;
    }
}
let qn_tracker = []

let score  = 0
document.getElementById("score").innerHTML = `${score} pt${[score === 1 ? "" : "s"][0]}`

let q1 = new question("Who was the first human to set foot on the Moon?", "Neil Armstrong");
document.getElementById("q1_label").innerHTML = q1.qn;


let q2 = new question("Which planet is known as the \"Red Planet\"", "Mars");
document.getElementById("q2_label").innerHTML = q2.qn;

let q3 = new question("Which planet in our solar system is known for its prominent ring system?", "Saturn");
document.getElementById("q3_label").innerHTML = q3.qn;

let check_ans = (qn_id,correct_ans) => {
    ans = document.getElementById(qn_id).value.toLowerCase();
    if (ans.trim() === correct_ans.toLowerCase()) {
        jsConfetti.addConfetti({emojis:["✌, 🤞"],})
        if (!qn_tracker.includes(qn_id)) {
            score++
            document.getElementById("score").innerHTML = `${score} pt${[score === 1 ? "" : "s"][0]}`
            qn_tracker.push(qn_id)
        }
    } else {
        jsConfetti.addConfetti({emojis:["😥,🤨"]})
    }
}

document.getElementById("btn_1").onclick = function() {check_ans("q1", q1.ans)}
document.getElementById("btn_2").onclick = function() {check_ans("q2", q2.ans)}
document.getElementById("btn_3").onclick = function() {check_ans("q3", q3.ans)}