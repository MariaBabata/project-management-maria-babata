function checkUserPass(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    // console.log('===', username, password);

//verificam cheile introduse cu o cheie setata de noi
    if(username === 'Maria1' && password === 'abc123') {
        document.getElementById('try_success').style.display = 'block';
        document.getElementById('try_error').style.display = 'none';
        //in caz de success, setam cheia pe logged si continuam redirectarea
        sessionStorage.setItem('userLogged', 'logged');
        window.location.replace('index.html');
    }
    else {
        document.getElementById('try_error').style.display = 'block';
        document.getElementById('try_success').style.display = 'none';
    }
}


function checkLoggedInUser(){
    const userLoggedIn = sessionStorage.getItem('userLogged');
        if (userLoggedIn === 'logged'){
             window.location.replace('index.html');
        }
}

//functionalitate si la apasarea enter
function handleEnter(e) {
    if(e.keyCode === 13){
        checkUserPass();
    }
  }