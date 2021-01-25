const request = new XMLHttpRequest();
document.getElementById('add_auctions').addEventListener('click', (e) => {
    e.preventDefault()
    let a_type = document.getElementById('a_type').value; //a_type
    let a_name = document.getElementById('a_name').value; // a_name
    let a_price = document.getElementById('a_price').value; // a_price
    let desc = document.getElementById('desc').value; // desc
    let end_time = document.getElementById('end_time').value; // end_time
    let end_date = document.getElementById('end_date').value; // end_time
    let img_url = document.getElementById('img_url').value; //img_url
    const isValid = false

    // console.log(a_name)

    if (a_type) {
        document.getElementById('aucType').innerHTML = "";
        if (img_url) {
            document.getElementById('aucImgUrl').innerHTML = "";
            if (a_name) {
                document.getElementById('aucName').innerHTML = "";
                if (a_price) {
                    document.getElementById('aucPrice').innerHTML = "";
                    if (end_time) {
                        document.getElementById('aucTime').innerHTML = "";
                        if (end_date) {
                            document.getElementById('aucDate').innerHTML = "";
                            if (desc) {
                                document.getElementById('aucDesc').innerHTML = "";
                                const auction = {
                                    a_type: a_type,
                                    a_name: a_name,
                                    a_price: a_price,
                                    e_date: end_date,
                                    e_time: end_time,
                                    img_urls: img_url,
                                    desc: desc
                                }
                                loadCheckValid(auction)
                            } else {
                                document.getElementById('aucDesc').innerHTML = "Requied auction description <br>";
                                document.getElementById('aucDesc').style.color = "RED";
                            }
                        } else {
                            document.getElementById('aucDate').innerHTML = "Requied auction date";
                            document.getElementById('aucDate').style.color = "RED";
                        }
                    } else {
                        document.getElementById('aucTime').innerHTML = "Requied auction time";
                        document.getElementById('aucTime').style.color = "RED";
                    }
                } else {
                    document.getElementById('aucPrice').innerHTML = "Requied auction price";
                    document.getElementById('aucPrice').style.color = "RED";
                }
            } else {
                document.getElementById('aucName').innerHTML = "Requied auction name";
                document.getElementById('aucName').style.color = "RED";
            }
        } else {
            document.getElementById('aucImgUrl').innerHTML = "Requied auction img url";
            document.getElementById('aucImgUrl').style.color = "RED";
        }
    } else {
        document.getElementById('aucType').innerHTML = "Requied auction type";
        document.getElementById('aucType').style.color = "RED";
    }


})

function loadCheckValid(auc) {
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 201) {
            document.getElementById('aucTextMessage').innerHTML = "Registration Successful";
            document.getElementById('aucTextMessage').style.color = "GREEN";
            // console.log(request.responseText);
            // loadAuctions()
            location.assign("http://localhost:5501/administration.html");
        } else {
            document.getElementById('aucTextMessage').innerHTML = "Failed";
            document.getElementById('aucTextMessage').style.color = "RED";
            // console.log(request)
        }
    })
    request.open('POST', 'https://web-api12.herokuapp.com/api/auctions', true)
        //Send the proper header information along with the request
    request.setRequestHeader('Content-type', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('loginUsers')}`)

    request.send(JSON.stringify(auc))
}

async function loadAuctions() {
    await request.addEventListener('readystatechange', () => {
        if (request.readyState === 4) {
            // console.log(JSON.parse(request.responseText));
            createElements(JSON.parse(request.responseText))
        }
    })


    request.open('GET', 'https://web-api12.herokuapp.com/api/auctions', true)
        //Send the proper header information along with the request
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('loginUsers')}`)

    request.send()
}

function createElements(data) {

    if (data.success) {

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        console.log(data.all_auctions.length)


        // creating all cells
        for (var i = 0; i < data.all_auctions.length; i++) {

            let endTime = "12:11 UUR"
                // creates a table row
            var row = document.createElement("tr");

            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            var i1 = document.createElement("i");
            var i2 = document.createElement("i");

            i1.className = "fa fa-pencil"
            i1.id = data.all_auctions[i].auc_id
            i2.className = "fa fa-trash"
            i2.id = data.all_auctions[i].auc_id

            var cellText1 = document.createTextNode(data.all_auctions[i].a_name);
            var cellText2 = document.createTextNode(endTime);
            // var cellText3 = document.createTextNode('event');



            cell1.appendChild(cellText1);
            cell2.appendChild(cellText2);

            cell3.appendChild(i1);
            cell3.appendChild(i2);

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            tblBody.appendChild(row)

            // add the row to the end of the table body
            document.getElementById("auctionList").appendChild(tblBody);
        }
    } else {
        // alert(data.message)
    }
}

loadAuctions();