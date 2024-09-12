import { useCallback } from "react";
import Swal from "sweetalert2";

const useCopyUrl = () => {
  const copyUrlToClipboard = useCallback(() => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "URL이 클립보드에 복사되었습니다.",
        });
      })
      .catch((err) => {});
  }, []);

  return copyUrlToClipboard;
};

export default useCopyUrl;
