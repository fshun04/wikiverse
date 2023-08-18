import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [article, setArticle] = useState(null);

  async function fetchArticle(slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      const articleData = await response.json();
      setArticle(articleData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log("Oh no an error! ", err);
      }
    }

    fetchPages();
  }, []);

  if (article) {
    return (
		<main>
			<a href="#" onClick={function (event) {
              event.preventDefault();
			  setArticle(null);
            }}>&larr; Home</a>
			<h1>{article.title}</h1>
			<p><b>Author:</b></p>
			<p><b>Published:</b> </p>
			<p>{article.content}</p>
			<p><b>Tags:</b></p>
			
		</main>
	);
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      {pages.map((page) => (
        <h3 key={page.id}>
          <a
            href="#"
            onClick={function (event) {
              event.preventDefault();
			  fetchArticle(page.slug);
            }}
          >
            {page.title}
          </a>
        </h3>
      ))}
    </main>
  );
};
