let form = document.querySelector("form");
let input = document.querySelector("input");
let image = document.querySelector("#image-div");
let mainH1 = document.querySelector("#name");
let type = document.querySelector("#type");
let height = document.querySelector("#height");
let powers = document.querySelector("#abilities");
let health = document.querySelector("#stats");
let about = document.querySelector("#about");
let random = document.querySelector(".random");
let randomBox = document.querySelector(".random-box");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
        let value = input.value.trim()
        getData(value);
})

//API call 
async function getData(pokemonName) {
    let URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    try {
        let response = await fetch(URL);        
        let data = await response.json();
        assignValues(data);
        pokemonType(data);
        abilites(data);
        stats(data);
        aboutPokemon(data);

    } catch (error) {
        alert("Pokemon not found");
    }
}

//assign values
function assignValues(data){
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` //adding images
    image.innerHTML = `<img src=${imgUrl} alt=${data.name}>`
    mainH1.innerHTML = `${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}`
    height.innerHTML = `<span><strong>Height: </strong>${  data.height}</span> <span><strong>Weight:   </strong>${   data.weight}</span>`
}

//check type of pokemon like fire grass
function pokemonType(data){
    if (data.types && data.types.length > 0) {
        type.innerHTML = ""
        for(let i=0; i<data.types.length; i++){//for loop start
            let p = document.createElement("p");
               p.innerText =  data.types[i].type.name
               addcolor(p);
               type.appendChild(p);
        }//for loop end
    }else{
        type.innerText = "Unknown";
    }
}

//check the pokemon has which power
function abilites(data){
    if(data.abilities && data.abilities.length > 0){
        powers.innerHTML = "";
        for(let i=0; i<data.abilities.length; i++){
            let span = document.createElement("span")
            span.innerHTML = `<strong>Power: </strong>${data.abilities[i].ability.name}`
            powers.appendChild(span);
        }
    }else {
        powers.innerText = "No Abilities"
    }
}


//check pokemon hp power
function stats(data){
    if(data.stats && data.stats.length > 0){
        health.innerHTML = ""
        for(let i=0; i<data.stats.length; i++){
            let span = document.createElement("span")
            span.innerHTML = `<strong>${data.stats[i].stat.name}:</strong> ${data.stats[i].base_stat}`
            health.appendChild(span);
        }
    }
}

// print pikachu a electric type pokemon
function aboutPokemon(data){
    about.innerHTML = "";
    about.innerHTML = `<h2>${data.name} a ${data.types[0].type.name} type pokemon</h2>`
}


// add pokemon power color
function addcolor(p){
    if(color === "electric"){
        p.style.backgroundColor = "rgb(250, 192, 0)"
        health.style.backgroundColor = "rgba(250, 192, 0, 0.46)"
    }else if(color === "grass"){
        p.style.backgroundColor = "rgb(62, 161, 40)"
        health.style.backgroundColor= "rgba(62, 161, 40, 0.51)"
    }else if(color === "poison"){
        p.style.backgroundColor = "rgb(146, 65, 204)"
    }else if(color === "normal"){
        p.style.backgroundColor = "rgba(159, 161, 159, 0.72)"
        health.style.backgroundColor= "rgba(159, 161, 159, 0.53)"
    }else if(color === "water"){
        p.style.backgroundColor = "rgb(41, 127, 240)"
        health.style.backgroundColor= "rgba(41, 127, 240, 0.48)"
    }else if(color === "flying"){
        p.style.backgroundColor = "rgb(129, 186, 240)"
    }else if(color === "fairy"){
        p.style.backgroundColor = "rgb(240, 113, 240)"
        health.style.backgroundColor= "rgba(240, 113, 240, 0.47)"
    }else if(color == "bug"){
        p.style.backgroundColor = "rgb(145, 161, 26)"
        health.style.backgroundColor= "rgba(145, 161, 26, 0.48)"
    }else if(color == "fighting"){
        p.style.backgroundColor = "rgb(255, 128, 0)"
    }else if(color == "ground"){
        p.style.backgroundColor = "rgb(145, 82, 33)"
    }else if(color == "rock"){
        p.style.backgroundColor = "rgb(176, 170, 130)"
    }else if(color == "ghost"){
        p.style.backgroundColor = "rgb(145, 161, 26)"
        health.style.backgroundColor= "rgba(145, 161, 26, 0.48)"
    }else if(color == "steel"){
        p.style.backgroundColor = "rgb(95, 160, 184)"
    }else if(color == "stellar"){
        p.style.backgroundColor = "rgb(63, 181, 165)"
    }else if(color == "fire"){
        p.style.backgroundColor = "rgb(230, 39, 39)"
        health.style.backgroundColor= "rgba(230, 39, 39, 0.49)"
    }else if(color == "psychic"){
        p.style.backgroundColor = "rgb(240, 65, 120)"
    }else if(color == "ice"){
        p.style.backgroundColor = "rgb(61, 206, 242)"
    }else if(color == "dragon"){
        p.style.backgroundColor = "rgb(81, 98, 224)"
    }else if(color == "dark"){
        p.style.backgroundColor = "rgb(97, 77, 78)"
    }
}

//random pokemon image generate
random.addEventListener("click",()=>{
    randomBox.innerHTML = "";
    for(let i=0; i<=7; i++){
        let randomNumber = Math.floor(Math.random()*1000);
        Image(randomNumber);
    }

})

function Image(randomNumber){
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNumber}.png`
    let div = document.createElement("div");
    div.innerHTML = `<img src="${imgUrl}">`
    randomBox.appendChild(div);
    Information(randomNumber,div);

}

