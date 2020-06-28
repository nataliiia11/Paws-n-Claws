//Text Fields
const contentTextField = document.getElementById("message");

//Buttons
const sharePostButton = document.getElementById("share-button");


sharePostButton.addEventListener("click", () => {
    console.log("fired");
    fetch("/post/new", {
        method:'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            content : contentTextField.value
        })
    }).then((response) => {
        if(response.ok) {
            window.location.reload();
        }
    })
});