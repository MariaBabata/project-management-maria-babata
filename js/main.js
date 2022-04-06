function doStartupConfig(){
    checkUserLogin();
    createTable();
}

function checkUserLogin() {
    const userLoggedIn = sessionStorage.getItem('userLogged');
    // console.log(userLoggedIn);
  
        if (userLoggedIn !== 'logged'){
        //'logged' - cheie de tip string - verifica daca utilizatorul este logat
        window.location.replace('login.html');

        } 
}

// let employeesArr = [
//     {
//         name: 'Alex',
//         age: '27',
//         gender: 'M',
//         project: null,
//         birthdate: '1994-01-10',
//         hired: '2020-10-05',
//         phone: '0722112233',
//         email: 'alex@gmail.ro'
//     },
//     {
//         name: 'Maria',
//         age: '22',
//         gender: 'F',
//         project: null,
//         birthdate: '2000-06-06',
//         hired: '2021-01-17',
//         phone: '0723456789',
//         email: 'maria@yahoo.com'
//     },
//     {
//         name: 'Madalina',
//         age: '25',
//         gender: 'F',
//         project: null,
//         birthdate: '1997-09-15',
//         hired: '2020-09-20',
//         phone: '0722112233',
//         email: 'mada@yahoo.ro'
//     }
// ];

    // let employeesArr = [];
    const emplFromLocalStorage = localStorage.getItem('employeesArr');
    let employeesArr = JSON.parse(emplFromLocalStorage);



function createTable(){

    if(employeesArr && employeesArr.length === 0){
        document.getElementById('no_empl_container').style.display = 'block';
        document.getElementById('table_container').style.display = 'none';
    } else {

        const table = document.getElementById('employees_table');

        let tableStr = '<tr><th>No.</th><th>Name</th><th>Age</th><th>Gender</th><th>Project</th><th>Birthdate</th><th>Hired at</th><th>Phone</th><th>Email</th><th>Actions</th></tr>'; 
        employeesArr.forEach((person, i) => {
            // console.log(i);
            // console.log(person);
            
            tableStr += createRow(person, i);
        });
        
        table.innerHTML = tableStr;
    }

}


function deleteEmpl(i){
    // console.log('index:', i);

    if(confirm('Are you sure you want to delete ' + employeesArr[i].name + '?')){
        // console.log('deleting...');
        employeesArr.splice(i, 1);
        localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
        createTable();
    }
}

function editEmpl(i) {
    displayAddForm();

    document.getElementById('add_button').style.display = 'none';
    document.getElementById('edit_button').style.display = 'inline-block';
    const validationKeys = Object.keys(validationObj);
    validationKeys.forEach(key => {
        document.getElementById(key).value = employeesArr[i][key];
        validationObj[key] = true;
    });

    checkValidationObj();

    // document.getElementById("name").value = employeesArr[i].name;
    // document.getElementById("age").value = employeesArr[i].age;
    // document.getElementById("gender").value = employeesArr[i].gender;
    // document.getElementById("birthdate").value = employeesArr[i].birthdate;
    // document.getElementById("phone").value = employeesArr[i].phone;
    // document.getElementById("email").value = employeesArr[i].email;
}

function createRow(person, i){
    let rowStr = '<tr>';

    const projectName = person.project ? person.project : '-';
    rowStr += '<td>' + (i + 1) + '</td>';
    rowStr += '<td>' + person.name + '</td>';
    rowStr += '<td>' + person.age + '</td>';
    rowStr += '<td>' + person.gender + '</td>';
    rowStr += '<td>' + projectName + '</td>';
    rowStr += '<td>' + person.birthdate + '</td>';
    rowStr += '<td>' + person.hired + '</td>';
    rowStr += '<td>' + person.phone + '</td>';
    rowStr += '<td>' + person.email + '</td>';
    rowStr += '<td><button class="editButton" onclick="editEmpl(' + i +')">Edit</button><button class="deleteButton" onclick="deleteEmpl(' + i +')">Del</button></td>';
    rowStr += '</tr>';
    return rowStr;
}

function initialDisplayAddForm(){
    document.getElementById('add_button').style.display = 'inline-block';
    document.getElementById('edit_button').style.display = 'none';
    displayAddForm();
}

function displayAddForm() {
    document.getElementById('add_form_container').style.display = 'block';
    document.getElementById('add_container').style.display = 'none';

    const validationKeys = Object.keys(validationObj);
    validationKeys.forEach(key => {
        validationObj[key] = false;
    });  

    checkValidationObj();
    
}

function cancelAddForm() {
    const userConfirm = confirm('Are you sure you want to cancel adding a new employee?');
    // console.log(userConfirm);
    if(userConfirm){
        clearAndHideForm();
    }
}

