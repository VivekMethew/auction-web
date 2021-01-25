const request = new XMLHttpRequest();
document.getElementById('addBidsBtn').addEventListener('click', (e) => {
    e.preventDefault();

    let bidPrice = document.getElementById('bidPrice').value;
    let getUrls = window.location.search.slice(1);
    getUrls = getUrls.replace(/=/g, '":"')
    getUrls = getUrls.replace(/&/g, '","')
    getUrls = '{"' + getUrls + '"}'
    getUrls = JSON.parse(getUrls)
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 201) {
            document.getElementById('bidAddMessage').innerHTML = "Registration Successful";
            document.getElementById('bidAddMessage').style.color = "GREEN";
            // console.log(request.responseText);
            displayNoneMSG()
        } else {
            document.getElementById('bidAddMessage').innerHTML = "Failed";
            document.getElementById('bidAddMessage').style.color = "RED";
            displayNoneMSG()
                // console.log(request)
        }
    })
    request.open('POST', 'https://web-api12.herokuapp.com/api/bids', true)
        //Send the proper header information along with the request
    request.setRequestHeader('Content-type', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('loginUsers')}`)

    request.send(JSON.stringify({
        a_id: getUrls.auc_id,
        a_name: getUrls.aun_name,
        a_price: bidPrice
    }))
})

function displayNoneMSG() {
    setTimeout(() => {
        document.getElementById('bidAddMessage').style.display = "none";
    }, 1000);
}