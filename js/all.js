// $.ajax(Api網址).then(function(res){
//     執行動作(e.g.更新網頁)
// })
let offset = 0;
let limit = 10;
// const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?offset=00&limit=205";
let data = [];
let eachPokemon = [];
const ab = [];
let content = document.querySelector('.main');
let outside = document.querySelector('.outside');
let pokemonInfo = document.querySelector('.pokemon_info');
// function downloadList(){
//     $.ajax({
//         url: pokemonUrl,
//         success: function(respond){
//             data = respond.results
//             var len = data.length
//             for(var i=0;i<len;i++){
//                 var url = data[i].url
//                 // console.log(url)
//                 $.ajax(url).then(function(res){
//                     eachPokemon.push(res);
//                     updateData(eachPokemon);
//                     var aa = res.abilities[0].ability.url
//                     $.ajax(aa).then(function(res2){
//                         ab.push(res2)
//                     })
//                 })            
//             }

//         },
//         error: function(){
//             console.log("載入失敗");
//         }
//     })
//     $.ajax({
//         url: eachPokemon
//     })
// }
fetchPokemon();
async function fetchPokemon() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await res.json();
        data.results.forEach(async (n) => {
            let response = await fetch(n.url);
            let jsonData = await response.json();
            eachPokemon.push(jsonData);
            updateData(jsonData, jsonData.id);
            let abilities_ = await fetch(jsonData.abilities[0].ability.url);
            let jsonab = await abilities_.json();
            ab.push(jsonab);
        });
    } catch (e) {
        console.log(e);
    }
}
let beforeHeight = outside.offsetHeight;
function scrollShow() {
    let nowHight = outside.scrollTop + outside.offsetHeight;
    console.log(nowHight - beforeHeight);
    if (nowHight - beforeHeight >= 200 && beforeHeight == outside.offsetHeight) {
        showLoading();
        beforeHeight = nowHight;
    }
    else if (nowHight - beforeHeight > 920) {
        showLoading();
        beforeHeight = nowHight;
    }
    if (offset == 890) {
        outside.removeEventListener("scroll", scrollShow);
    }
};

function showLoading() {
    setTimeout(function () {
        offset = offset + 10;
        fetchPokemon();
    }, 300);
}
outside.addEventListener("scroll", scrollShow);

function sortObj(arr) {
    arr.sort(function (a, b) {
        return a.id > b.id ? 1 : -1;
    })
}
let searchRightAbility = function (a, b) {
    for (let i = 0; i < b.length; i++) {
        if (a.abilities[0].ability.name !== b[i].name) {
            let found = b.find((e) => e.name == a.abilities[0].ability.name);
            return found
        }
        // console.log(a[i].abilities[0].ability.name == b[i].name ? true : false);
    }
}
function updateData(e, i) {
    // let block = '';
    // console.log(i);
    if (e.types.length == 1) {
        //     block += `
        // <div class="pokemon_obj" data-number="${i}" data-type="${e[i].types[0].type.name}">
        //     <div class="icon_pic" data-number="${i}">
        //         <img src="${e[i].sprites.other.home.front_default}" data-number="${i}" alt="" />
        //     </div>
        //     <div class="info" data-number="${i}">
        //         <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
        //     </div>
        // </div>
        // `
        let newMonster = document.createElement("div");
        newMonster.classList.add("pokemon_obj");
        newMonster.setAttribute("data-number", i);
        newMonster.setAttribute("data-type", e.types[0].type.name);
        let iconPic = document.createElement("div");
        iconPic.classList.add("icon_pic");
        iconPic.setAttribute("data-number", i);
        let img = document.createElement("img");
        img.setAttribute("src", e.sprites.other.home.front_default);
        img.setAttribute("data-number", i);
        img.setAttribute("alt", e.name);
        let information = document.createElement("div");
        information.classList.add("info");
        information.setAttribute("data-number", i);
        let h4 = document.createElement("h4");
        h4.setAttribute("data-number", i);
        let h4Text = document.createTextNode(e.name.toUpperCase());
        h4.appendChild(h4Text);
        information.appendChild(h4);
        iconPic.appendChild(img);
        newMonster.appendChild(iconPic);
        newMonster.appendChild(information);
        content.appendChild(newMonster);
    } else {
        //     block += `
        // <div class="pokemon_obj" data-number="${i}" data-type="${e[i].types[0].type.name}" data-type2="${e[i].types[1].type.name}">
        //     <div class="icon_pic" data-number="${i}">
        //         <img src="${e[i].sprites.other.home.front_default}" data-number="${i}" alt="" />
        //     </div>
        //     <div class="info" data-number="${i}">
        //         <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
        //     </div>
        // </div>
        // `
        let newMonster = document.createElement("div");
        newMonster.classList.add("pokemon_obj");
        newMonster.setAttribute("data-number", i);
        newMonster.setAttribute("data-type", e.types[0].type.name);
        newMonster.setAttribute("data-type2", e.types[1].type.name);
        let iconPic = document.createElement("div");
        iconPic.classList.add("icon_pic");
        iconPic.setAttribute("data-number", i);
        let img = document.createElement("img");
        img.setAttribute("src", e.sprites.other.home.front_default);
        img.setAttribute("data-number", i);
        img.setAttribute("alt", e.name);
        let information = document.createElement("div");
        information.classList.add("info");
        information.setAttribute("data-number", i);
        let h4 = document.createElement("h4");
        h4.setAttribute("data-number", i);
        let h4Text = document.createTextNode(e.name.toUpperCase());
        h4.appendChild(h4Text);
        information.appendChild(h4);
        iconPic.appendChild(img);
        newMonster.appendChild(iconPic);
        newMonster.appendChild(information);
        content.appendChild(newMonster);
    }
    // content.innerHTML = block;
}

