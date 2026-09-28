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
import { DatosProvider } from './data/store'
import { SeleccionReservaProvider } from './lib/seleccionReserva'
import { useHashRoute } from './hooks/useHashRoute'
import { DemoBanner } from './components/DemoBanner'
import { AvisoNegocio } from './components/AvisoNegocio'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Servicios } from './components/Servicios'
import { Equipo } from './components/Equipo'
import { Galeria } from './components/Galeria'
import { MarcasMarquee } from './components/MarcasMarquee'
import { ReservaSection } from './components/ReservaSection'
import { HorariosUbicacion } from './components/HorariosUbicacion'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { AdminApp } from './admin/AdminApp'

function SitioPublico() {
  return (
    <div className="min-h-screen bg-cream">
      <DemoBanner />
      <Header />
      <AvisoNegocio />
      <main>
        <Hero />
        <Servicios />
        <Equipo />
        <Galeria />
        <ReservaSection />
        <HorariosUbicacion />
        <MarcasMarquee />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

function App() {
  const [ruta] = useHashRoute()
  const esAdmin = ruta === '/admin' || ruta.startsWith('/admin/')

  return (
    <DatosProvider>
      <SeleccionReservaProvider>
        {esAdmin ? <AdminApp /> : <SitioPublico />}
      </SeleccionReservaProvider>
    </DatosProvider>
  )
}

export default App
