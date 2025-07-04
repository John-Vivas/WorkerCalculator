// Tipos para la aplicación de cálculo de horas
export interface Jornada {
  id: string;
  fecha: string;
  horaEntrada: string;
  horaSalida: string;
  horasExtrasData: {
    diurnas: number;
    nocturnas: number;
    dominicales: number;
    dominicalesNocturnas: number;
  };
}

export interface DatosLaborales {
  nombreTrabajador: string;
  salarioMensual: number;
  jornadas: Jornada[];
}

export interface ResumenCalculos {
  horasTotales: number;
  horasNormales: number;
  horasExtrasDiurnas: number;
  horasExtrasNocturnas: number;
  horasExtrasDominicales: number;
  horasExtrasDominicalesNocturnas: number;
  valorHorasNormales: number;
  valorExtrasDiurnas: number;
  valorExtrasNocturnas: number;
  valorExtrasDominicales: number;
  valorExtrasDominicalesNocturnas: number;
  totalGanado: number;
}

export interface HorarioSemanal {
  lunes: { entrada: string; salida: string; activo: boolean };
  martes: { entrada: string; salida: string; activo: boolean };
  miercoles: { entrada: string; salida: string; activo: boolean };
  jueves: { entrada: string; salida: string; activo: boolean };
  viernes: { entrada: string; salida: string; activo: boolean };
  sabado: { entrada: string; salida: string; activo: boolean };
  domingo: { entrada: string; salida: string; activo: boolean };
}