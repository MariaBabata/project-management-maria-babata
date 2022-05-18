function doStartupConfig(){
    checkUserLogin();
    createTable();
}

function checkUserLogin() {
    const userLoggedIn = sessionStorage.getItem('userLogged');
        if (userLoggedIn !== 'logged'){
        window.location.replace('login.html');
        } 
}


const prjFromLocalStorage = localStorage.getItem('projectsArr');
// console.log(prjFromLocalStorage);
let projectsArr = prjFromLocalStorage ? JSON.parse(prjFromLocalStorage) : [];
//evitam eroarea de null prin conditionarea unui array gol

function createTable(){

if(projectsArr && projectsArr.length === 0){
    document.getElementById('no_empl_container').style.display = 'block';
    document.getElementById('table_container').style.display = 'none';
} else {
    document.getElementById('no_empl_container').style.display = 'none';
    document.getElementById('table_container').style.display = 'block';

    const table = document.getElementById('projects_table');
    let tableStr = '<tr><th>No.</th><th>Project Name</th><th>Start date</th><th>Duration (months)</th><th> Required no. employees</th><th>Employees working</th><th>Actions</th></tr>'; 
    projectsArr.forEach((project, i) => {   
        tableStr += createRow(project, i);
    });
    
    table.innerHTML = tableStr;
}

}

function createRow(project, i){
    let rowStr = '<tr>';

    rowStr += '<td>' + (i + 1) + '</td>';
    rowStr += '<td>' + project.name + '</td>';
    rowStr += '<td>' + project.start_date + '</td>';
    rowStr += '<td>' + project.duration + '</td>';
    rowStr += '<td>' + project.no_pers + '</td>';
    rowStr += '<td>' + project.employees + '</td>';
    rowStr += '<td><button class="editButton" onclick="editPrj(' + i +')">Edit</button><button class="deleteButton" onclick="deletePrj(' + i +')">Del</button></td>';
    rowStr += '</tr>';
    return rowStr;
}


function displayAddForm(resetForm) {
    document.getElementById('add_form_container').style.display = 'block';
    document.getElementById('add_container').style.display = 'none';

    document.getElementById('add_button').style.display = 'inline-block';
    document.getElementById('edit_button').style.display = 'none';

    if(resetForm) {
        document.getElementById('add_form').reset();
    }

    const validationKeys = Object.keys(validationObj);
    validationKeys.forEach(key => {
        validationObj[key] = false;
    });  

    checkValidationObj();
    
}

let initialValidationObj = {
    name: false,
    start_date: false,
    duration: false,
    no_pers: false,
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

function checkStartDate() {
    const html_el = document.getElementById('start_date');
    const el_value = html_el.value;

    let pattern = /^\d{4}-\d{2}-\d{2}$/g;

    if(el_value === '' || !pattern.test(el_value)){
        document.getElementById('start_date_err').style.display = 'block';
        html_el.classList.add('input_err');
        validationObj['start_date'] = false;
    } else {
        document.getElementById('start_date_err').style.display = 'none';
        html_el.classList.remove('input_err');
        validationObj['start_date'] = true;
    }
    checkValidationObj();
}


function checkElement(element) {
    const html_el = document.getElementById(element);
    const el_value = html_el.value;
    const end_range = (element === 'duration') ? 36 : 10;

    
    if(el_value === '' || isNaN(el_value) || el_value <1 || el_value > end_range){
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


function cancelAddForm() {
    const userConfirm = confirm('Are you sure you want to cancel adding a new project?');
    // console.log(userConfirm);
    if(userConfirm){
        clearAndHideForm();
    }
}

function clearAndHideForm(){
    document.getElementById('add_form').reset(); //stergere date
    document.getElementById('add_form_container').style.display = 'none';
    document.getElementById('add_container').style.display = 'block';
}

function addNewProject() {
 
    const newPrjObj = {
      name: document.getElementById('name').value,
      start_date: document.getElementById('start_date').value,
      duration: document.getElementById('duration').value,
      no_pers: document.getElementById('no_pers').value,
      employees: 0,
    }

    projectsArr.push(newPrjObj);
    localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
    createTable();
    clearAndHideForm();

}

function deletePrj(i){
    if(confirm('Are you sure you want to delete ' + projectsArr[i].name + '?')){
        projectsArr.splice(i, 1);
        localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
        createTable();
    }
}

let savePrjIndex = 0;

function editPrj(i) {
    savePrjIndex = i;
    displayAddForm(false);
  
    document.getElementById('add_button').style.display = 'none';
    document.getElementById('edit_button').style.display = 'inline-block';
    const validationKeys = Object.keys(validationObj);
    validationKeys.forEach(key => {
        document.getElementById(key).value = projectsArr[i][key];
        validationObj[key] = true;
    });
    checkValidationObj();
}

function saveEditProject() {
    const validationKeys = Object.keys(validationObj);
    validationKeys.forEach(key => {
        projectsArr[savePrjIndex][key] = document.getElementById(key).value;
    });
   localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
   createTable();
   document.getElementById('add_form_container').style.display = 'none';
   document.getElementById('add_container').style.display = 'block';
   



}
