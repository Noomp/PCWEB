// const count_3 = () => {
//     var counter = 1;
//     while (counter < 4) {
//         alert(counter);
//         counter++; //same as counter += 1
//     }
//     alert("We're done")
// }

// const for_count_3 = () => {
//     for (var counter = 1; counter < 4; counter++) {
//         alert(counter)
//     }
// }

function generateTable() {
    var rows = parseInt(document.getElementById("rows").value);
    var cols = parseInt(document.getElementById("cols").value);
  
    // Step 1: get the <table id="newTable">
    var table_lst = document.getElementsByName("gen_table");
    if (table_lst.length > 0) {
        document.getElementById("new_table").innerHTML = "";
    }
    let table = document.getElementById("new_table");

    // 2: make a for loop through either rows or cols
    for (var i = 0; i < rows; i++) {
      // 3: Create a new row
      var row = document.createElement("tr");
      // 4: Append that row to the table
      table.appendChild(row);
  
      // 5: Now loop through either rows or cols to add the cells
      for (var j = 0; j < cols; j++) {
        // Create a cell element, that's a <td>, and append it to the row
        var cell = document.createElement("td");
  
        // 6: Append to the row
        row.appendChild(cell);
  
        // Give the cell some text
        cell.innerText = `${i},${j}`;
      }
    }
  }
  