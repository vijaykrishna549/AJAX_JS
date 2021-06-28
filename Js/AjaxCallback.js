let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(MethodType, url, callback, async = true, data= null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log("State Changed Called. Ready State: "+ 
        xhr.readyState+ " Status:"+xhr.status);
        if(xhr.readyState ==+ 4) {
            //Matching all 200 Series Response
            if(xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            } 
            else if(xhr.status >=400) {
                console.log("Handle 400 Client Error or 500 Server Error" + showTime());
            }
        }
    }
    xhr.open(MethodType, url, async);
    if(data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(MethodType+ " request sent to the server")

}

const getURL = "http://localhost:3000/employees/5";
function getUserDetails(data) {
    console.log("Get User Data: "+data)
}
makeAJAXCall("GET", getURL, getUserDetails);
const deleteURL = "http://localhost:3000/employees/2";
function userDeleted(data){
console.log("User deleted "+data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "Salary": "50000"};
function userAdded(data){
    console.log("User Added "+ data)
}
makeAJAXCall("POST", postURL, userAdded, true, emplData)