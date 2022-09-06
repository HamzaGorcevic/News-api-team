import { useContext } from "react";
import { myContext } from "./context";
import style from "./article.module.css";
import { Link } from "react-router-dom";

export default function Article() {
  const contextUse = useContext(myContext);
  localStorage.setItem("value", JSON.stringify(contextUse.sentNews));
  console.log(localStorage.getItem("valueOf"));

  const datas = JSON.parse(localStorage.getItem("valueOf"));
  console.log(datas);

  return (
    <div className={style.articleContainer}>
      <Link style={{ textDecoration: "none" }} to="/">
        <h1 className="text-danger font-weight-bold">
          <i class="bi bi-camera2"></i> Global news{" "}
        </h1>
      </Link>
      <div className="bg-danger" style={{ width: 300, height: 2 }}></div>

      <h1 className={`mt-3 font-weight-bold ${style.articleTitle}`}>
        {datas.title}
      </h1>

      <div
        onClick={() => {
          window.open(datas.url);
        }}
        className={style.article}
      >
        <div
          style={{ position: "absolute", right: "0%", top: 0 }}
          className={style.iconBox}
        >
          <h3 className={style.iconTitle}>READ MORE</h3>
          <div className={style.iconLittleBox}>
            <i className={`bi bi-book `}></i>
          </div>
        </div>
        <img src={datas.urlToImage} alt="" className={style.imgArticle} />
        <h3
          className={`w-75 text-white ${style.articleTitle}`}
          style={{ zIndex: 1, position: "absolute", bottom: 0, left: "2%" }}
        >
          {datas.description}
        </h3>
        <div
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.800))",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        ></div>
      </div>
      <p className={`mt-4 ${style.description}`}>{datas.content}</p>

      <div className={style.info}>
        <h2 className="h5">
          By author: <span className="text-warning"> {datas.author} </span>
        </h2>
        <h3 className="h5">
          Published at: {datas.publishedAt.slice(0, 10).split("-").join("/")}
        </h3>
      </div>
    </div>
  );
}
