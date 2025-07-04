import type { Jornada, ResumenCalculos } from "../types";


/**
 * Calcula las horas trabajadas en una jornada específica
 * @param horaEntrada - Hora de entrada en formato HH:MM
 * @param horaSalida - Hora de salida en formato HH:MM
 * @returns Número de horas trabajadas
 */
export function calcularHorasJornada(horaEntrada: string, horaSalida: string): number {
  if (!horaEntrada || !horaSalida) return 0;
  
  const [entradaHoras, entradaMinutos] = horaEntrada.split(':').map(Number);
  const [salidaHoras, salidaMinutos] = horaSalida.split(':').map(Number);
  
  const entradaEnMinutos = entradaHoras * 60 + entradaMinutos;
  let salidaEnMinutos = salidaHoras * 60 + salidaMinutos;
  
  // Si la salida es menor que la entrada, asumimos que es al día siguiente
  if (salidaEnMinutos < entradaEnMinutos) {
    salidaEnMinutos += 24 * 60;
  }
  
  const diferenciaMinutos = salidaEnMinutos - entradaEnMinutos;
  return diferenciaMinutos / 60;
}

/**
 * Calcula las horas nocturnas trabajadas según la nueva ley 2466 de 2025
 * Horario nocturno: 7:00 PM (19:00) - 6:00 AM (06:00)
 * @param horaEntrada - Hora de entrada en formato HH:MM
 * @param horaSalida - Hora de salida en formato HH:MM
 * @returns Número de horas nocturnas trabajadas
 */
export function calcularHorasNocturnas(horaEntrada: string, horaSalida: string): number {
  if (!horaEntrada || !horaSalida) return 0;
  
  const [entradaHoras, entradaMinutos] = horaEntrada.split(':').map(Number);
  const [salidaHoras, salidaMinutos] = horaSalida.split(':').map(Number);
  
  const entradaEnMinutos = entradaHoras * 60 + entradaMinutos;
  let salidaEnMinutos = salidaHoras * 60 + salidaMinutos;
  
  // Si la salida es menor que la entrada, asumimos que es al día siguiente
  if (salidaEnMinutos < entradaEnMinutos) {
    salidaEnMinutos += 24 * 60;
  }
  
  // Horarios nocturnos según ley 2466 de 2025
  const inicioNocturno = 19 * 60; // 7:00 PM
  const finNocturno = 6 * 60; // 6:00 AM del día siguiente
  // const finNocturnoExtendido = finNocturno + 24 * 60; // 6:00 AM del día siguiente en minutos extendidos
  
  let horasNocturnas = 0;
  
  // Caso 1: Jornada completamente diurna
  if (salidaEnMinutos <= inicioNocturno && entradaEnMinutos >= finNocturno) {
    return 0;
  }
  
  // Caso 2: Entrada en horario nocturno de la noche anterior (antes de 6:00 AM)
  if (entradaEnMinutos < finNocturno) {
    const salidaNocturna = Math.min(salidaEnMinutos, finNocturno);
    horasNocturnas += (salidaNocturna - entradaEnMinutos) / 60;
  }
  
  // Caso 3: Trabajo durante el día y entrada al horario nocturno (después de 7:00 PM)
  if (salidaEnMinutos > inicioNocturno) {
    const entradaNocturna = Math.max(entradaEnMinutos, inicioNocturno);
    
    // Si la jornada se extiende al día siguiente
    if (salidaEnMinutos > 24 * 60) {
      // Horas nocturnas de la noche (7:00 PM - 12:00 AM)
      horasNocturnas += (24 * 60 - entradaNocturna) / 60;
      // Horas nocturnas de la madrugada (12:00 AM - 6:00 AM)
      const salidaMadrugada = Math.min(salidaEnMinutos - 24 * 60, finNocturno);
      horasNocturnas += salidaMadrugada / 60;
    } else {
      // Jornada que no cruza medianoche
      horasNocturnas += (salidaEnMinutos - entradaNocturna) / 60;
    }
  }
  
  return Math.max(0, horasNocturnas);
}

/**
 * Calcula las horas diurnas trabajadas según la nueva ley 2466 de 2025
 * Horario diurno: 6:00 AM (06:00) - 7:00 PM (19:00)
 * @param horaEntrada - Hora de entrada en formato HH:MM
 * @param horaSalida - Hora de salida en formato HH:MM
 * @returns Número de horas diurnas trabajadas
 */
export function calcularHorasDiurnas(horaEntrada: string, horaSalida: string): number {
  const horasTotales = calcularHorasJornada(horaEntrada, horaSalida);
  const horasNocturnas = calcularHorasNocturnas(horaEntrada, horaSalida);
  return Math.max(0, horasTotales - horasNocturnas);
}

/**
 * Determina si una fecha corresponde a domingo
 * @param fecha - Fecha en formato YYYY-MM-DD
 * @returns true si es domingo
 */
