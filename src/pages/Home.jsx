import { Navbar, Main, Product, Footer, Busines, About, Reviews, } from "../components";
import "../style/Home.css";

function Home() {
  return (
    <>
      <div className="home__page">
      <Navbar />
      <Main />
      <Product />
      <About/>
      <Busines/>
      <Reviews/>
      <Footer />
      </div>
    </>
  )
}

export default Home