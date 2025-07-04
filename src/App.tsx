import { useState, useMemo } from 'react';
import Header from './components/Header';
import JornadaForm from './components/JornadaForm';
import HorariosPorSemana from './components/HorariosPorSemana';
import ResumenCalculado from './components/ResumenCalculado';
import Footer from './components/Footer';
import SeccionDonaciones from './components/SeccionDonaciones';

import { calcularResumenCompleto } from './utils/calculos';
import type { DatosLaborales } from './types';

/**
 * Componente principal de la aplicación
 * Calculadora de Horas Trabajadas - Estilo Guerrero
 * Completamente responsivo
 */
function App() {
  // Estado principal de la aplicación
  const [datosLaborales, setDatosLaborales] = useState<DatosLaborales>({
    nombreTrabajador: '',
    salarioMensual: 0,
    jornadas: []
  });

  // Estado para controlar el modal de horarios por semana
  const [mostrarHorarios, setMostrarHorarios] = useState(false);

  // Estado para controlar el modal de donaciones
  const [mostrarDonaciones, setMostrarDonaciones] = useState(false);

  /**
   * Calcula el resumen de forma memoizada para optimizar rendimiento
   */
  const resumenCalculos = useMemo(() => {
    if (datosLaborales.salarioMensual === 0 || datosLaborales.jornadas.length === 0) {
      return {
        horasTotales: 0,
        horasNormales: 0,
        horasExtrasDiurnas: 0,
        horasExtrasNocturnas: 0,
        horasExtrasDominicales: 0,
        horasExtrasDominicalesNocturnas: 0,
        valorHorasNormales: 0,
        valorExtrasDiurnas: 0,
        valorExtrasNocturnas: 0,
        valorExtrasDominicales: 0,
        valorExtrasDominicalesNocturnas: 0,
        totalGanado: 0
      };
    }

    return calcularResumenCompleto(datosLaborales.jornadas, datosLaborales.salarioMensual);
  }, [datosLaborales.jornadas, datosLaborales.salarioMensual]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header principal */}
      {/* <Header onAbrirDonaciones={() => setMostrarDonaciones(true)} /> */}
      <Header />

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Formulario de jornadas */}
        <JornadaForm
          datosLaborales={datosLaborales}
          setDatosLaborales={setDatosLaborales}
          onEditarHorarios={() => setMostrarHorarios(true)}
        />

        {/* Resumen de cálculos - Solo se muestra si hay datos */}
        {(datosLaborales.salarioMensual > 0 && datosLaborales.jornadas.length > 0) && (
          <ResumenCalculado
            resumen={resumenCalculos}
            nombreTrabajador={datosLaborales.nombreTrabajador}
          />
        )}

        {/* Modal de horarios por semana */}
        <HorariosPorSemana
          isOpen={mostrarHorarios}
          onClose={() => setMostrarHorarios(false)}
          datosLaborales={datosLaborales}
          setDatosLaborales={setDatosLaborales}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sección de donaciones */}
      <SeccionDonaciones
        mostrarModal={mostrarDonaciones}
        onCerrarModal={() => setMostrarDonaciones(false)}
      />
    </div>
  );
}

export default App;