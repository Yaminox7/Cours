var hyperLinks = document.getElementsByClassName("links");
var start_btn = document.getElementById("start");
var start_link = start_btn.parentElement;

document.body.onload = () => {
  if (localStorage.getItem("link")) {
    start_btn.innerHTML = "Continuer <span class='italic'>"+ localStorage.getItem("text")  + "</span>";
    start_link.href = localStorage.getItem("link");
  }
    Array.from(hyperLinks).forEach((element) => {
      element.onclick = () => {
        localStorage.setItem("link", element.href);
        text = element.className.indexOf("one-only") > -1 ? element.innerText : element.parentElement.parentElement.getElementsByTagName("a")[0].innerText;  
        localStorage.setItem("text", text);
        sessionStorage.setItem("connected", true);
      };
    });
};