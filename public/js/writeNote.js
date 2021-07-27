console.log("wow");
let googleUser;

window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in as', user.displayName);
            googleUser = user;
            document.querySelector("#welcome").innerHTML = "Welcome " + user.displayName;
        } else {
            window.location = 'index.html'
        }
    })
}



function handleNoteSubmit() {
    const title = document.querySelector("#noteTitle").value;
    const text = document.querySelector("#noteText").value;
    
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1
    const day = d.getDate();
    const hour = d.getHours();
    const mins = d.getMinutes();
    const created = day + "/" + month + "/" + year + " " + hour + ":" + mins;

    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: title,
        text: text,
        created: created
    });
    console.log('pushed');
    document.querySelector("#noteTitle").value = "";
    document.querySelector("#noteText").value = "";
}


