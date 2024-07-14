
category_list = [];

loadCategory = async(category) => {
    clicked = document.getElementById(category);

    if(category_list.length > 0) {
        category_list.forEach(element => {
            element.classList.remove("bg-danger");
            element.classList.remove("text-light");
        });
        category_list.pop();
    }
    
    clicked.classList.add("bg-danger");
    clicked.classList.add("text-light");
    category_list.push(clicked);



    const response1 = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data1 = await response1.json();
    id =  data1.data[category].category_id;


    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then( response => response.json() )
    .then( data => displayCard(data.data) );


}

displayCard = (data) => {
    console.log(data);

    const cardContainer = document.getElementById("card-tag");
    const emptyContainer = document.getElementById('empty-tag');
    
    while (cardContainer.firstChild){
        cardContainer.removeChild(cardContainer.firstChild);
    }   

    while(emptyContainer.firstChild){
        emptyContainer.removeChild(emptyContainer.firstChild);
    }

    data.forEach(item => {
        // console.log(item);

        const card = document.createElement('div');
        card.classList.add("card");
        card.classList.add("border-0");

        
        card.innerHTML = `
            <img id="card-img" src="${item.thumbnail}" class="card-img-top" alt="...">

            <div class="card-body d-flex">

                <div class="card-profile">
                    <img id="profile-pic" class="rounded-circle" src="${item.authors[0].profile_picture}" alt="">
                </div>

                <div class="card-description">
                    <div class="card-title"> ${item.title} </div>
                    <div class="card-owner-container d-flex">
                        <div class="card-owner"> ${item.authors[0].profile_name}</div>
                        <div class="card-verify"> ${isVerified(item)} </div>
                    </div>

                <div class="card-views"> ${item.others.views} views </div>
            </div>
        `
        cardContainer.appendChild(card);
    });

    if(data.length == 0){
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add("empty-message");

        while(emptyContainer.firstChild){
            emptyContainer.removeChild(emptyContainer.firstChild);
        }

        emptyMessage.innerHTML = `
            <div class="img">
                <img src="/resources/Icon.png" alt="">
            </div>
            <div class="fw-bold drawing-content pt-4">
                <h2> Oops!! Sorry, There is no <br> content here </h2>
            </div>
        `

        emptyContainer.appendChild(emptyMessage);
    }
}


isVerified = (item) => {
    if(item.authors[0].verified != ""){
        return `<i class="fa-solid fa-square-check" style="color: #3776e1;"></i>`
    }
    return "";
}


findCardViews = (card) => {
    cardViews = document.getElementsByClassName("card-views");

    let views = [];
    for(let i = 0; i < cardViews.length; i++){
        let str = cardViews[i].innerHTML;

        let num = ""
        for(let j = 0; j <= 3; j++){
            num += str[j];
        }
        num = parseFloat(num) * 1000;
        views.push(num);
    }
    return views;
}

sortByView = () => {
    card = document.getElementById("card-tag").childNodes;    

    let card_list=[],  card_views = findCardViews(card);

    for(let i=0; i < card.length; i++){
        card_list.push(card[i]);
    }

    card_list.sort((a, b) => card_views[card_list.indexOf(b)] - card_views[card_list.indexOf(a)]);


    const cardContainer = document.getElementById("card-tag");
    
    while (cardContainer.firstChild){
        cardContainer.removeChild(cardContainer.firstChild);
    }

    for(let i=0; i < card_list.length; i++){
        cardContainer.appendChild(card_list[i]);
    }

    cardViews = document.getElementsByClassName("card-views");

    for(let i=0; i < cardViews.length; i++){
        console.log(cardViews[i].innerHTML);
    }
       
}



