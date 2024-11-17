import Card from "../../../utils/Card";
import Row from "../../../utils/Row";
import SectionTitle from "../../../utils/SectionTitle";

import "./Map.scss";

export default function Map() {
  return (
    <section id="map">
      <div className="container">
        <SectionTitle>網站地圖</SectionTitle>
        <Row>
          <Card 
            useScroll to="#about"
            imgSrc="/images/homepage/about.jpg"
            title="關於我們"
            description="關於建北電資"
            btnColor="light"
          />
          <Card 
            href="#/courses"
            imgSrc="/images/homepage/class.jpg"
            title="課程介紹"
            description="社課介紹"
            btnColor="light"
          />
          <Card 
            href="#/events"
            imgSrc="/images/homepage/event.jpg"
            title="活動介紹"
            description="四大獵祭與其他活動"
            btnColor="kelly-green"
          />
          <Card 
            href="#/museum"
            imgSrc="/images/homepage/museum.jpg"
            title="博物館"
            description="歷屆的成果展示與網站"
            btnColor="info"
          />
        </Row>
      </div>
    </section>
  );
}
