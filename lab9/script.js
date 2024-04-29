// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

// Function to fetch news articles from NewsAPI
async function fetchNews() {
  const apiKey = "YOUR_NEWSAPI_KEY"; // Replace with your NewsAPI key
  const url = `https://newsdata.io/api/1/news?apikey=pub_430756c813a580a8802e6b8a42cd4d2597a2c`; // Example URL, you can customize it based on your needs

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.results);
    if (response.ok) {
      renderArticles(data.results);
    } else {
      console.error("Error fetching news:");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function renderArticles(articles) {
  const container = document.getElementById("articles-container");

  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");

    const titleElement = document.createElement("h2");
    const titleLink = document.createElement("a");
    titleLink.textContent = article.title;
    titleLink.href = article.link;
    titleElement.appendChild(titleLink);
    articleElement.appendChild(titleElement);

    const imageElement = document.createElement("img");
    imageElement.src = article.image_url;
    imageElement.alt = article.title;
    articleElement.appendChild(imageElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description;
    articleElement.appendChild(descriptionElement);

    container.appendChild(articleElement);
  });
}

fetchNews();
