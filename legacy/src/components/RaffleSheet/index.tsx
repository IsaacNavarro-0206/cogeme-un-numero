import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Loader2, Phone, User } from "lucide-react";
import { Input } from "../ui/input";
import { ChoosenNumbers, GetChoosenNumbers } from "@/service/choosenNumber";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "El teléfono debe ser un número")
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .required("Teléfono es requerido"),
});

export type raffleSheetDataForm = yup.InferType<typeof schema>;

const RaffleSheet = ({
  maxNumber,
  raffleId,
}: {
  maxNumber: number;
  raffleId: string | undefined;
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [numbersStatus, setNumbersStatus] = useState<ChoosenNumber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<raffleSheetDataForm>(schema),
    mode: "onChange",
  });

  const getNumbers = async () => {
    try {
      const res = await GetChoosenNumbers(raffleId);

      setNumbersStatus(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNumbers();
  }, []);

  const handleBlockedNumber = (num: number) =>
    numbersStatus.some(
      (number) =>
        num === number?.numero &&
        (number?.estado === "pendiente" || number?.estado === "aceptado")
    );

  const handleColorButton = (index: number) => {
    if (handleBlockedNumber(index)) {
      return "disabled:bg-red-500 disabled:opacity-80 text-white disabled:cursor-not-allowed";
    } else {
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
    }
  };

  const onSubmit = async (data: raffleSheetDataForm) => {
    try {
      setIsLoading(true);

      await Promise.all(
        selectedNumbers.map(async (selectedNumber: number) => {
          const obj = {
            numero: selectedNumber,
            raffleId: Number(raffleId),
            nombre: data.name,
            numeroDeContacto: data.phone,
          };

          return await ChoosenNumbers(obj);
        })
      );

      setSelectedNumbers([]);
      getNumbers();

      toast({
        title: "Número(s) seleccionado(s)!",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description:
          "No se pudo seleccionar el/los número(s). Por favor intenta nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  // Función que agrega o remueve un número del estado cuando se hace clic en él
  const handleSelectedNumbers = (number: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? // Si el número ya está seleccionado, se remueve
          prev.filter((n) => n !== number)
        : // Si no está seleccionado, se agrega al array
          [...prev, number]
    );
  };

  return (
    <Card className="bg-white w-11/12 max-w-2xl mb-5">
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-5 gap-2 pt-4 h-60 custom-scrollbar overflow-y-auto max-h-screen">
          {Array.from({ length: maxNumber }).map((_, index) => {
            const isSelected = selectedNumbers.includes(index);

            return (
              <Button
                disabled={handleBlockedNumber(index)}
                key={index}
                className={`${
                  isSelected
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : handleColorButton(index)
                } 
                   rounded-lg text-lg font-semibold flex items-center justify-center transition-all w-full h-auto sm:h-28`}
                onClick={() => handleSelectedNumbers(index)}
              >
                {index < 10 ? "0" + index : index}
              </Button>
            );
          })}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo nombre */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nombre</Label>

            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

              <Input
                className={`${
                  errors?.name && "border-red-500 focus-visible:ring-0"
                } pl-9`}
                id="name"
                placeholder="Joe Doe"
                {...register("name")}
              />
            </div>

            {errors?.name && (
              <p className="text-red-500 text-sm">{errors?.name.message}</p>
            )}
          </div>

          {/* Campo telefono */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="phone">Número de teléfono</Label>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

              <Input
                type="number"
                className={`${
                  errors?.phone && "border-red-500 focus-visible:ring-0"
                } pl-9`}
                id="phone"
                placeholder="3xx xxx xxxx"
                {...register("phone")}
              />
            </div>

            {errors?.phone && (
              <p className="text-red-500 text-sm">{errors?.phone.message}</p>
            )}
          </div>

          <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Seleccionar número(s)"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RaffleSheet;
