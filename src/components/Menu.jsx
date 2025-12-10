import React from 'react'

export default function Menu({ onSeleccionar }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="font-serif text-3xl md:text-4xl text-slate-100 mb-2 text-center">Bienvenido al Sistema</h2>
      <p className="text-slate-400 mb-12 text-center">Seleccione una opción para continuar</p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={() => onSeleccionar("nueva")}
          className="group bg-slate-800 border border-slate-700 rounded-xl p-8 text-left hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <div className="w-14 h-14 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
            <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-slate-100 mb-2">Nueva Reservación</h3>
          <p className="text-slate-400 text-sm">Registrar una nueva reservación para un huésped</p>
        </button>

        <button
          onClick={() => onSeleccionar("ver")}
          className="group bg-slate-800 border border-slate-700 rounded-xl p-8 text-left hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
        >
          
          <div className="w-14 h-14 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
            <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>

          <h3 className="font-serif text-xl text-slate-100 mb-2">Ver Reservaciones</h3>
          <p className="text-slate-400 text-sm">Consultar disponibilidad y reservaciones existentes</p>
        </button>
      </div>
    </div>
  )
}
