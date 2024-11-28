import React from "react";
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
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function LoadingDialog({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle></AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center py-10">
              <Image
                src={"/loading.gif"}
                width={100}
                height={100}
                alt={"loading icon"}
              />
              <span className="text-lg">
                AI is working on you course. Please wait for a moment....
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LoadingDialog;
