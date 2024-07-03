'use client';

import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
  const router = useRouter(); // ne fonctionne que dans un composant client

  return (
    // onClick={router.back} : permet de retourner a la page precedente en cliquant sur le background du modal 
    <div className="modal-backdrop" onClick={router.back} />
  );
}