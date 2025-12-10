import React from 'react'

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-amber-500 tracking-wide">
              Senator Resort
            </h1>
            <p className="text-slate-400 text-sm mt-1">República Dominicana</p>
          </div>
          <div className="text-right">
            <p className="text-slate-100 font-medium">Sistema de Reservaciones</p>
            <p className="text-slate-400 text-sm">Restaurantes Privados</p>
          </div>
        </div>
      </div>
    </header>
  )
}