export function esDomingo(fecha: string): boolean {
  const fechaObj = new Date(fecha + 'T00:00:00');
  return fechaObj.getDay() === 0;
}

/**
 * Calcula el valor de una hora normal basado en el salario mensual
 * @param salarioMensual - Salario mensual del trabajador
 * @returns Valor por hora normal
 */
export function calcularValorHoraNormal(salarioMensual: number): number {
  // Usando 240 horas mensuales como estándar (30 días x 8 horas)
  return salarioMensual / 240;
}

/**
 * Calcula todos los valores y totales de las jornadas trabajadas
 * Actualizado con los nuevos horarios según ley 2466 de 2025
 * @param jornadas - Array de jornadas trabajadas
 * @param salarioMensual - Salario mensual base
 * @returns Resumen completo de cálculos
 */
export function calcularResumenCompleto(jornadas: Jornada[], salarioMensual: number): ResumenCalculos {
  const valorHoraNormal = calcularValorHoraNormal(salarioMensual);
  
  let horasNormales = 0;
  let horasExtrasDiurnas = 0;
  let horasExtrasNocturnas = 0;
  let horasExtrasDominicales = 0;
  let horasExtrasDominicalesNocturnas = 0;
  
  // Procesar cada jornada
  jornadas.forEach(jornada => {
    const horasJornada = calcularHorasJornada(jornada.horaEntrada, jornada.horaSalida);
    const horasDiurnasJornada = calcularHorasDiurnas(jornada.horaEntrada, jornada.horaSalida);
    const horasNocturnasJornada = calcularHorasNocturnas(jornada.horaEntrada, jornada.horaSalida);
    
    if (esDomingo(jornada.fecha)) {
      // En domingo, todas las horas son extras dominicales
      // Separamos entre diurnas y nocturnas dominicales
      horasExtrasDominicales += horasDiurnasJornada;
      horasExtrasDominicalesNocturnas += horasNocturnasJornada;
    } else {
      // En días normales, las primeras 8 horas son normales
      const horasNormalesJornada = Math.min(horasJornada, 8);
      horasNormales += horasNormalesJornada;
      
      // Las horas que excedan 8 horas se consideran extras
      const horasExtrasJornada = Math.max(0, horasJornada - 8);
      
      if (horasExtrasJornada > 0) {
        // Determinar si las horas extras son diurnas o nocturnas
        // Esto es una simplificación - en la práctica sería más complejo
        const proporcionNocturna = horasNocturnasJornada / horasJornada;
        const extrasNocturnas = horasExtrasJornada * proporcionNocturna;
        const extrasDiurnas = horasExtrasJornada - extrasNocturnas;
        
        horasExtrasDiurnas += extrasDiurnas;
        horasExtrasNocturnas += extrasNocturnas;
      }
    }
    
    // Agregar horas extras manuales
    horasExtrasDiurnas += jornada.horasExtrasData.diurnas;
    horasExtrasNocturnas += jornada.horasExtrasData.nocturnas;
    horasExtrasDominicales += jornada.horasExtrasData.dominicales;
    horasExtrasDominicalesNocturnas += jornada.horasExtrasData.dominicalesNocturnas;
  });
  
  // Calcular valores monetarios según legislación colombiana
  const valorExtrasDiurnas = horasExtrasDiurnas * valorHoraNormal * 1.25; // 25% adicional
  const valorExtrasNocturnas = horasExtrasNocturnas * valorHoraNormal * 1.75; // 75% adicional
  const valorExtrasDominicales = horasExtrasDominicales * valorHoraNormal * 1.75; // 75% adicional
  const valorExtrasDominicalesNocturnas = horasExtrasDominicalesNocturnas * valorHoraNormal * 2.0; // 100% adicional
  
  const valorHorasNormales = horasNormales * valorHoraNormal;
  const totalGanado = valorHorasNormales + valorExtrasDiurnas + valorExtrasNocturnas + 
                     valorExtrasDominicales + valorExtrasDominicalesNocturnas;
  
  return {
    horasTotales: horasNormales + horasExtrasDiurnas + horasExtrasNocturnas + 
                  horasExtrasDominicales + horasExtrasDominicalesNocturnas,
    horasNormales,
    horasExtrasDiurnas,
    horasExtrasNocturnas,
    horasExtrasDominicales,
    horasExtrasDominicalesNocturnas,
    valorHorasNormales,
    valorExtrasDiurnas,
    valorExtrasNocturnas,
    valorExtrasDominicales,
    valorExtrasDominicalesNocturnas,
    totalGanado
  };
}

/**
 * Formatea un número como moneda colombiana
 * @param valor - Valor numérico
 * @returns String formateado como moneda
 */
export function formatearMoneda(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
}

/**
 * Formatea las horas con dos decimales
 * @param horas - Número de horas
 * @returns String formateado
 */
export function formatearHoras(horas: number): string {
  return horas.toFixed(2);
}