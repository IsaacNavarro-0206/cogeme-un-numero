// import { useParams } from "react-router-dom";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// import { DeleteUser } from "../services/profile";

const ButtonDeleteProfile = () => {
  // const { id } = useParams();

  // const deleteUser = () => {
  //   try {
  //     const userId: number = Number(id)
  //     const res = DeleteUser(1);

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <AlertDialogTrigger>
      <Button variant="destructive">Eliminar cuenta</Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar tu cuenta?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Esta acción no puede ser deshecha. Tu cuenta y tus datos se
            eliminarán permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction className="bg-destructive">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogTrigger>
  );
};

export default ButtonDeleteProfile;
