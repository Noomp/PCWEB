

var bmi_calc = () => {
    //getting input elements
    const height_inp = document.getElementById("height_inp");
    const weight_inp = document.getElementById("weight_inp");

    //storing values
    const height = height_inp.value;
    const weight = weight_inp.value;
    let bmi = weight / ((height/100)**2);
    let bmi_statement = `Your BMI is ${bmi}`;

    let bmi_cat = ""
    if (bmi < 18.5) {
        bmi_cat = "Underweight"
    } else if (bmi < 25) {
        bmi_cat = "Acceptable"
    } else {
         bmi_cat = "Overweight"
    }

    document.getElementById("show_bmi").innerHTML = bmi_statement
    document.getElementById("show_cat").innerHTML = bmi_cat   
}

let inp_weight = document.getElementById("weight_inp");

inp_weight.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent default behavior
        document.getElementById("calc_btn").click(); // click button upon enter
    }
});