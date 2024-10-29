import React from "react";
import $ from "jquery";

import "../Courses.scss";

import CourseDetails from "../components/CourseDetails";

import longDescriptionPath from "../descriptions/long.md";

import Loading from "../../../utils/Loading";
import Placeholder from "../../../utils/Placeholder";
import { switchPageAnimation } from "../../../utils/Page";
import Slides from "../components/Slides";
import SectionTitle from "../../../utils/SectionTitle";
import { useParams } from "react-router-dom";

function setContent(index, view, textContent, setText, setSlides) {
  var theContent = textContent.split("<%-== next ==-%>")[index];
  var 
    titles = {
      "web": "網頁",
      "python": "Python",
      "game_design": "遊戲設計",
      "algorithm": "演算法",
      "linux": "資安",
    },
    imgSrcs = {
      "web":          "/images/courses/web.avif",
      "python":       "/images/courses/python.jpg",
      "game_design":  "/images/courses/game_design.webp",
      "algorithm":    "/images/courses/algorithm.jpg",
      "linux":    "/images/courses/linux.avif",
    },
    slides = {
      "web": <>
        <h4 id="first">網頁基礎</h4>
        <Slides url="https://slides.com/laura07110717/copy-of" />
      </>,
      "python": <>
        <h4 id="first">基礎語法 1</h4>
        <Slides url="https://slides.com/d11231621/python-1" />
        <h4 id="second">基礎語法 2</h4>
        <Slides url="https://slides.com/d11231621/python-2" />
        <h4 id="third">基礎語法 3</h4>
        <Slides url="https://slides.com/d11231621/python-3" />
      </>,
      "game_design": <>
        <h4 id="first">Unity 第一堂：基本介紹及初始準備</h4>
        <Slides url="https://slides.com/d11230618/ckefgisc_unity_class1/" />
        <h4 id="second">Unity 第二堂</h4>
        <Slides url="https://slides.com/aprilfirst/code" />
        <h4 id="third">Unity 第三堂</h4>
        <Slides url="https://slides.com/d11230618/ckefgisc_unity_class3" />
        <h4 id="fourth">Unity 第四堂：TileMap & random brush</h4>
        <Slides url="https://slides.com/jellyyfish/unity-tilemap" />
      </>,
      "linux": <>
        <h4 id="first">資安第一堂：Linux 介紹和 Shell</h4>
        <Slides url="https://slides.com/demonaarwu/linux-0/" />
        <h4 id="second">資安第二堂：VM & Python</h4>
        <Slides url="https://slides.com/demonaarwu/linux-1" />
        <h4 id="third">資安第三堂：Git & GitHub 入門</h4>
        <Slides url="https://slides.com/demonaarwu/guide_to_git_and_github" />
      </>,
      "algorithm": <>
        <h4 id="first">C++ 基礎語法之一</h4>
        <Slides url="https://slides.com/keaucucal/c" />
        <h4 id="second">C++ 基礎語法之二</h4>
        <Slides url="https://slides.com/wenian/cpp-1/" />
        <h4 id="third">C++ STL 之一</h4>
        <Slides url="https://slides.com/oct0920/template/" />
        <h4 id="fourth">C++ STL 之二</h4>
        <Slides url="https://slides.com/oct0920/copy-of-template-209f73" />
      </>,
    }

  setText(<CourseDetails
    title={titles[view]}
    imgSrc={imgSrcs[view]}
    content={theContent.includes("%UNDONE%") ? `# ${titles[view]}\n\n` + Placeholder() : theContent}
  />);
  setSlides(slides[view]);
}

function slidesListInit() {
  $(".slides-list > nav").empty();

  let isFirst = true;
  $(".slides-contents h4").each((i, e) => {
    $(".slides-list > nav").append(
      $(`<span id="to-${e.id}">`)
        .text($(e).text())
        .on("click", (ev) => {
          $(`#${ev.target.id.slice("to-".length) }`)[0].scrollIntoView({ behavior: "smooth" });
        }).addClass(isFirst ? "active" : null)
    );
    isFirst = false;
  });
}

function slidesContentsOnScroll(ev) {
  let targetElement;
  $(ev.target).children().each((i, e) => {
    $(`#to-${e.id}`).removeClass("active");
    if (targetElement) return;

    let box = $(e)[0].getBoundingClientRect();
    if ($(e).is("h4") && box.bottom > $(".slides-contents")[0].getBoundingClientRect().top) 
      targetElement = e;
  });
  $(`#to-${targetElement.id}`).addClass("active");
}

export default function CourseIndividual() {
  const { id: courseId } = useParams();

  const index = [ "algorithm", "game_design", "linux", "python", "web"].indexOf(courseId);

  const [text, setText] = React.useState();
  const [slides, setSlides] = React.useState();

  React.useEffect(() => {
    switchPageAnimation();

    fetch(longDescriptionPath)
      .then(response => response.text())
      .then(textContent => setContent(index, courseId, textContent, setText, setSlides));
  }, [ index, courseId ]);

  if (index === -1) {
    window.location.replace("#/courses");
    return (<></>);
  }

  return (<>
    <section id="title-bar">
      課程介紹
    </section>
    <section id="individual-course">
      <div className="container">
        {text ?? (<Loading />)}
      </div>
    </section>
    <section id="slides">
      <SectionTitle>簡報區</SectionTitle> 
      <div className="container">
        <div className="slides-container">
          <div className="slides-list thin-scrollbar">
            <nav className="nav nav-pills">
              
            </nav>
          </div>
          <div className="slides-vertical-line"></div>
          <div className="slides-contents thin-scrollbar" onLoad={slidesListInit}  onScroll={slidesContentsOnScroll}>
            {slides}
          </div>
        </div>
      </div>
    </section>
  </>);
}
