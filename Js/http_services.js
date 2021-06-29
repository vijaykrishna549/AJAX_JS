// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(MethodType, url, async = true, data= null){
    return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log("State Changed Called. Ready State: "+ 
        xhr.readyState+ " Status:"+xhr.status);
        if(xhr.status.toString().match('^[2][0-9]{2}$')) {
            //Matching all 200 Series Response
            resolve(xhr.responseText);
            } 
            else if(xhr.status.toString().match('^[4,5][0-9]{2}$')) {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
            console.log("XHR Failed");
            }
        }
    xhr.onerror = function(){
        reject ({
            status: this.status,
            statusText: this.statusText
        });
    };
        
    xhr.open(MethodType, url, async);
    if(data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(MethodType+ " request sent to the server");
    });

}

// const getURL = "http://localhost:3000/employees/5";
//  makePromiseCall("GET", getURL, true)
//  .then (responseText => {
//     console.log("Get User Data: "+ responseText)
// })
// .catch(error => 
//     console.log("GET User Error: "+JSON.stringify(error)));


// const deleteURL = "http://localhost:3000/employees/2";
//  makePromiseCall("DELETE", deleteURL, false)
//  .then(responseText => {
//     console.log("User Deleted: "+ responseText)
// })
// .catch(error => 
//     console.log("GET Error Status: "+JSON.stringify(error)));

// const postURL = "http://localhost:3000/employees";
// const emplData = {"name": "Sam","Salary": "8000"};
//  makePromiseCall("POST", postURL, true, emplData)
//  .then(responseText => {
//     console.log("User Addeded: "+ responseText)
// })
// .catch(error => 
//     console.log("POST Error Status: "+JSON.stringify(error)));