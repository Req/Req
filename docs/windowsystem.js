function log(...args) {
    console.log(">> ", ...args)
    if (typeof(args[0]) === "string") {
        const c = document.querySelector("#console")
        c.innerHTML = "<p>"+args[0]+"</p>" + c.innerHTML
    }
}

let windows = []
function startProgram(e) {
    let id = e.target.dataset

    if (!id) return log("no")

    log(id)
    let win = document.createElement("div")
    win.classList.add("box", "window")
    win.innerText = e.target.innerText
    win.draggable = true
    document.querySelector("#desktop").append(win)
    windows.push(win)
}

function init() {
    log("Initializing window system...")

    document
        .querySelector("#startmenu")
        .addEventListener("click", startProgram)
}


document
    .getRootNode()
    .addEventListener("DOMContentLoaded", init)