
import { Shield, Heart } from 'lucide-react';

/**
 * Componente Footer con mensaje temático de guerrero
 * Completamente responsivo
 */
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 sm:py-8 px-4 mt-8 sm:mt-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          <h3 className="text-lg sm:text-xl font-bold">Honor del Obrero Guerrero</h3>
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
        </div>

        <div className="space-y-2 sm:space-y-3 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg">
            Gracias por usar esta calculadora de horas laborales.
          </p>
          <p className="text-yellow-400 font-semibold text-sm sm:text-base">
            Agradezco al presidente de Sintabrinks 2025 por darme la idea e impulsar este proyecto.
          </p>
          <p className="text-xs sm:text-sm">
            Proyecto creado para los obreros que viva el proletariado.
          </p>
        </div>

        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
          <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-2">
            Hecho con <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" /> para todos los nuestros guerreros que mes a mes luchan por sotener a sus familias.
          </p>
        </div>
      </div>
    </footer>
  );
}