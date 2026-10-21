// import { useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
// import { DeleteUser } from "@/service/user";

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Eliminar cuenta</Button>
      </AlertDialogTrigger>

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
    </AlertDialog>
  );
};

export default ButtonDeleteProfile;
