import { useState } from 'react';
import { Plus, Trash2, Clock, Calendar, User, DollarSign, ChevronDown, AlertTriangle } from 'lucide-react';
import type { DatosLaborales, Jornada } from '../types';


interface Props {
  datosLaborales: DatosLaborales;
  setDatosLaborales: (datos: DatosLaborales) => void;
  onEditarHorarios: () => void;
}

/**
 * Componente para gestionar el formulario principal de jornadas
 * Completamente responsivo
 */
export default function JornadaForm({ datosLaborales, setDatosLaborales, onEditarHorarios }: Props) {
  const [nuevaJornada, setNuevaJornada] = useState<Partial<Jornada>>({
    fecha: '',
    horaEntrada: '',
    horaSalida: '',
    horasExtrasData: {
      diurnas: 0,
      nocturnas: 0,
      dominicales: 0,
      dominicalesNocturnas: 0
    }
  });

  const [mostrarSelectorSalario, setMostrarSelectorSalario] = useState(false);
  const [mostrarConfirmacionBorrar, setMostrarConfirmacionBorrar] = useState(false);

  // Salarios predefinidos comunes en Colombia (2025)
  const salariosComunes = [
    { valor: 1423500, descripcion: 'Salario Mínimo Legal 2025' },
    { valor: 2000000, descripcion: '2 Millones' },
    { valor: 2500000, descripcion: '2.5 Millones' },
    { valor: 3000000, descripcion: '3 Millones' },
    { valor: 3500000, descripcion: '3.5 Millones' },
    { valor: 4000000, descripcion: '4 Millones' },
    { valor: 5000000, descripcion: '5 Millones' },
    { valor: 6000000, descripcion: '6 Millones' },
    { valor: 8000000, descripcion: '8 Millones' },
    { valor: 10000000, descripcion: '10 Millones' }
  ];

  /**
   * Agrega una nueva jornada a la lista
   */
  const agregarJornada = () => {
    if (!nuevaJornada.fecha || !nuevaJornada.horaEntrada || !nuevaJornada.horaSalida) {
      alert('Por favor completa todos los campos de la jornada');
      return;
    }

    const jornada: Jornada = {
      id: Date.now().toString(),
      fecha: nuevaJornada.fecha!,
      horaEntrada: nuevaJornada.horaEntrada!,
      horaSalida: nuevaJornada.horaSalida!,
      horasExtrasData: nuevaJornada.horasExtrasData!
    };

    setDatosLaborales({
      ...datosLaborales,
      jornadas: [...datosLaborales.jornadas, jornada]
    });

    // Resetear formulario
    setNuevaJornada({
      fecha: '',
      horaEntrada: '',
      horaSalida: '',
      horasExtrasData: {
        diurnas: 0,
        nocturnas: 0,
        dominicales: 0,
        dominicalesNocturnas: 0
      }
    });
  };

  /**
   * Elimina una jornada específica
   */
  const eliminarJornada = (id: string) => {
    setDatosLaborales({
      ...datosLaborales,
      jornadas: datosLaborales.jornadas.filter(j => j.id !== id)
    });
  };

  /**
   * Borra todas las jornadas después de confirmación
   */
  const borrarTodasLasJornadas = () => {
    setDatosLaborales({
      ...datosLaborales,
      jornadas: []
    });
    setMostrarConfirmacionBorrar(false);
  };

  /**
   * Selecciona un salario predefinido
   */
  const seleccionarSalario = (valor: number) => {
    setDatosLaborales({
      ...datosLaborales,
      salarioMensual: valor
    });
    setMostrarSelectorSalario(false);
  };

  /**
   * Formatea un número para mostrar en el input de salario
   */
  const formatearSalario = (valor: string) => {
    const numero = valor.replace(/\D/g, '');
    return new Intl.NumberFormat('es-CO').format(Number(numero));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <User className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
        Datos del Guerrero
      </h2>

      {/* Información básica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del Guerrero Obrero (opcional)
          </label>
          <input
            type="text"
            value={datosLaborales.nombreTrabajador}
            onChange={(e) => setDatosLaborales({
              ...datosLaborales,
              nombreTrabajador: e.target.value
            })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Ej: Tupac Amaru el Guerrero"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Salario Mensual
          </label>

          {/* Contenedor del input y botón selector */}
          <div className="flex gap-2">
            <input
              type="text"
              value={formatearSalario(datosLaborales.salarioMensual.toString())}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, '');
                setDatosLaborales({
                  ...datosLaborales,
                  salarioMensual: Number(valor) || 0
                });
              }}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="Ej: 1,423,500"
            />

            {/* Botón selector de salarios */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMostrarSelectorSalario(!mostrarSelectorSalario)}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Seleccionar</span>
                <span className="sm:hidden">Sel.</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown de salarios */}
              {mostrarSelectorSalario && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-600 mb-2 px-2">
                      Salarios Comunes en Colombia
                    </div>
                    {salariosComunes.map((salario) => (
                      <button
                        key={salario.valor}
                        onClick={() => seleccionarSalario(salario.valor)}
                        className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-sm transition-colors"
                      >
                        <div className="font-medium text-gray-800">
                          {formatearSalario(salario.valor.toString())}
                        </div>
                        <div className="text-xs text-gray-600">
                          {salario.descripcion}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Información sobre horarios laborales */}
          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Horarios Laborales 2025:</strong> Diurno 6:00 AM - 7:00 PM | Nocturno 7:00 PM - 6:00 AM
            </p>
          </div>
        </div>
      </div>

      {/* Botón para editar horarios por semana */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={onEditarHorarios}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
        >
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          Editar Horarios por Semana
        </button>
      </div>

      {/* Formulario para nueva jornada */}
      <div className="border-t pt-4 sm:pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
          Agregar Nueva Jornada
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={nuevaJornada.fecha}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                fecha: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora Entrada
            </label>
            <input
              type="time"
              value={nuevaJornada.horaEntrada}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                horaEntrada: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora Salida
            </label>
            <input
              type="time"
              value={nuevaJornada.horaSalida}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                horaSalida: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Horas extras */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              H. Extras Diurnas
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={nuevaJornada.horasExtrasData?.diurnas || 0}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                horasExtrasData: {
                  ...nuevaJornada.horasExtrasData!,
                  diurnas: Number(e.target.value) || 0
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              H. Extras Nocturnas
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={nuevaJornada.horasExtrasData?.nocturnas || 0}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                horasExtrasData: {
                  ...nuevaJornada.horasExtrasData!,
                  nocturnas: Number(e.target.value) || 0
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              H. Dominicales
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={nuevaJornada.horasExtrasData?.dominicales || 0}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                horasExtrasData: {
                  ...nuevaJornada.horasExtrasData!,
                  dominicales: Number(e.target.value) || 0
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              H. Dom. Nocturnas
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={nuevaJornada.horasExtrasData?.dominicalesNocturnas || 0}
              onChange={(e) => setNuevaJornada({
                ...nuevaJornada,
                horasExtrasData: {
                  ...nuevaJornada.horasExtrasData!,
                  dominicalesNocturnas: Number(e.target.value) || 0
                }
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500"
            />
          </div>
        </div>

        <button
          onClick={agregarJornada}
          className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
        >
          <Plus className="h-4 w-4" />
          Agregar Jornada
        </button>
      </div>

      {/* Lista de jornadas */}
      {datosLaborales.jornadas.length > 0 && (
        <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Jornadas Registradas ({datosLaborales.jornadas.length})
            </h3>

            {/* Botón para borrar todas las jornadas */}
            <button
              onClick={() => setMostrarConfirmacionBorrar(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Borrar Todas</span>
              <span className="sm:hidden">Borrar</span>
            </button>
          </div>

          <div className="space-y-3">
            {datosLaborales.jornadas.map((jornada) => (
              <div key={jornada.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                    <span className="font-medium text-gray-800">
                      {new Date(jornada.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="text-gray-600">
                      {jornada.horaEntrada} - {jornada.horaSalida}
                    </span>
                    {(jornada.horasExtrasData.diurnas + jornada.horasExtrasData.nocturnas +
                      jornada.horasExtrasData.dominicales + jornada.horasExtrasData.dominicalesNocturnas) > 0 && (
                        <span className="text-yellow-600 font-medium text-xs">
                          +{(jornada.horasExtrasData.diurnas + jornada.horasExtrasData.nocturnas +
                            jornada.horasExtrasData.dominicales + jornada.horasExtrasData.dominicalesNocturnas).toFixed(1)}h extras
                        </span>
                      )}
                  </div>
                </div>
                <button
                  onClick={() => eliminarJornada(jornada.id)}
                  className="text-red-600 hover:text-red-800 transition-colors p-1 self-end sm:self-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de confirmación para borrar todas las jornadas */}
      {mostrarConfirmacionBorrar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Confirmar Eliminación
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres borrar <strong>todas las jornadas</strong>?
                Esta acción no se puede deshacer y perderás todos los datos registrados.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={borrarTodasLasJornadas}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Sí, Borrar Todo
                </button>
                <button
                  onClick={() => setMostrarConfirmacionBorrar(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cerrar dropdown si se hace clic fuera */}
      {mostrarSelectorSalario && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setMostrarSelectorSalario(false)}
        />
      )}
    </div>
  );
}