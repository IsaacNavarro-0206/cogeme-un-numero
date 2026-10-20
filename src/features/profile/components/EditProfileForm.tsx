import { Loader2, Lock, Mail, Phone, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ButtonDeleteProfile from "./ButtonDeleteProfile";
import { useEditProfileForm } from "../hooks";

const EditProfileForm = () => {
  const { id } = useParams();

  const { form, isEnableInputs, setIsEnableInputs, onSubmit, isLoading } =
    useEditProfileForm(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

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
