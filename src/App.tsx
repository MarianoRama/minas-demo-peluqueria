/**
 * Tijera & Tinta — DEMO de portafolio
 * -----------------------------------
 * Este sitio es un proyecto de EJEMPLO creado para mostrar a dueños de
 * peluquerías/barberías de Minas, Uruguay, el tipo de landing page que un
 * freelancer puede desarrollar para su negocio.
 *
 * "Tijera & Tinta" NO es un negocio real. El nombre, los servicios, los
 * precios, el equipo, el número de WhatsApp y las redes sociales son todos
 * datos ficticios / ilustrativos, usados únicamente con fines de demostración.
 */
import { DemoBanner } from './components/DemoBanner'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Servicios } from './components/Servicios'
import { Equipo } from './components/Equipo'
import { MarcasMarquee } from './components/MarcasMarquee'
import { ReservaSection } from './components/ReservaSection'
import { HorariosUbicacion } from './components/HorariosUbicacion'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <DemoBanner />
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Equipo />
        <ReservaSection />
        <HorariosUbicacion />
        <MarcasMarquee />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default App
