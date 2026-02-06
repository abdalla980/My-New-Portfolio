import './App.css'
import { Link } from 'wouter'

function App() {
  return (
      <div className={"Container"}>

<nav className={"Nav"}>
<ul className={"nav-list"}>
 <li> <a href={"#about"}>About</a></li>
  <li><a href={"#Projects"}>Projects</a></li>
  <li><a href={"#Contact"}>Contact</a></li>
</ul>
</nav>

        <div className={"HeroSec"}>
<h1 className={"HeroText"}>I help businesses hit their Website goals<br/> with SEO, Design and Software engineering</h1>
        </div>

    <div className={"videoContainer"}>
   <video src={"/videoorange.mp4"} className={"video"} autoPlay={true}/>

    </div>

        <section>
            <nav className={"projectsContainer"}>
          <h1>Projects</h1>
          <Link href="/MyWork"><h2>View all</h2></Link>
            </nav>
          <div className={"Projects"}>

              <figure className={"CodeReflexContainer"}>
            <img src={"/CodeReflex.png"} alt={"CodeReflex Mobile Application Preview"}  className={"CodeReflex"}></img>
                  <figcaption className={"figCap1"}>CodeReflex - Never Forget what you've learnt</figcaption>
                  <figcaption className={"figCap2"}>Android & Web Application</figcaption>
              </figure>

              <figure className={"DeutschGenieContainer"}>
                  <img src={"/DeutschGenie.png"} alt={"CodeReflex Mobile Application Preview"} className={"DeutschGenie"}></img>
                  <figcaption className={"figCap1"}>DeutschGenie- Play Games to learn German</figcaption>
                  <figcaption className={"figCap2"}>Landing Page & Design</figcaption>
              </figure>

              <figure className={"mwatiniMasrContainer"}>
                  <img src={"/Desert.avif"} alt={"Desert Picture Brand Theme"} className={"MwatiniMasr"}></img>
                  <figcaption className={"figCap1"}>MwatiniMasr - A sleek perfume showcase website</figcaption>
                  <figcaption className={"figCap2"}>Landing Page</figcaption>
              </figure>




          </div>
        </section>
          <section className={"ContactCta"}>

          </section>


<footer className={"Footer"}>
  <div className={"FooterContent"}>
    <p className={"GetInTouch"}>Get in touch</p>
    <div className={"FooterLinks"}>
      <a href={"#"} className={"FooterLink"}>LinkedIn</a>
      <a href={"#"} className={"FooterLink"}>Email</a>
      <a href={"#"} className={"FooterLink"}>GitHub</a>
    </div>
  </div>
</footer>


      </div>
  )}

export default App
