import { Shield, Sword } from 'lucide-react';

// interface Props {
//   onAbrirDonaciones: () => void;
// }

/**
 * Componente Header - Título principal con temática de guerrero
 * Completamente responsivo
 * este prop va dentro de la funcion header para las donaciones { onAbrirDonaciones }: Props
 */
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 sm:py-8 px-4 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Botón de donación en la parte superior */}
        {/* <div className="flex justify-end mb-4">
          <button
            onClick={onAbrirDonaciones}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm font-medium shadow-lg"
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Apoyar al Guerrero</span>
            <span className="sm:hidden">Donar</span>
          </button>
        </div> */}

        {/* Contenido principal del header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Shield className="h-6 w-6 sm:h-8 md:h-10 text-yellow-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Calculadora Obrera<span className="text-yellow-400"> de Horas Trabajadas</span>
            </h1>
            <Sword className="h-6 w-6 sm:h-8 md:h-10 text-yellow-400 flex-shrink-0" />
          </div>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-2">
            Guerrero este mes tiene que ser recompenzado por tu arduo trabajo calcula tus horas y conquista tu salario justo.
            <br className="hidden sm:block" />
            <span className="text-yellow-400 font-semibold">Tu esfuerzo merece ser valorado correctamente.</span>
          </p>

          {/* Mensaje sobre donaciones */}
          <div className="mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              Esta herramienta es <span className="text-yellow-400 font-semibold">completamente gratuita</span>.
              Si te resulta útil, puedes apoyar su desarrollo con una donación voluntaria.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}