import './projects.css'


export const Projects = () => {
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
                <h1 className={"HeroText"}> Get in touch</h1>
            </div>

        </div>
    )
}
