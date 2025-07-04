
import { TrendingUp, Clock, DollarSign, Award, Target, Sun, Moon } from 'lucide-react';

import { formatearMoneda, formatearHoras } from '../utils/calculos';
import type { ResumenCalculos } from '../types';

interface Props {
  resumen: ResumenCalculos;
  nombreTrabajador: string;
}

/**
 * Componente para mostrar el resumen de cálculos de horas y pagos
 * Actualizado con los nuevos horarios según ley 2466 de 2025
 * Completamente responsivo
 */
export default function ResumenCalculado({ resumen, nombreTrabajador }: Props) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center justify-center gap-2 sm:gap-3">
          <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          <span className="text-center">Resumen de Batalla De Un Proletariado Digno</span>
        </h2>
        {nombreTrabajador && (
          <p className="text-lg sm:text-xl text-yellow-400 font-semibold">
            Guerrero: {nombreTrabajador}
          </p>
        )}

        {/* Información sobre nuevos horarios */}
        <div className="mt-4 p-3 bg-blue-900 bg-opacity-50 rounded-lg">
          <p className="text-sm text-blue-200">
            <strong>Horarios Laborales 2025 (Ley 2466):</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <Sun className="h-3 w-3" />
              Diurno: 6:00 AM - 7:00 PM
            </span>
            <span className="flex items-center gap-1">
              <Moon className="h-3 w-3" />
              Nocturno: 7:00 PM - 6:00 AM
            </span>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-700">
          <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2">Horas Totales</h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-400">
            {formatearHoras(resumen.horasTotales)}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-700">
          <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-green-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2">Total Conquistado</h3>
          <p className="text-xl sm:text-3xl font-bold text-green-400 break-words">
            {formatearMoneda(resumen.totalGanado)}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-700">
          <Target className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2">Valor por Hora</h3>
          <p className="text-xl sm:text-3xl font-bold text-yellow-400 break-words">
            {formatearMoneda(resumen.totalGanado / (resumen.horasTotales || 1))}
          </p>
        </div>
      </div>

      {/* Desglose detallado */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Desglose de horas */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Desglose de Horas
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base flex items-center gap-1">
                <Sun className="h-3 w-3" />
                Horas Normales:
              </span>
              <span className="font-semibold text-blue-400 text-sm sm:text-base">
                {formatearHoras(resumen.horasNormales)} h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base flex items-center gap-1">
                <Sun className="h-3 w-3" />
                Extras Diurnas (+25%):
              </span>
              <span className="font-semibold text-orange-400 text-sm sm:text-base">
                {formatearHoras(resumen.horasExtrasDiurnas)} h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base flex items-center gap-1">
                <Moon className="h-3 w-3" />
                Extras Nocturnas (+75%):
              </span>
              <span className="font-semibold text-purple-400 text-sm sm:text-base">
                {formatearHoras(resumen.horasExtrasNocturnas)} h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base flex items-center gap-1">
                <Sun className="h-3 w-3" />
                Dominicales (+75%):
              </span>
              <span className="font-semibold text-red-400 text-sm sm:text-base">
                {formatearHoras(resumen.horasExtrasDominicales)} h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base flex items-center gap-1">
                <Moon className="h-3 w-3" />
                Dom. Nocturnas (+100%):
              </span>
              <span className="font-semibold text-yellow-400 text-sm sm:text-base">
                {formatearHoras(resumen.horasExtrasDominicalesNocturnas)} h
              </span>
            </div>
          </div>
        </div>

        {/* Desglose de valores */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            Desglose de Valores
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base">Horas Normales:</span>
              <span className="font-semibold text-blue-400 text-sm sm:text-base break-words">
                {formatearMoneda(resumen.valorHorasNormales)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base">Extras Diurnas:</span>
              <span className="font-semibold text-orange-400 text-sm sm:text-base break-words">
                {formatearMoneda(resumen.valorExtrasDiurnas)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base">Extras Nocturnas:</span>
              <span className="font-semibold text-purple-400 text-sm sm:text-base break-words">
                {formatearMoneda(resumen.valorExtrasNocturnas)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base">Dominicales:</span>
              <span className="font-semibold text-red-400 text-sm sm:text-base break-words">
                {formatearMoneda(resumen.valorExtrasDominicales)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm sm:text-base">Dom. Nocturnas:</span>
              <span className="font-semibold text-yellow-400 text-sm sm:text-base break-words">
                {formatearMoneda(resumen.valorExtrasDominicalesNocturnas)}
              </span>
            </div>
            <div className="border-t border-gray-600 pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-bold text-white">TOTAL:</span>
                <span className="text-xl sm:text-2xl font-bold text-green-400 break-words">
                  {formatearMoneda(resumen.totalGanado)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-blue-100">Porcentaje Horas Extras</p>
          <p className="text-xl sm:text-2xl font-bold">
            {resumen.horasTotales > 0
              ? ((resumen.horasTotales - resumen.horasNormales) / resumen.horasTotales * 100).toFixed(1)
              : 0}%
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-green-100">Ingresos Extras</p>
          <p className="text-lg sm:text-2xl font-bold break-words">
            {formatearMoneda(resumen.totalGanado - resumen.valorHorasNormales)}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-yellow-100">Días Trabajados</p>
          <p className="text-xl sm:text-2xl font-bold">
            {Math.ceil(resumen.horasNormales / 8)}
          </p>
        </div>
      </div>
    </div>
  );
}