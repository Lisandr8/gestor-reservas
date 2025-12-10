import React from 'react'
import { RESTAURANTES, HORARIOS } from '../constants'

export default function VerReservaciones({ reservaciones, calcularDisponibilidad, onVolver }) {
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

      <h2 className="font-serif text-3xl text-slate-100 mb-8">Disponibilidad y Reservaciones</h2>

      <div className="mb-10">
        <h3 className="font-serif text-xl text-slate-100 mb-4">Disponibilidad Rápida</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESTAURANTES.map((rest) => (
            <div key={rest.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{rest.icono}</span>
                <div>
                  <p className="font-semibold text-slate-100">{rest.nombre}</p>
                  <p className="text-xs text-slate-400">{rest.tipo}</p>
                </div>
              </div>

              <div className="space-y-3">
                {HORARIOS.map((h) => {
                  const disponible = calcularDisponibilidad(rest.id, h.id)
                  const porcentaje = (disponible / 12) * 100

                  return (
                    <div key={h.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{h.label}</span>
                        <span className={disponible > 5 ? "text-teal-500" : disponible > 0 ? "text-amber-500" : "text-red-500"}>
                          {disponible}/12
                        </span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${disponible > 5 ? "bg-teal-500" : disponible > 0 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${porcentaje}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl text-slate-100 mb-4">Reservaciones Actuales ({reservaciones.length})</h3>

        {reservaciones.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-slate-400">No hay reservaciones registradas</p>
            <p className="text-sm text-slate-400 mt-1">Las nuevas reservaciones aparecerán aquí</p>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-100">Huésped</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-100">Restaurante</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-100">Horario</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-100">Personas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {reservaciones.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-100">{res.nombreHuesped}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span>{RESTAURANTES.find((r) => r.id === res.restaurante)?.icono}</span>
                          <span className="text-slate-100">{res.restauranteNombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{res.horarioLabel}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-500/10 text-amber-500 rounded-full font-semibold">
                          {res.cantidadPersonas}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
