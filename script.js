const listElement = document.querySelector("#drink_list")
const knap = document.querySelector("#knap")




knap.addEventListener("click", tilføj)


function tilføj() {
    const listitem = document.createElement("div");
let number = 0


    listitem.innerHTML = `
                    <div class="items">
                    <input type="file" class="imageInput" accept="image/png, image/jpeg">
                    <img class="preview" src="">
                    <input type="text" class="navn" placeholder="navn">
                    <p>number:${number}</p>
                    <button class="add">tilføj</button>
                    <button class="remove">fjern</button>
                    </div>
                `;
    listElement.appendChild(listitem)
    const fileInput = listitem.querySelector(".imageInput")
    const img = listitem.querySelector(".preview")

    fileInput.addEventListener("change", function () {
        const file = this.files[0]
        if (file) {
            img.src = URL.createObjectURL(file)
        }
    })
    const countText = listitem.querySelector("p")

    let add = listitem.querySelector(".add")
    let remove = listitem.querySelector(".remove")

    add.addEventListener("click", number_drinks)

    function number_drinks() {
    const number_tilføj = document.createElement("input")
    number_tilføj.type = "number"
    number_tilføj.placeholder = "tilføj"

    listitem.appendChild(number_tilføj)

    number_tilføj.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {

            number += Number(number_tilføj.value)

            countText.textContent = `number: ${number}`

            number_tilføj.remove() 
        }
    })

    remove.addEventListener("click", number_drinks_remove)
     function number_drinks_remove() {
    const number_tilføj = document.createElement("input")
    number_tilføj.type = "number"
    number_tilføj.placeholder = "fjern"

    listitem.appendChild(number_tilføj)

    number_tilføj.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {

            number -= Number(number_tilføj.value)

            countText.textContent = `number: ${number}`

            number_tilføj.remove() 
        }
    })
} 
}

}