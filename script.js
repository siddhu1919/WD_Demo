function validateAge(today, dobobj) {
  var age = today.getFullYear() - dobobj.getFullYear();
  var m = today.getMonth() - dobobj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobobj.getDate())) {
    age--;
  }
  return age;
}
let dobelement = document.getElementById("dob");
dobelement.addEventListener("change", () => {
  let [y,m,d] = document.getElementById("dob").value.split("-");
  let dob = new Date(y,m,d);
  let Today = new Date();
  age = validateAge(Today, dob);
  if (age < 18 || age > 55) {
    dobelement.setCustomValidity("age must lie in 18 and 55 years!!!");
 
    return;
  } else {
    dobelement.setCustomValidity("");
  }
});
let form = document.getElementById("user-form");

const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const acceptTerms = `<td class="td">${entry.acceptTerms}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("entrytbale");

  tableDiv.innerHTML = `<table>
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};

// const saveUserFrom = () => {
const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptTerms = document.getElementById("acceptTerms").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

form.addEventListener("submit", saveUserFrom);

displayEntries();
const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));
function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}
