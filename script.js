const listElement = document.querySelector("#drink_list")
const knap = document.querySelector("#knap")

loadData()

knap.addEventListener("click", () => {
    tilføj()
    saveData()
})

function tilføj(data = null) {

    const listitem = document.createElement("div")

    let number = data?.number || 0
    let history = data?.history || []


    const week = 1000 * 60 * 60 * 24 * 7
    history = history.filter(h => Date.now() - h.time < week)

    listitem.innerHTML = `
        <div class="items">
            <button class="deleteItem">x</button>
            <input type="text" class="navn" placeholder="navn" value="${data?.name || ""}">
            <p class="number">number: ${number}</p>
            <button class="add">tilføj</button>
            <button class="removeBtn">fjern</button>
            <button class="historik">historik</button>
            <div class="historyBox" style="display:none;"></div>
        </div>
    `

    listElement.appendChild(listitem)


    const nameInput = listitem.querySelector(".navn")
    const countText = listitem.querySelector(".number")

    nameInput.addEventListener("change", saveData)

    const add = listitem.querySelector(".add")
    const removeBtn = listitem.querySelector(".removeBtn")
    const deleteItem = listitem.querySelector(".deleteItem")

    add.addEventListener("click", addDrinks)
    removeBtn.addEventListener("click", removeDrinks)

    function addDrinks() {

        const input = document.createElement("input")
        input.type = "number"
        input.placeholder = "tilføj"

        listitem.appendChild(input)

        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                const value = Number(input.value)

                number += value

                history.push({
                    type: "+",
                    value: value,
                    time: Date.now()
                })

                countText.textContent = `number: ${number}`

                input.remove()

                saveData()
            }
        })
    }

    function removeDrinks() {

        const input = document.createElement("input")
        input.type = "number"
        input.placeholder = "fjern"

        listitem.appendChild(input)

        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                const value = Number(input.value)

                number -= value

                history.push({
                    type: "-",
                    value: value,
                    time: Date.now()
                })

                countText.textContent = `number: ${number}`

                input.remove()

                saveData()
            }
        })
    }

    deleteItem.addEventListener("click", () => {
           const confirmDelete = confirm("er du sikker på at du vil slette den?");

    if (confirmDelete) {
       
    
        listitem.remove()
        saveData()
        }
    })

    const historik = listitem.querySelector(".historik")
    const historyBox = listitem.querySelector(".historyBox")

    historik.addEventListener("click", showHistory)

    function showHistory() {

        if (historyBox.style.display === "none") {

            historyBox.style.display = "block"

            historyBox.innerHTML = history
                .map(h => {

                    const date = new Date(h.time)

                    const time =
                        date.toLocaleDateString() +
                        " " +
                        date.toLocaleTimeString()

                    return `<p>${h.type}${h.value} — ${time}</p>`

                })
                .join("")

        } else {

            historyBox.style.display = "none"

        }
    }

    function getData() {

        return {
            number: number,
            history: history,
            name: nameInput.value,
        }
    }

    listitem.getData = getData
}

function saveData() {

    const items = [...listElement.children]
        .filter(el => typeof el.getData === "function")
        .map(el => el.getData())

    localStorage.setItem("drinkTracker", JSON.stringify(items))
}

function loadData() {

    const saved = JSON.parse(localStorage.getItem("drinkTracker")) || []

    saved.forEach(data => tilføj(data))
}