function PrefixIntegar(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}
content.addEventListener('click', showData, false)
function showData(e) {
    pokemonInfo.style.display = "block";
    sortObj(eachPokemon);
    if (e.target.className == 'main' || e.target.dataset.number == undefined) {
        pokemonInfo.style.display = "none"
        return
    } else if (e.target.dataset.number !== 'undefined') {
        // content.classList.add('pokemon_info');
        var str = '';
        var number = e.target.dataset.number - 1;
        var x = searchRightAbility(eachPokemon[number], ab);
        if (eachPokemon[number].types.length == 1) {
            str = `
            <div class="pokemon_frame">
                <div class="close_btn">
                    <div class="close_body"></div>
                </div>
                <div class="pokemon_profile">
                    <div class="my_photo">
                        <img src="${eachPokemon[number].sprites.other.home.front_default}" width="512" height="512" alt="${eachPokemon[number].name}" />
                    </div>
                    <h4>${eachPokemon[number].name.toUpperCase()}</h4>
                    <div class="personal_data">
                        <p><span>ID:&nbsp&nbsp</span>${PrefixIntegar(eachPokemon[number].id, 3)}</p>
                        <p><span>Height:&nbsp&nbsp</span>${eachPokemon[number].height / 10}m</p>
                        <p><span>Weight:&nbsp&nbsp</span>${eachPokemon[number].weight / 10}kg</p>
                        <div class="attributes"><span class="type type1">${eachPokemon[number].types[0].type.name.toUpperCase()}</span></div>
                        <div class="ability">
                            <p>
                                Ability: 
                            </p>
                            <p>
                                ${x.names[2].name}
                            </p>
                            <p>
                                ${x.flavor_text_entries[27].flavor_text}
                            </p>
                    </div>
                    </div>
                </div>
            </div>`
        } else {
            str = `
            <div class="pokemon_frame">
                <div class="close_btn">
                    <div class="close_body"></div>
                </div>
                <div class="pokemon_profile">
                    <div class="my_photo">
                        <img src="${eachPokemon[number].sprites.other.home.front_default}" width="512" height="512" alt="${eachPokemon[number].name}" />
                    </div>
                    <h4>${eachPokemon[number].name.toUpperCase()}</h4>
                    <div class="personal_data">
                        <p><span>ID:&nbsp&nbsp</span>${PrefixIntegar(eachPokemon[number].id, 3)}</p>
                        <p><span>Height:&nbsp&nbsp</span>${eachPokemon[number].height / 10}m</p>
                        <p><span>Weight:&nbsp&nbsp</span>${eachPokemon[number].weight / 10}kg</p>
                        <div class="attributes">
                            <span class="type type1">${eachPokemon[number].types[0].type.name.toUpperCase()}</span>
                            <span class="type type2">${eachPokemon[number].types[1].type.name.toUpperCase()}</span>
                        </div>
                        <div class="ability">
                            <p>Ability: </p>
                            <p>${x.names[2].name}</p>
                            <p>
                                ${x.flavor_text_entries[27].flavor_text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    const slideAnimate = [
        { transform: 'translateX(-200px)' },
        { transform: ' translateX(0px)' },
    ];
    const slideTiming = {
        duration: 200,
        iterations: 1,
    }

    pokemonInfo.animate(slideAnimate, slideTiming);
    pokemonInfo.innerHTML = str;
    typeClass2();
    let closeBtn = document.querySelector('.close_btn');
    closeBtn.addEventListener('click', function () {
        // content.classList.remove('pokemon_info');
        pokemonInfo.style.display = "none";
        // updateData(eachPokemon);
    })
}

function typeClass2() {
    var obj = document.getElementsByClassName('type');
    for (i = 0; i < obj.length; i++) {
        switch (obj[i].innerText) {
            case 'FIRE':
                obj[i].classList.add('fire')
                break;
            case 'GRASS':
                obj[i].classList.add('grass')
                break;
            case 'POISON':
                obj[i].classList.add('poison')
                break;
            case 'FLYING':
                obj[i].classList.add('flying')
                break;
            case 'WATER':
                obj[i].classList.add('water')
                break;
            case 'BUG':
                obj[i].classList.add('bug')
                break;
            case 'NORMAL':
                obj[i].classList.add('normal')
                break;
            case 'PSYCHIC':
                obj[i].classList.add('psychic')
                break;
            case 'FIGHTING':
                obj[i].classList.add('fighting')
                break;
            case 'ELECTRIC':
                obj[i].classList.add('electric')
                break;
            case 'ROCK':
                obj[i].classList.add('rock')
                break;
            case 'GROUND':
                obj[i].classList.add('ground')
                break;
            case 'STEEL':
                obj[i].classList.add('steel')
                break;
            case 'ICE':
                obj[i].classList.add('ice')
                break;
            case 'GHOST':
                obj[i].classList.add('ghost')
                break;
            case 'FAIRY':
                obj[i].classList.add('fairy')
                break;
            case 'DRAGON':
                obj[i].classList.add('dragon')
                break;
            case 'DARK':
                obj[i].classList.add('dark')
                break;

        }
    }

}
//點擊標籤
const typeBtn = document.querySelector(".tags");
typeBtn.addEventListener("click", function () {
    this.classList.add("openTag");
    document.querySelector(".type_text").style.display = "none";
    document.querySelector(".alltag").style.display = "flex";
    document.querySelector(".alltag").style.opacity = "1";
}, true);
const closeType = document.querySelector(".type_close");
closeType.addEventListener("click", function () {
    typeBtn.classList.remove("openTag");
    document.querySelector(".type_text").style.display = "block";
    document.querySelector(".alltag").style.opacity = "0";
    document.querySelector(".alltag").style.display = "none";
})

// 標籤切換
var tag = document.querySelectorAll('.tag span');
for (let i = 0; i < tag.length; i++) {
    tag[i].addEventListener('click', function (e) {
        var t = e.target.dataset.name
        // console.log(e.target)
        var p = content.querySelectorAll('.pokemon_obj')
        for (b = 0; b < p.length; b++) {
            p[b].style.display = "none"
            if (p[b].dataset.type == t || p[b].dataset.type2 == t) {
                // console.log(p[b])
                p[b].style.display = "block"
            } else if (t == 'all') {
                p[b].style.display = "block"
                beforeHeight = outside.offsetHeight;
            }
        }
    }, false)
}
//篩選
function filterFunction() {
    const input = document.getElementById("myInput");
    const filterItem = document.querySelectorAll(".pokemon_obj h4");
    var p = content.querySelectorAll('.pokemon_obj');
    for (i = 0; i < p.length; i++) {
        if (filterItem[i].textContent.indexOf(input.value.toUpperCase()) > -1) {
            p[i].style.display = "";
        } else {
            p[i].style.display = "none";
        }
    }

}
//圖片
var counter = 5;
const imgChange = document.querySelectorAll('.figure');

timer = 3000, //  秒換圖
    interval = window.setInterval(showNext, timer);

let showImg = function () {
    var imgShow = Math.abs(counter % imgChange.length);
    [].forEach.call(imgChange, (el) => {
        //Array.prototype =[]
        el.classList.remove('g2');
    });
    imgChange[imgShow].classList.add('g2');
}
function showNext() {
    counter++;
    showImg();
}

//LoadingPage

let loading = setInterval(() => {
    $(".loading_page").addClass("closeLoading")
    setTimeout(() => {
        $(".loading_page").css("display", "none")
    }, 1000);
}, 4000)

