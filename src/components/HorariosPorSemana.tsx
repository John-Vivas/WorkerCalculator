import { useState } from 'react';
import { X, Save, Calendar, Clock } from 'lucide-react';
import type { DatosLaborales, HorarioSemanal, Jornada } from '../types';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  datosLaborales: DatosLaborales;
  setDatosLaborales: (datos: DatosLaborales) => void;
}

/**
 * Modal para editar horarios por semana y generar jornadas automáticamente
 * Completamente responsivo
 */
export default function HorariosPorSemana({ isOpen, onClose, datosLaborales, setDatosLaborales }: Props) {
  const [horariosSemana, setHorariosSemana] = useState<HorarioSemanal>({
    lunes: { entrada: '08:00', salida: '17:00', activo: true },
    martes: { entrada: '08:00', salida: '17:00', activo: true },
    miercoles: { entrada: '08:00', salida: '17:00', activo: true },
    jueves: { entrada: '08:00', salida: '17:00', activo: true },
    viernes: { entrada: '08:00', salida: '17:00', activo: true },
    sabado: { entrada: '08:00', salida: '12:00', activo: false },
    domingo: { entrada: '08:00', salida: '17:00', activo: false }
  });

  const [fechaInicio, setFechaInicio] = useState('');
  const [semanas, setSemanas] = useState(1);

  if (!isOpen) return null;

  /**
   * Genera jornadas automáticamente basado en los horarios configurados
   */
  const generarJornadas = () => {
    if (!fechaInicio) {
      alert('Por favor selecciona una fecha de inicio');
      return;
    }

    const nuevasJornadas: Jornada[] = [];
    const fechaBase = new Date(fechaInicio + 'T00:00:00');

    // Encontrar el lunes de la semana seleccionada
    const diasParaLunes = (fechaBase.getDay() + 6) % 7;
    const primerLunes = new Date(fechaBase);
    primerLunes.setDate(fechaBase.getDate() - diasParaLunes);

    const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'] as const;

    for (let semana = 0; semana < semanas; semana++) {
      for (let dia = 0; dia < 7; dia++) {
        const diaActual = new Date(primerLunes);
        diaActual.setDate(primerLunes.getDate() + (semana * 7) + dia);

        const nombreDia = diasSemana[dia];
        const horario = horariosSemana[nombreDia];

        if (horario.activo) {
          const jornada: Jornada = {
            id: `${diaActual.getTime()}-${dia}`,
            fecha: diaActual.toISOString().split('T')[0],
            horaEntrada: horario.entrada,
            horaSalida: horario.salida,
            horasExtrasData: {
              diurnas: 0,
              nocturnas: 0,
              dominicales: 0,
              dominicalesNocturnas: 0
            }
          };

          // Verificar si ya existe una jornada para esta fecha
          const existeJornada = datosLaborales.jornadas.some(j => j.fecha === jornada.fecha);
          if (!existeJornada) {
            nuevasJornadas.push(jornada);
          }
        }
      }
    }

    if (nuevasJornadas.length === 0) {
      alert('No se generaron nuevas jornadas. Puede que ya existan para las fechas seleccionadas.');
      return;
    }

    setDatosLaborales({
      ...datosLaborales,
      jornadas: [...datosLaborales.jornadas, ...nuevasJornadas]
    });

    alert(`Se generaron ${nuevasJornadas.length} jornadas exitosamente.`);
    onClose();
  };

  /**
   * Actualiza el horario de un día específico
   */
  const actualizarHorario = (dia: keyof HorarioSemanal, campo: keyof HorarioSemanal['lunes'], valor: string | boolean) => {
    setHorariosSemana(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor
      }
    }));
  };

  const diasSemana = [
    { key: 'lunes' as const, label: 'Lunes' },
    { key: 'martes' as const, label: 'Martes' },
    { key: 'miercoles' as const, label: 'Miércoles' },
    { key: 'jueves' as const, label: 'Jueves' },
    { key: 'viernes' as const, label: 'Viernes' },
    { key: 'sabado' as const, label: 'Sábado' },
    { key: 'domingo' as const, label: 'Domingo' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <span className="hidden sm:inline">Editor de Horarios Semanales</span>
              <span className="sm:hidden">Horarios Semanales</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Configure los horarios para cada día de la semana y genere jornadas automáticamente
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Configuración de fechas */}
          <div className="mb-6 sm:mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración de Generación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de inicio (cualquier día de la semana)
                </label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de semanas a generar
                </label>
                <select
                  value={semanas}
                  onChange={(e) => setSemanas(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value={1}>1 semana</option>
                  <option value={2}>2 semanas</option>
                  <option value={3}>3 semanas</option>
                  <option value={4}>4 semanas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Horarios por día */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              Horarios por Día
            </h3>

            {diasSemana.map(({ key, label }) => (
              <div key={key} className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={horariosSemana[key].activo}
                      onChange={(e) => actualizarHorario(key, 'activo', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 font-medium text-gray-800 w-16 sm:w-20">
                      {label}
                    </label>
                  </div>

                  {horariosSemana[key].activo && (
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Entrada</label>
                        <input
                          type="time"
                          value={horariosSemana[key].entrada}
                          onChange={(e) => actualizarHorario(key, 'entrada', e.target.value)}
                          className="px-2 sm:px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Salida</label>
                        <input
                          type="time"
                          value={horariosSemana[key].salida}
                          onChange={(e) => actualizarHorario(key, 'salida', e.target.value)}
                          className="px-2 sm:px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={generarJornadas}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
            >
              <Save className="h-4 w-4" />
              Generar Jornadas
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              Cancelar
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> Las jornadas se generarán automáticamente para los días marcados como activos.
              Si ya existen jornadas para alguna fecha, no se duplicarán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}