function loadPage() {
    if (localStorage.length > 0) {
        document.getElementById('loginHrefId').style.display = "none"
        document.getElementById('user_login_bids').style.display = "block"
        document.getElementById('admin_login_bids').style.display = "block"
        console.log(localStorage.length)
    } else {
        document.getElementById('logoutId').style.display = "none"
        console.log(localStorage.length)
    }
}

loadPage()

document.getElementById('logoutId').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('loginUsers')
    localStorage.removeItem('loginD')
    alert('logout')
    location.assign("http://localhost:5501/index.html");
})