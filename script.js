var updateIndex = -1; // Global variable to store the current update index

function validateForm() {
  var name = document.getElementById("Name").value;
  var age = document.getElementById("Age").value;
  var email = document.getElementById("Email").value;
  var address = document.getElementById("Address").value;

  if (name == "") {
    alert("Please enter your name, it is required");
    return false;
  }
  if (age == "") {
    alert("Please enter your age, it is required");
    return false;
  } else if (age < 1) {
    alert("Age cannot be negative or zero");
    return false;
  }
  if (email == "") {
    alert("Please enter your email, it is required");
    return false;
  } else if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email address");
    return false;
  }
  if (address == "") {
    alert("Please enter your address, it is required");
    return false;
  }
  return true;
}

function showData() {
  var peopleList = localStorage.getItem("peopleList")
    ? JSON.parse(localStorage.getItem("peopleList"))
    : [];

  var html = "";
  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.address + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="editData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showData;

function addData() {
  if (validateForm()) {
    var name = document.getElementById("Name").value;
    var age = document.getElementById("Age").value;
    var email = document.getElementById("Email").value;
    var address = document.getElementById("Address").value;

    var peopleList = localStorage.getItem("peopleList")
      ? JSON.parse(localStorage.getItem("peopleList"))
      : [];
    peopleList.push({ name: name, age: age, email: email, address: address });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    showData();
    document.getElementById("Name").value = "";
    document.getElementById("Age").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Address").value = "";
  }
}

function deleteData(index) {
  var peopleList = localStorage.getItem("peopleList")
    ? JSON.parse(localStorage.getItem("peopleList"))
    : [];
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function editData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var peopleList = localStorage.getItem("peopleList")
    ? JSON.parse(localStorage.getItem("peopleList"))
    : [];
  document.getElementById("Name").value = peopleList[index].name;
  document.getElementById("Age").value = peopleList[index].age;
  document.getElementById("Email").value = peopleList[index].email;
  document.getElementById("Address").value = peopleList[index].address;

  updateIndex = index; // Store the index globally
}

document.getElementById("Update").onclick = function () {
  if (validateForm()) {
    var peopleList = localStorage.getItem("peopleList")
      ? JSON.parse(localStorage.getItem("peopleList"))
      : [];
    peopleList[updateIndex].name = document.getElementById("Name").value;
    peopleList[updateIndex].age = document.getElementById("Age").value;
    peopleList[updateIndex].email = document.getElementById("Email").value;
    peopleList[updateIndex].address = document.getElementById("Address").value;

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("Name").value = "";
    document.getElementById("Age").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Address").value = "";

    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
  }
};
