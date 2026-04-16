import Swal from "sweetalert2";

export function alertSuccess(message: string) {
  Swal.fire({
    title: "Success",
    icon: "success",
    text: `${message}`,
  });
}

export function alertError(message: string) {
  Swal.fire({
    title: "Failed",
    icon: "error",
    text: `${message}`,
  });
}
