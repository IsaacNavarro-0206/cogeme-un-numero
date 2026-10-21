import { Loader2, Lock, Mail, Phone, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { GetUser, UpdateUser } from "@/service/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ButtonDeleteProfile from "../ButtonDeleteProfile";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  email: yup
    .string()
    .email("Correo electrónico no válido")
    .required("Correo electrónico es requerido"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "El teléfono debe ser un número")
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .required("Teléfono es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type EditProfileDataForm = yup.InferType<typeof schema>;

const EditProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnableInputs, setIsEnableInputs] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileDataForm>({
    resolver: yupResolver<EditProfileDataForm>(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function getUserInfo(id: string) {
      try {
        const res = await GetUser(Number(id)); // Convert id to number

        const data = res?.data;
        if (data) {
          setValue("name", data.nombre);
          setValue("email", data.correoElectronico);
          setValue("phone", data.telefono);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) getUserInfo(id);
  }, [id, setValue]);

  const onSubmit = async (data: EditProfileDataForm) => {
    console.log(data, id);

    try {
      setIsLoading(true);

      const obj = {
        nombre: data.name,
        correoElectronico: data.email,
        contraseña: data.password,
        telefono: data.phone,
      };

      setIsEnableInputs(false);

      await UpdateUser(obj, id);

      toast({
        title: "¡Actualización exitosa!",
        description: "Tu cuenta ha sido actualizada correctamente",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description:
          "No se pudo actualizar el perfil. Por favor intenta nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm flex flex-col justify-center items-center sm:w-11/12 md:w-1/2 lg:w-2/5 mt-10">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl text-center">
          Perfil de usuario
        </CardTitle>

        <CardDescription>
          Gestiona tu información personal y cuenta
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full space-y-5">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
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
                  disabled={!isEnableInputs}
                  placeholder="Joe Doe"
                  {...register("name")}
                />
              </div>

              {errors?.name && (
                <p className="text-red-500 text-sm">{errors?.name.message}</p>
              )}
            </div>

            {/* Campo correo */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                <Input
                  type="email"
                  className={`${
                    errors?.email && "border-red-500 focus-visible:ring-0"
                  } pl-9`}
                  id="email"
                  disabled={!isEnableInputs}
                  placeholder="ejemplo@correo.com"
                  {...register("email")}
                />
              </div>

              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email.message}</p>
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
                  disabled={!isEnableInputs}
                  placeholder="3xx xxx xxxx"
                  {...register("phone")}
                />
              </div>

              {errors?.phone && (
                <p className="text-red-500 text-sm">{errors?.phone.message}</p>
              )}
            </div>

            {/* Campo contraseña */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                <Input
                  className={`${
                    errors?.password && "border-red-500 focus-visible:ring-0"
                  } pl-9`}
                  id="password"
                  type="password"
                  disabled={!isEnableInputs}
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
            </div>
          </div>

          {isEnableInputs && (
            <Button
              type="submit"
              onClick={() => console.log("HOLA")}
              className="bg-pink-600 hover:bg-pink-700 text-white w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Guardar cambios"
              )}
            </Button>
          )}
        </form>
      </CardContent>

      <CardFooter
        className={`${
          isEnableInputs ? "justify-end" : "justify-between"
        } w-full flex items-center`}
      >
        <Button
          className={`${
            isEnableInputs ? "hidden" : ""
          } bg-pink-600 hover:bg-pink-700 text-white`}
          onClick={() => setIsEnableInputs(true)}
        >
          Editar datos
        </Button>

        <ButtonDeleteProfile />
      </CardFooter>
    </Card>
  );
};

export default EditProfileForm;
