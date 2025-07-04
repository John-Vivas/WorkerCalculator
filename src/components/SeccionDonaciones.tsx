import { useState } from 'react';
import { Heart, Gift, CreditCard, Smartphone, X, Shield } from 'lucide-react';

interface Props {
  mostrarModal: boolean;
  onCerrarModal: () => void;
}

/**
 * Componente para la sección de donaciones con MercadoPago y Nequi
 */
export default function SeccionDonaciones({ mostrarModal, onCerrarModal }: Props) {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState<'mercadopago' | 'nequi' | null>(null);

  // const abrirModal = () => {
  //   // Esta función ya no se usa directamente, pero la mantenemos por compatibilidad
  // };

  const cerrarModal = () => {
    onCerrarModal();
    setMetodoSeleccionado(null);
  };

  return (
    <>
      {/* Botón de donación flotante */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onCerrarModal}
          className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-4 rounded-full shadow-2xl hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 transform hover:scale-110 group"
          title="Apoyar al Guerrero Desarrollador"
        >
          <Heart className="h-6 w-6 group-hover:animate-pulse" />
        </button>
      </div>

      {/* Modal de donaciones */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold">Apoyar al Guerrero</h2>
                </div>
                <button
                  onClick={cerrarModal}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-300 mt-2 text-sm">
                Tu apoyo ayuda a mantener y mejorar esta herramienta
              </p>
            </div>

            <div className="p-6">
              {!metodoSeleccionado ? (
                /* Selección de método de pago */
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <Gift className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      ¡Gracias por considerar una donación!
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Esta calculadora es gratuita y de código abierto. Tu apoyo ayuda a mantenerla
                      actualizada y crear nuevas herramientas para la comunidad laboral.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setMetodoSeleccionado('mercadopago')}
                      className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center gap-3"
                    >
                      <CreditCard className="h-6 w-6 text-blue-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">MercadoPago</div>
                        <div className="text-sm text-gray-600">Tarjetas, PSE, efectivo</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setMetodoSeleccionado('nequi')}
                      className="w-full p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center gap-3"
                    >
                      <Smartphone className="h-6 w-6 text-purple-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">Nequi</div>
                        <div className="text-sm text-gray-600">Transferencia móvil</div>
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-800 text-center">
                      <strong>Nota:</strong> Cualquier monto es apreciado. No hay presión para donar,
                      la herramienta seguirá siendo completamente gratuita.
                    </p>
                  </div>
                </div>
              ) : (
                /* Información de donación específica */
                <div className="space-y-4">
                  <button
                    onClick={() => setMetodoSeleccionado(null)}
                    className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 mb-4"
                  >
                    ← Volver a métodos de pago
                  </button>

                  {metodoSeleccionado === 'mercadopago' && (
                    <div className="text-center">
                      <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Donación vía MercadoPago
                      </h3>

                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-blue-800 mb-3">
                          Puedes donar usando tarjetas de crédito, débito, PSE o efectivo en puntos autorizados.
                        </p>

                        {/* Aquí iría el enlace real de MercadoPago */}
                        <div className="bg-white p-3 rounded border border-blue-200">
                          <p className="text-xs text-gray-600 mb-2">Enlace de donación:</p>
                          <p className="text-sm font-mono text-blue-700 break-all">
                            https://link.mercadopago.com.co/calculadoraguerrero
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => window.open('https://mercadopago.com.co', '_blank')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Ir a MercadoPago
                      </button>
                    </div>
                  )}

                  {metodoSeleccionado === 'nequi' && (
                    <div className="text-center">
                      <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Donación vía Nequi
                      </h3>

                      <div className="bg-purple-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-purple-800 mb-3">
                          Puedes enviar tu donación directamente desde la app de Nequi.
                        </p>

                        <div className="bg-white p-3 rounded border border-purple-200">
                          <p className="text-xs text-gray-600 mb-2">Número Nequi:</p>
                          <p className="text-lg font-bold text-purple-700">
                            +57 300 123 4567
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            Nombre: Calculadora Guerrero
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p>1. Abre tu app Nequi</p>
                        <p>2. Ve a "Enviar plata"</p>
                        <p>3. Ingresa el número mostrado arriba</p>
                        <p>4. Envía el monto que desees</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-800 text-center">
                      <strong>¡Gracias por tu apoyo!</strong> Tu donación ayuda a mantener
                      esta herramienta gratuita y desarrollar nuevas funcionalidades.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}