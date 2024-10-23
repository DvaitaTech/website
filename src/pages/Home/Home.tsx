import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'

const Home = () => {
  return (
    <main className="home">
      <article>
        <header>
          <Hero />
        </header>
        <section>
          <Features />
        </section>
      </article>
    </main>
  )
}

export default Home
