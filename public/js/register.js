const request = new XMLHttpRequest();
document.getElementById('name').addEventListener('onchange', (e) => {
    e.preventDefault()
    alert('ok')
})

document.getElementById('registerUsers').addEventListener('click', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const phone = document.getElementById('phone').value
    var isValid = false

    if (name) {
        document.getElementById('checkName').innerHTML = "";
        if (email) {
            document.getElementById('checkEmail').innerHTML = "";
            if (password) {
                document.getElementById('checkPassword').innerHTML = "";
                if (phone) {
                    document.getElementById('checkPhone').innerHTML = "";
                    // console.log(name, email, password, phone)
                    isValid = true
                } else {
                    document.getElementById('checkPhone').innerHTML = "required phone number <br><br>";
                    document.getElementById('checkPhone').style.color = "red";
                    isValid = false
                }
            } else {
                document.getElementById('checkPassword').innerHTML = "required password";
                document.getElementById('checkPassword').style.color = "red";
                isValid = false
            }
        } else {
            document.getElementById('checkEmail').innerHTML = "required Email";
            document.getElementById('checkEmail').style.color = "red";
            isValid = false
        }
    } else {
        document.getElementById('checkName').innerHTML = "required name";
        document.getElementById('checkName').style.color = "red";
        isValid = false
    }

    if (isValid) {

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 201) {
                document.getElementById('messageRegisterText').innerHTML = "Registration Successful";
                document.getElementById('messageRegisterText').style.color = "GREEN";
                // console.log(request.responseText);
            } else {
                document.getElementById('messageRegisterText').innerHTML = "Failed";
                document.getElementById('messageRegisterText').style.color = "RED";
            }
        })
        request.open('POST', 'https://web-api12.herokuapp.com/api/users', true)
            //Send the proper header information along with the request
        request.setRequestHeader('Content-type', 'application/json');


        request.send(JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone
        }))
    }
})