async function Information(randomNumber,div) {
    let URL = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    let check = await fetch(URL);
    let value = await check.json();
    div.innerHTML += `<p>${value.name}</p>`;
    cardPokemonType(value,div);
}

function cardPokemonType(data,div){
    if (data.types && data.types.length > 0) {
        // div.innerHTML = ""
        for(let i=0; i<data.types.length; i++){//for loop start
            let span = document.createElement("span");
            span.innerText = `${data.types[i].type.name}`
            div.append(span);
               addcolorSecond(span);
        }//for loop end
    }
}

function addcolorSecond(p){
    let color = p.innerText;
    if(color === "electric"){
        p.style.backgroundColor = "rgb(250, 192, 0)"
    }else if(color === "grass"){
        p.style.backgroundColor = "rgb(62, 161, 40)"
    }else if(color === "poison"){
        p.style.backgroundColor = "rgb(146, 65, 204)"
    }else if(color === "normal"){
        p.style.backgroundColor = "rgba(159, 161, 159, 0.72)"
    }else if(color === "water"){
        p.style.backgroundColor = "rgb(41, 127, 240)"
    }else if(color === "flying"){
        p.style.backgroundColor = "rgb(129, 186, 240)"
    }else if(color === "fairy"){
        p.style.backgroundColor = "rgb(240, 113, 240)"
    }else if(color == "bug"){
        p.style.backgroundColor = "rgb(145, 161, 26)"
    }else if(color == "fighting"){
        p.style.backgroundColor = "rgb(255, 128, 0)"
    }else if(color == "ground"){
        p.style.backgroundColor = "rgb(145, 82, 33)"
    }else if(color == "rock"){
        p.style.backgroundColor = "rgb(176, 170, 130)"
    }else if(color == "ghost"){
        p.style.backgroundColor = "rgb(145, 161, 26)"
    }else if(color == "steel"){
        p.style.backgroundColor = "rgb(95, 160, 184)"
    }else if(color == "stellar"){
        p.style.backgroundColor = "rgb(63, 181, 165)"
    }else if(color == "fire"){
        p.style.backgroundColor = "rgb(230, 39, 39)"
    }else if(color == "psychic"){
        p.style.backgroundColor = "rgb(240, 65, 120)"
    }else if(color == "ice"){
        p.style.backgroundColor = "rgb(61, 206, 242)"
    }else if(color == "dragon"){
        p.style.backgroundColor = "rgb(81, 98, 224)"
    }else if(color == "dark"){
        p.style.backgroundColor = "rgb(97, 77, 78)"
    }
}