function clearAndHideForm(){
    document.getElementById('add_form').reset(); 
    document.getElementById('add_form_container').style.display = 'none';
    document.getElementById('add_container').style.display = 'block';
}



function addNewUser() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    //month: lunile incep de la 0!
    const month = newDate.getMonth() + 1;
    const monthToAdd = (month < 10) ? '0' + month : month;

    const day = newDate.getDate();


    const newEmplObj = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      birthdate: document.getElementById('birthdate').value,
      gender: document.getElementById('gender').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      hired: year + '-' + monthToAdd + '-' + day,
      project: null,
    }

    employeesArr.push(newEmplObj);
    localStorage.setItem('employeesArr', JSON.stringify(employeesArr));
    createTable();
    clearAndHideForm();

}

let initialValidationObj = {
    name: false,
    age: false,
    gender: false,
    birthdate: false,
    phone: false,
    email: false,
};

let validationObj = initialValidationObj;

function checkValidationObj(){
    const validationKeys = Object.keys(validationObj);
    let flag = true;

    validationKeys.forEach(keys => {
        if(!validationObj[keys]){
            flag = false;
        }
    });

    if(flag) {
        document.getElementById('add_button').disabled = false;
        document.getElementById('edit_button').disabled = false;
    } else{
        document.getElementById('add_button').disabled = true;
        document.getElementById('edit_button').disabled = true;
    }
}

function checkName(){
    const name_el = document.getElementById('name');
    const name = name_el.value;
    // console.log(name);
     if(name === '' || name === null){
         document.getElementById('name_err').style.display = 'block';
         name_el.classList.add("input_err");
         validationObj.name = false;
     } else{
         document.getElementById('name_err').style.display = 'none';
         name_el.classList.remove("input_err");
         validationObj.name = true;
     }
     checkValidationObj();
}

function checkAge() {
    const age_el = document.getElementById('age');
    const age = age_el.value;

    if(age !== '' && !isNaN(age) && age >= 18 && age <=65){
        document.getElementById('age_err').style.display = 'none';
        age_el.classList.remove('input_err');
        validationObj.age = true;
    } else {
        document.getElementById('age_err').style.display = 'block';
        age_el.classList.add('input_err');
        validationObj.age = false;
    }
    checkValidationObj();
}

function checkGender(){
    const gender_el = document.getElementById('gender');
    const gender = gender_el.value;

    if(gender !=='' && (gender === 'F' || gender === 'M')){
        document.getElementById('gender_err').style.display = 'none';
        gender_el.classList.remove('input_err');
        validationObj.gender = true;
    } else{
        document.getElementById('gender_err').style.display = 'block';
        gender_el.classList.add('input_err');
        validationObj.gender = false;
    }
    checkValidationObj();
}

function checkBirthdate(){
    const birthdate_el = document.getElementById('birthdate');
    const birthdate = birthdate_el.value;
    const pattern = /^\d{4}-\d{2}-\d{2}$/g;
  
    const birthArr = birthdate.split("-");
    const day = birthArr[2];
    const month = birthArr[1];
    const year = birthArr[0];
        
    const day_pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
    const month_pattern = /^(0[1-9]|1[0-2])$/g;
    const year_pattern = /^(195[7-9]|19[6-9][0-9]|200[0-4])$/g;
    //  console.log(day_pattern.test(day));
    //  console.log(month_pattern.test(month));
    //  console.log(year_pattern.test(year));
    if(birthdate !== '')
        if(pattern.test(birthdate) && day_pattern.test(day) && month_pattern.test(month) && year_pattern.test(year)){
        document.getElementById('birthdate_err').style.display = 'none';
        birthdate_el.classList.remove('input_err');
        validationObj.birthdate = true;
        
    } else{
        document.getElementById('birthdate_err').style.display = 'block';
        birthdate_el.classList.add('input_err');
        validationObj.birthdate = false;
    }
    checkValidationObj();
}

function checkElement(element){
    const html_el = document.getElementById(element);
    const el_value = html_el.value;
    let pattern;

    if(element  === 'phone'){
        pattern  = /^(07)\d{8}$/g;
    } else if(element === 'email'){
        pattern = /^[a-zA-Z0-9._-]+@(yahoo|gmail)\.(ro|com)$/g;
        // console.log(pattern.test(el_value));
    }

    if(el_value === '' || !pattern.test(el_value)){
        document.getElementById(element + '_err').style.display = 'block';
        html_el.classList.add('input_err');
        validationObj[element] = false;
    } else {
        document.getElementById(element + '_err').style.display = 'none';
        html_el.classList.remove('input_err');
        validationObj[element] = true;
    }
    checkValidationObj();
}

