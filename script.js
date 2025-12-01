let originalData = [];
let tableData = [];

const loadBtn = document.getElementById("loadBtn");
const tableBody = document.getElementById("tableBody");
const userTable = document.getElementById("userTable");

// Load JSON 
function loadData() {
  originalData = JSON.parse(JSON.stringify(userDataJSON));
  tableData = JSON.parse(JSON.stringify(userDataJSON));

  renderTable(tableData);

  userTable.style.display = "table";
  loadBtn.textContent = "Refresh Data";
}

//  table rows
function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.middleName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.role}</td>
      <td>${user.address}</td>
      <td>
        <button class="btn-warning" onclick="editRow(${index})">Edit</button>
        <button class="btn-danger" onclick="deleteRow(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Delete row
function deleteRow(index) {
  tableData.splice(index, 1);
  renderTable(tableData);
}

// Edit row
function editRow(index) {
  const row = tableBody.rows[index];
  const user = tableData[index];

  row.innerHTML = `
    <td><input value="${user.firstName}"></td>
    <td><input value="${user.middleName}"></td>
    <td><input value="${user.lastName}"></td>
    <td><input value="${user.email}"></td>
    <td><input value="${user.phone}"></td>
    <td><input value="${user.role}"></td>
    <td><input value="${user.address}"></td>
    <td>
      <button class="btn-primary" onclick="saveRow(${index})">Save</button>
      <button class="btn-danger" onclick="cancelEdit()">Cancel</button>
    </td>
  `;
}

// Saverow
function saveRow(index) {
  const row = tableBody.rows[index];
  const inputs = row.querySelectorAll("input");

  tableData[index] = {
    firstName: inputs[0].value,
    middleName: inputs[1].value,
    lastName: inputs[2].value,
    email: inputs[3].value,
    phone: inputs[4].value,
    role: inputs[5].value,
    address: inputs[6].value
  };

  renderTable(tableData);
}


function cancelEdit() {
  renderTable(tableData);
}

// Load
loadBtn.addEventListener("click", loadData);
