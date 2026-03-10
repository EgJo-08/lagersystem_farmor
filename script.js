const listElement = document.querySelector("#drink_list")
const knap = document.querySelector("#knap")


knap.addEventListener("click", tilføj)


function tilføj() {
    const listitem = document.createElement("div");

    listitem.innerHTML = `
                    <div class="items">
                    <input type="file" class="imageInput" accept="image/png, image/jpeg">
                    <img class="preview" src="">
                    <input type="text" class="navn" placeholder="navn">
                    <p>number:</p>
                    <button>tilføj</button>
                    <button>fjern</button>
                    </div>
                `;
    listElement.appendChild(listitem)
      const fileInput = listitem.querySelector(".imageInput")
    const img = listitem.querySelector(".preview")

    fileInput.addEventListener("change", function(){
        const file = this.files[0]
        if(file){
            img.src = URL.createObjectURL(file)
        }
    })
}

