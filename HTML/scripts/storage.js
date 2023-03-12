if (!sessionStorage.getItem("connected")) {
    var btn = document.getElementById("return");
    var anchor = btn.parentElement;
    anchor.parentElement.removeChild(anchor);
}
console.log(sessionStorage.getItem("connected"));