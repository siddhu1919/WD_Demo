let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">dob</th>
    <th class="px-4 py-2">accepted terms?</th>
    </tr>${tableEntries} </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptedTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();

function check() {
  let element = document.getElementById("dob");
  const dob = document.getElementById("dob").value;
  let tap = new Date(dob);
  var month = tap.getMonth();
  var day = tap.getDate();
  var sameday = new Date();
  var age = parseInt(sameday.getFullYear()) - parseInt(tap.getFullYear());
  if (
    sameday.getMonth() < month ||
    (sameday.getMonth() === month && sameday.getDate() < day)
  ) {
    age--;
  }
  let db = age > 18 && age < 55;
  if (db === false) {
    element.setCustomValidity("Age must in between 18-55 ");
    element.reportValidity("");
  } else {
    element.setCustomValidity("");
  }
}