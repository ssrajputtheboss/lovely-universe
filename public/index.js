/*let cards = [{
    name:'Andromeda Galaxy',
    imgurl:'images/andromeda_galaxy.jpg',
    about:'andromeda galaxy'
},{
    name:'Messier 81',
    imgurl:'images/messier_81_galaxy.jpg',
    about:'Messier 81 galaxy'
},{
    name:'Whirlpool Galaxy',
    imgurl:'images/messiar_51_the_whirlpool_galaxy.jpg',
    about:'Whirlpool galaxy is pure beauty'
}]
*/
async function getCards(){
    let res = await fetch('/cards',{method:'GET'}).then(res=>res.json());
    return res.cards;
}

async function search(val){
    let cards = await getCards();
    document.querySelectorAll('.data').forEach(ele=>{ele.parentNode.removeChild(ele);});
    let row = document.querySelector('#list');
    let re = new RegExp(val,"i");
    cards.forEach((card)=>{
        if(card.name.match(re) || card.about.match(re))
            row.appendChild(createCard(card));
    })
}

window.onload =async(e)=>{
    let cards = await getCards();
    let row = document.querySelector('#list');
    cards.forEach((card)=>{
        row.appendChild(createCard(card));
    })
}

function createCard(card){
    let ele = document.createElement('div');
        ele.className="card my-3 data";
        ele.style.width="18rem";
        let img = document.createElement('img');
        img.src=card.imgurl;
        img.alt="cannot load image";
        img.className="card-img-top";
        img.style.height="12rem";
        img.style.padding="5px";
        let div = document.createElement('div');
        div.className="card-body";
        let h5=document.createElement('h5');
        h5.innerHTML=card.name;
        h5.className="card-title";
        let p = document.createElement('p');
        p.innerHTML=card.about.length>30 ? card.about.substring(0,28)+'...':card.about;
        p.className="card-text";
        //adding elements here
        div.appendChild(h5);
        div.appendChild(p);
        ele.appendChild(img);
        ele.appendChild(div);
        ele.onclick=(event)=>{
            document.getElementById('staticBackdropLabel').innerHTML = h5.innerHTML;
            document.getElementById('modalimg').src = img.src;
            document.getElementById('modaltext').innerHTML = card.about;
            $('#staticBackdrop').modal('show')
        }
    return ele;
}

function closeModal(){
    $('#staticBackdrop').modal('hide')
}