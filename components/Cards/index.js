// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each 'article' in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Use your function to create a card for each of the articles and add the card to the DOM.

/* var httpRequest = new XMLHttpRequest();

httpRequest.open("GET", "https://lambda-times-backend.herokuapp.com/articles");
ttpRequest.send();

httpRequest.onreadystatechange = (e) => {
    console.log(httpRequest.responseText);
}

*/

const card_container = document.querySelector(".cards-container");

axios.get('https://lambda-times-backend.herokuapp.com/articles')
    .then((data) => {
        var articles = (data.data.articles);
        var values = Object.keys(articles).map((el) => {
            return articles[el];
        });
        values.forEach((el) => {
            el.forEach((article) => {
                card_container.appendChild(cardCreator(article));
            })
        });
    })

    .catch((err) => {
        console.log(err);
    })


function cardCreator(obj) {

    const card = document.createElement('div');
    card.classList.add('card');

    const headline = document.createElement('div');
    headline.classList.add('headline');
    headline.textContent = obj.headline;

    const author = document.createElement('div');
    author.classList.add('author');

    const img_container = document.createElement('div');
    img_container.classList.add('img-container');

    const img = document.createElement('img');
    img.src = obj.authorPhoto;

    const author_name = document.createElement('span');
    author_name.textContent = `By ${obj.authorName}`;

    author.appendChild(img_container);
    author.appendChild(author_name);

    img_container.appendChild(img);

    card.appendChild(headline);
    card.appendChild(author);

    return card;
}
