// $.ajax(Api網址).then(function(res){
//     執行動作(e.g.更新網頁)
// })

var pokemonUrl = "https://pokeapi.co/api/v2/pokemon?offset=00&limit=102";
var data =[];
var eachPokemon =[];
var content = document.querySelector('.main');
var pokemonInfo = document.querySelector('.pokemon_info');
function downloadList(){
    $.ajax({
        url: pokemonUrl,
        success: function(respond){
            data = respond.results
            console.log(data)
            var len = data.length
            console.log(len)
            for(var i=0;i<len;i++){
                var url = data[i].url
                $.ajax(url).then(function(res){
                    eachPokemon.push(res)
                    updateData(eachPokemon)
                })                
            }
            console.log(eachPokemon)
        },
        error: function(){
            console.log("載入失敗")
        }

    })
}
downloadList()
function updateData(e){
    // console.log(e)
    var len =e.length;
    var block ='';
    for(i=0;i<len;i++){
        if(e[i].types.length == 1){
        block+=`
        <div class="pokemon_obj" data-number="${i}" data-type="${e[i].types[0].type.name}">
            <div class="info" data-number="${i}">
                <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
                <p data-number="${i}">#${ PrefixIntegar(e[i].id,3)}</p>
                <p class="types" data-number="${i}">
                    <span data-number="${i}" class="type">${e[i].types[0].type.name}</span>
                </p>
            </div>
            <div class="icon_pic" data-number="${i}">
                <img src="${e[i].sprites.other.home.front_default}" data-number="${i}" alt="" />
            </div>
        </div>
        `
    }else{
        block+=`
        <div class="pokemon_obj" data-number="${i}" data-type="${e[i].types[0].type.name}" data-type2="${e[i].types[1].type.name}">
            <div class="info" data-number="${i}">
                <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
                <p data-number="${i}">#${ PrefixIntegar(e[i].id,3)}</p>
                <p class="types" data-number="${i}">
                    <span data-number="${i}" class="type">${e[i].types[0].type.name}</span>
                    <span data-number="${i}" class="type">${e[i].types[1].type.name}</span>
                </p>
            </div>
            <div class="icon_pic" data-number="${i}">
                <img src="${e[i].sprites.other.home.front_default}" data-number="${i}" alt="" />
            </div>
        </div>
        `
    }
    }
    content.innerHTML=block
    typeClass()
}

function PrefixIntegar(num,length){
    return (Array(length).join('0')+num).slice(-length);
}

content.addEventListener('click',showData,false)
function showData(e){
    // console.log(e.target.nodeName)
    pokemonInfo.style.display = "flex"
    if(e.target.className == 'main'){
        pokemonInfo.style.display = "none"
        return
    }else if(e.target.dataset.number !== 'undefined'){
        pokemonInfo.style.backgroundColor = "#00000056"
        var str='';
        var number = e.target.dataset.number
        console.log(e)
        if(eachPokemon[number].types.length == 1){
            str = `
            <div class="pokemon_frame">
                <div class="close_btn">
                    <div class="close_body"></div>
                </div>
                <div class="pokemon_profile">
                    <div class="my_photo">
                        <img src="${eachPokemon[number].sprites.other.home.front_default}" alt="" />
                    </div>
                    <div class="personal_data">
                        <h4>${eachPokemon[number].name.toUpperCase()}</h4>
                        <p><span>ID: </span>${PrefixIntegar(eachPokemon[number].id,3)}</p>
                        <p><span>Height: </span>${eachPokemon[number].height/10}m</p>
                        <p><span>Weight: </span>${eachPokemon[number].weight/10}kg</p>
                        <div class="attributes"><span class="type type1">${eachPokemon[number].types[0].type.name.toUpperCase()}</span></div>
                    </div>
                </div>
            </div>`
        }else{
            str = `
            <div class="pokemon_frame">
                <div class="close_btn">
                    <div class="close_body"></div>
                </div>
                <div class="pokemon_profile">
                    <div class="my_photo">
                        <img src="${eachPokemon[number].sprites.other.home.front_default}" alt="" />
                    </div>
                    <div class="personal_data">
                        <h4>${eachPokemon[number].name.toUpperCase()}</h4>
                        <p><span>ID: </span>${PrefixIntegar(eachPokemon[number].id,3)}</p>
                        <p><span>Height: </span>${eachPokemon[number].height/10}m</p>
                        <p><span>Weight: </span>${eachPokemon[number].weight/10}kg</p>
                        <div class="attributes"><span class="type type1">${eachPokemon[number].types[0].type.name.toUpperCase()}</span>
                        <span class="type type2">${eachPokemon[number].types[1].type.name.toUpperCase()}</span></div>
                        </div>
                    </div>
            </div>`
        }
        // console.log(eachPokemon[number].types.length)
    }
    pokemonInfo.innerHTML=str
    typeClass2()
    var closeBtn = document.querySelector('.close_btn')
    closeBtn.addEventListener('click',function(){
        pokemonInfo.style.display = "none"
    })
}

function typeClass(){
    var obj = document.getElementsByClassName('type');
    for (i=0;i<obj.length;i++){
        switch(obj[i].innerText){
            case 'fire':
                obj[i].classList.add('fire')
                break;
            case 'grass':
                obj[i].classList.add('grass')
                break;
            case 'poison':
                obj[i].classList.add('poison')
                break;
            case 'flying':
                obj[i].classList.add('flying')
                break;
            case 'water':
                obj[i].classList.add('water')
                break;
            case 'bug':
                obj[i].classList.add('bug')
                break;
            case 'normal':
                obj[i].classList.add('normal')
                break;
            case 'psychic':
                obj[i].classList.add('psychic')
                break;
            case 'fighting':
                obj[i].classList.add('fighting')
                break;
            case 'electric':
                obj[i].classList.add('electric')
                break;
            case 'rock':
                obj[i].classList.add('rock')
                break;
            case 'ground':
                obj[i].classList.add('ground')
                break;
            case 'steel':
                obj[i].classList.add('steel')
                break;
            case 'ice':
                obj[i].classList.add('ice')
                break;
            case 'ghost':
                obj[i].classList.add('ghost')
                break;
            case 'fairy':
                obj[i].classList.add('fairy')
                break;
            case 'dragon':
                obj[i].classList.add('dragon')
                break;
            case 'dark':
                obj[i].classList.add('dark')
                break;

        }
    }
    
}

function typeClass2(){
    var obj = document.getElementsByClassName('type');
    for (i=0;i<obj.length;i++){
        switch(obj[i].innerText){
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

// 標籤切換
var tag = document.querySelectorAll('.tag span');
console.log(tag)
for (i=0 ; i< tag.length; i++){
    tag[i].addEventListener('click',function(e){
        var t = e.target.dataset.name
        console.log(e.target)
        var p = content.querySelectorAll('.pokemon_obj') 
        for(b=0;b<p.length;b++){
            p[b].style.display ="none"
            if(p[b].dataset.type == t || p[b].dataset.type2 == t){
                console.log(p[b])
                p[b].style.display = "flex"
            }else if(t == 'all'){
                p[b].style.display ="flex"
            }
        }
    },false)
}