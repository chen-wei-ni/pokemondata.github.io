// $.ajax(Api網址).then(function(res){
//     執行動作(e.g.更新網頁)
// })

var pokemonUrl = "https://pokeapi.co/api/v2/pokemon?offset=00&limit=200";
var data =[];
var eachPokemon =[];
const ab =[];
var content = document.querySelector('.main');
// var pokemonInfo = document.querySelector('.pokemon_info');
function downloadList(){
    $.ajax({
        url: pokemonUrl,
        success: function(respond){
            data = respond.results
            // console.log(data)
            var len = data.length
            // console.log(len)
            for(var i=0;i<len;i++){
                var url = data[i].url
                // console.log(url)
                $.ajax(url).then(function(res){
                    eachPokemon.push(res);
                    updateData(eachPokemon);
                    var aa = res.abilities[0].ability.url
                    // console.log(res.abilities[0].ability.url)
                    $.ajax(aa).then(function(res2){
                        ab.push(res2)
                    })
                })            
            }
            
        },
        error: function(){
            console.log("載入失敗");
        }
    })
    $.ajax({
        url: eachPokemon
    })
}
downloadList()
function updateData(e){
    var len =e.length;
    // console.log(len)
    var block ='';
    for(i=0;i<len;i++){
        if(e[i].types.length == 1){
        block+=`
        <div class="pokemon_obj" data-number="${i}" data-type="${e[i].types[0].type.name}">
            <div class="icon_pic" data-number="${i}">
                <img src="${e[i].sprites.other.home.front_default}" data-number="${i}" alt="" />
            </div>
            <div class="info" data-number="${i}">
                <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
            </div>
        </div>
        `
    }else{
        block+=`
        <div class="pokemon_obj" data-number="${i}" data-type="${e[i].types[0].type.name}" data-type2="${e[i].types[1].type.name}">
            <div class="icon_pic" data-number="${i}">
                <img src="${e[i].sprites.other.home.front_default}" data-number="${i}" alt="" />
            </div>
            <div class="info" data-number="${i}">
                <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
            </div>
        </div>
        `
    }
    // <div class="info" data-number="${i}">
    //     <h4 data-number="${i}">${e[i].name.toUpperCase()}</h4>
    //     <p data-number="${i}">#${ PrefixIntegar(e[i].id,3)}</p>
    //     <p class="types" data-number="${i}">
    //         <span data-number="${i}" class="type">${e[i].types[0].type.name}</span>
    //         <span data-number="${i}" class="type">${e[i].types[1].type.name}</span>
    //     </p>
    // </div>
    }
    content.innerHTML=block
    // typeClass()
}

function PrefixIntegar(num,length){
    return (Array(length).join('0')+num).slice(-length);
}

content.addEventListener('click',showData,false)
function showData(e){
    // pokemonInfo.style.display = "flex"
    if(e.target.className == 'main'|| e.target.dataset.number == undefined){
        // pokemonInfo.style.display = "none"
        return
    }else if(e.target.dataset.number !== 'undefined'){
        content.classList.add('pokemon_info');
        var str='';
        var number = e.target.dataset.number
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
                    <h4>${eachPokemon[number].name.toUpperCase()}</h4>
                    <div class="personal_data">
                        <p><span>ID:&nbsp&nbsp</span>${PrefixIntegar(eachPokemon[number].id,3)}</p>
                        <p><span>Height:&nbsp&nbsp</span>${eachPokemon[number].height/10}m</p>
                        <p><span>Weight:&nbsp&nbsp</span>${eachPokemon[number].weight/10}kg</p>
                        <div class="attributes"><span class="type type1">${eachPokemon[number].types[0].type.name.toUpperCase()}</span></div>
                        <div class="ability">
                            <p>
                                Ability: 
                            </p>
                            <p>
                                ${ab[number].names[2].name}
                            </p>
                            <p>
                                ${ab[number].flavor_text_entries[27].flavor_text}
                            </p>
                    </div>
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
                    <h4>${eachPokemon[number].name.toUpperCase()}</h4>
                    <div class="personal_data">
                        <p><span>ID:&nbsp&nbsp</span>${PrefixIntegar(eachPokemon[number].id,3)}</p>
                        <p><span>Height:&nbsp&nbsp</span>${eachPokemon[number].height/10}m</p>
                        <p><span>Weight:&nbsp&nbsp</span>${eachPokemon[number].weight/10}kg</p>
                        <div class="attributes">
                            <span class="type type1">${eachPokemon[number].types[0].type.name.toUpperCase()}</span>
                            <span class="type type2">${eachPokemon[number].types[1].type.name.toUpperCase()}</span>
                        </div>
                        <div class="ability">
                            <p>Ability: </p>
                            <p>${ab[number].names[2].name}</p>
                            <p>
                                ${ab[number].flavor_text_entries[27].flavor_text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        // console.log(eachPokemon[number].types.length)
    }
    const slideAnimate = [
        { transform: 'translateX(-200px)' },
        { transform: ' translateX(0px)' },
    ];
    const slideTiming = {
        duration: 200,
        iterations: 1,
    }
    content.animate(slideAnimate,slideTiming)
    content.innerHTML=str
    
    typeClass2()
    var closeBtn = document.querySelector('.close_btn');
    closeBtn.addEventListener('click',function(){
            content.classList.remove('pokemon_info');
            updateData(eachPokemon); 
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
        // console.log(e.target)
        var p = content.querySelectorAll('.pokemon_obj') 
        for(b=0;b<p.length;b++){
            p[b].style.display ="none"
            if(p[b].dataset.type == t || p[b].dataset.type2 == t){
                // console.log(p[b])
                p[b].style.display = "block"
            }else if(t == 'all'){
                p[b].style.display ="block"
            }
        }
    },false)
}
//篩選
function filterFunction(){
    const input = document.getElementById("myInput");
    const filterItem = document.getElementsByTagName('h4');
    var p = content.querySelectorAll('.pokemon_obj');
    console.log(p.length);
    for(i=0;i<p.length;i++){
        // console.log(input.value)
        if(filterItem[i].textContent.indexOf(input.value.toUpperCase())>-1){
            p[i].style.display ="";
        }else{
            p[i].style.display ="none";
        }
    }
    
}

//圖片
var counter = 5;
const imgChange = document.querySelectorAll('.figure');

timer = 3000, //  秒換圖
interval = window.setInterval(showNext, timer); 

let showImg = function(){
    var imgShow = Math.abs(counter%imgChange.length);
    [].forEach.call(imgChange,(el)=>{ 
        //Array.prototype =[]
        el.classList.remove('g2');
    });
    imgChange[imgShow].classList.add('g2');
}
function showNext(){
    counter++;
    showImg();
}

//LoadingPage

let loading = setInterval(()=>{  
    $(".loading_page").addClass("closeLoading")  
    setTimeout(()=>{
        $(".loading_page").css("display","none")
    },1000); 
},4000)

