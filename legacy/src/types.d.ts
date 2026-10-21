interface RaffleDataForm {
  lottery: string;
  prize: string;
  maxNumber: number;
  drawDate: string;
  precioNumero: number;
}

interface Raffle {
  id: number;
  numeroMaximo: number;
  fechaRifa: string;
  loteria: string;
  premio: string;
  precioNumero: number;
}

interface RequestNumber {
  id: number;
  numero: number;
  nombre: string;
  numeroDeContacto: string;
  estado: string;
}

interface ChoosenNumber {
  estado: string;
  numero: number;
}

type CreateRaffleType = {
  usuarioId: number;
  premio: string;
  fechaRifa: string;
  numeroMaximo: number;
  precioNumero: number;
};

type UpdateRaffleType = Omit<CreateRaffleType, "usuarioId">;
