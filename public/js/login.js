const request = new XMLHttpRequest();
document.getElementById('loginUsers').addEventListener('click', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const pass = document.getElementById('pass').value
    var isValid = false

    if (!email) {
        document.getElementById('emailCheck').innerHTML = "required email address";
        document.getElementById('emailCheck').style.color = "red";
        isValid = false
    } else {
        document.getElementById('emailCheck').innerHTML = "";
        if (!pass) {
            document.getElementById('passCheck').innerHTML = "required password<br><br>";
            document.getElementById('passCheck').style.color = "red";
            isValid = false
        } else {
            document.getElementById('passCheck').innerHTML = "";
            isValid = true
        }
    }
    if (isValid) {


        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 202) {
                checkLoginUsers(JSON.parse(request.responseText))
                    // console.log(request.responseText);
            } else if (request.readyState === 4 && request.status === 203) {
                // console.log(request.responseText);
            }
        })
        request.open('POST', 'https://web-api12.herokuapp.com/api/login', true)
            //Send the proper header information along with the request
        request.setRequestHeader('Content-type', 'application/json');


        request.send(JSON.stringify({
            email: email,
            password: pass,
        }))
    }
})


function checkLoginUsers(data) {
    if (localStorage !== "undefined") {
        // Store
        localStorage.setItem('loginUsers', data.jwtToken);
        localStorage.setItem('loginD', JSON.stringify(data));
        location.assign("http://localhost:5501/index.html");
    }
}