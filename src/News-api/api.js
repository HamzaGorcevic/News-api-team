

const key = '03ab7b8421c149ff90a1e74cf89afb6a'

const FilterNews = {US:`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${key}`,
    Tesla:`https://newsapi.org/v2/everything?q=tesla&from=2022-07-30&sortBy=publishedAt&apiKey=${key}`,
    Apple:`https://newsapi.org/v2/everything?q=apple&from=2022-08-29&to=2022-08-29&sortBy=popularity&apiKey=${key}`,
    TechCrunch:`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${key}`}

    export {FilterNews}