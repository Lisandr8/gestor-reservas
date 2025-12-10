import { useState } from 'react'
import { RESTAURANTES, HORARIOS } from '../constants'

export default function NuevaReservacion({ calcularDisponibilidad, agregarReservacion, onVolver }) {
  const [nombre, setNombre] = useState("")
  const [cantidadPersonas, setCantidadPersonas] = useState(1)
  const [restaurante, setRestaurante] = useState("")
  const [horario, setHorario] = useState("")
  const [mensaje, setMensaje] = useState(null)

  const disponibilidad = restaurante && horario ? calcularDisponibilidad(restaurante, horario) : null

  const handleSubmit = () => {
    if (!nombre.trim()) {
      setMensaje({ tipo: "error", texto: "Por favor ingrese el nombre del huésped" })
      return
    }

    if (!restaurante) {
      setMensaje({ tipo: "error", texto: "Por favor seleccione un restaurante" })
      return
    }

    if (!horario) {
      setMensaje({ tipo: "error", texto: "Por favor seleccione un horario" })
      return
    }

    if (disponibilidad < cantidadPersonas) {
      setMensaje({
        tipo: "error",
        texto: `No hay suficiente disponibilidad. Solo quedan ${disponibilidad} espacios.`
      })
      return
    }

    const restauranteInfo = RESTAURANTES.find((r) => r.id === restaurante)
    const horarioInfo = HORARIOS.find((h) => h.id === horario)

    agregarReservacion({
      nombreHuesped: nombre.trim(),
      cantidadPersonas,
      restaurante,
      restauranteNombre: restauranteInfo.nombre,
      horario,
      horarioLabel: horarioInfo.label
    })

    setMensaje({
      tipo: "exito",
      texto: `Reservación confirmada para ${nombre} en ${restauranteInfo.nombre}`
    })

    setTimeout(() => {
      setNombre("")
      setCantidadPersonas(1)
      setRestaurante("")
      setHorario("")
      setMensaje(null)
    }, 2000)
  }

  return (
    <div>
      <button
        onClick={onVolver}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-100 mb-8 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al menú
      </button>

      <h2 className="font-serif text-3xl text-slate-100 mb-8">Nueva Reservación</h2>

      {mensaje && (
        <div className={`p-4 rounded-lg mb-6 ${mensaje.tipo === "error" ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-teal-500/10 text-teal-500 border border-teal-500/20"}`}>
          {mensaje.texto}
        </div>
      )}

      <div className="space-y-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="font-serif text-xl text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
            Datos del Huésped
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Nombre del Huésped</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre completo"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Cantidad de Personas (1-5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCantidadPersonas(num)}
                    className={`flex-1 py-3 rounded-lg border transition-all ${cantidadPersonas === num ? "bg-amber-500 text-slate-900 border-amber-500" : "bg-slate-700 border-slate-600 text-slate-100 hover:border-amber-500"}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="font-serif text-xl text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
            Seleccionar Restaurante
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {RESTAURANTES.map((rest) => (
              <button
                key={rest.id}
                type="button"
                onClick={() => setRestaurante(rest.id)}
                className={`p-4 rounded-lg border text-left transition-all ${restaurante === rest.id ? "bg-amber-500/10 border-amber-500" : "bg-slate-700 border-slate-600 hover:border-amber-500/50"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{rest.icono}</span>
                  <div>
                    <p className="font-semibold text-slate-100">{rest.nombre}</p>
                    <p className="text-sm text-slate-400">{rest.tipo}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="font-serif text-xl text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
            Seleccionar Horario
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {HORARIOS.map((h) => {
              const espaciosDisp = restaurante ? calcularDisponibilidad(restaurante, h.id) : 12
              const tieneEspacio = espaciosDisp >= cantidadPersonas

              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => tieneEspacio && setHorario(h.id)}
                  disabled={!tieneEspacio}
                  className={`p-4 rounded-lg border text-left transition-all ${horario === h.id ? "bg-amber-500/10 border-amber-500" : tieneEspacio ? "bg-slate-700 border-slate-600 hover:border-amber-500/50" : "bg-slate-700/50 border-slate-600 opacity-50 cursor-not-allowed"}`}
                >
                  <p className="font-semibold text-slate-100">{h.label}</p>
                  <p className={`text-sm ${espaciosDisp > 5 ? "text-teal-500" : espaciosDisp > 0 ? "text-amber-500" : "text-red-500"}`}>
                    {espaciosDisp} espacios disponibles
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {nombre && restaurante && horario && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
            <h3 className="font-serif text-xl text-slate-100 mb-4">Resumen de Reservación</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Huésped</p>
                <p className="text-slate-100 font-medium">{nombre}</p>
              </div>
              <div>
                <p className="text-slate-400">Personas</p>
                <p className="text-slate-100 font-medium">{cantidadPersonas}</p>
              </div>
              <div>
                <p className="text-slate-400">Restaurante</p>
                <p className="text-slate-100 font-medium">{RESTAURANTES.find((r) => r.id === restaurante)?.nombre}</p>
              </div>
              <div>
                <p className="text-slate-400">Horario</p>
                <p className="text-slate-100 font-medium">{HORARIOS.find((h) => h.id === horario)?.label}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-amber-500 text-slate-900 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          Confirmar Reservación
        </button>
      </div>
    </div>
  )
}
