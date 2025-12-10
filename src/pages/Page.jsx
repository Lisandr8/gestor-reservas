export default function Page() {
    const [vista, setVista] = useState("menu")
    const [reservaciones, setReservaciones] = useState([])

    const calcularDisponibilidad = (restauranteId, horarioId) => {
        const reservacionesEnHorario = reservaciones.filter(
            (r) => r.restaurante === restauranteId && r.horario === horarioId,
        )
        const personasReservadas = reservacionesEnHorario.reduce((sum, r) => sum + r.cantidadPersonas, 0)
        return CAPACIDAD_MAX - personasReservadas
    }

    const agregarReservacion = (nuevaReservacion) => {
        setReservaciones([...reservaciones, { ...nuevaReservacion, id: Date.now() }])
    }

    const renderVista = () => {
        switch (vista) {
            case "nueva":
                return (
                    <NuevaReservacion
                        calcularDisponibilidad={calcularDisponibilidad}
                        agregarReservacion={agregarReservacion}
                        onVolver={() => setVista("menu")}
                    />
                )
            case "ver":
                return (
                    <VerReservaciones
                        reservaciones={reservaciones}
                        calcularDisponibilidad={calcularDisponibilidad}
                        onVolver={() => setVista("menu")}
                    />
                )
            default:
                return <Menu onSeleccionar={setVista} />
        }
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-5xl">{renderVista()}</main>
        </div>
    )
}
