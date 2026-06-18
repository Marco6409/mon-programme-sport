function openTab(tabName) {
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}