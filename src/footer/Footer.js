import "./Footer.scss";
import Brand from "./components/Brand";

export default function Footer() {
  return (
    <footer>
      <div className="footer-copyright" onClick={() => window.location.assign("/#/ctf/lIA0zmzYSbgSlBUzwjo7hr5y/")}><small>Copyright © {new Date().getFullYear()} CKEFGISC 建北電資 29th</small></div>
      <div className="footer-brands">
        <Brand 
          title="建中電研 44th Instagram"
          href="https://www.instagram.com/ckeisc_44th/"
          brandName="instagram"
        />
        <Brand 
          title="北一資研 38th Instagram"
          href="https://www.instagram.com/fgisc38th/"
          brandName="instagram"
        />
        <Brand 
          title="本站 GitHub 頁面"
          href="https://github.com/ckefgisc/29th-website"
          brandName="github"
        />
        <Brand 
          title="建北電資 29th Email"
          href="mailto://ckefgisc29th@gmail.com"
          brandSeries="regular"
          brandName="envelope"
          brandSize="lg"
        />
      </div>
    </footer>
  );
}
