import React from "react";

import "../Courses.scss";

import Loading from "../../../utils/Loading";
import SectionTitle from "../../../utils/SectionTitle";

import { switchPageAnimation } from "../../../utils/Page";
import CourseIntro from "../components/CourseIntro";

import shortDescriptionPath from "../descriptions/short.md";

export default function CourseList() {
  const [ text, setText ] = React.useState();

  React.useEffect(() => {
    switchPageAnimation();

    fetch(shortDescriptionPath)
      .then(response => response.text())
      .then(textContent => setText(textContent));
  }, []);

  return (<>
    <section id="title-bar">
      課程介紹
    </section>
    <section id="courses">
      <SectionTitle>113 上</SectionTitle>
      <div className="container py-1">
        {text ? (<>
          <CourseIntro
            title="演算法 (C++)"
            imgSrc="/images/courses/C++.png"
            content={text.split("<%-== next ==-%>")[0]}
            btnColor="crimson"
            href="/algorithm/"
          />
          <CourseIntro
            title="遊戲設計 (Unity)"
            imgSrc="/images/courses/Unity.png"
            content={text.split("<%-== next ==-%>")[1]}
            btnColor="gamboge"
            href="/game_design/"
          />
          <CourseIntro
            title="資安 (Linux)"
            imgSrc="/images/courses/Cybersecurity.png"
            content={text.split("<%-== next ==-%>")[2]}
            btnColor="success"
            href="/linux/"
          />
          <CourseIntro
            title="Python"
            imgSrc="/images/courses/Python.png"
            content={text.split("<%-== next ==-%>")[3]}
            btnColor="iris"
            href="/python/"
          />
          <CourseIntro
            title="網頁"
            imgSrc="/images/courses/Web.png"
            content={text.split("<%-== next ==-%>")[4]}
            btnColor="orchid"
            href="/web/"
          />
        </>) : (<>
          <Loading />
          <div style={{ height: "100dvh" }}></div>
        </>)}
      </div>

    </section>
  </>);
}
