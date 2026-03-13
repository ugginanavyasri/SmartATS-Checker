console.log("Script loaded");

document.getElementById("checkBtn").addEventListener("click", async function(event){

event.preventDefault();   // stops page refresh

console.log("Button clicked");

const fileInput = document.getElementById("resume").files[0];
const jobDescription = document.getElementById("jobDescription").value;

if(!fileInput){
alert("Upload resume first");
return;
}

const formData = new FormData();
formData.append("resume", fileInput);
formData.append("jobDescription", jobDescription);

try{

const response = await fetch("http://localhost:5000/analyze",{
method:"POST",
body:formData
});

const data = await response.json();

console.log("Score received:", data.score);

document.getElementById("score").innerText = data.score + "%";

}catch(error){

console.log("Error:", error);

}

});