import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ConfirmDialog = ({
  obj = {},
  disabled = false,
  title = "ยืนยันคำสั่ง!",
  description = "description.",
  handlerConfirm = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const Confirm = () => {
    handlerConfirm(obj);
    onClose();
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-circle btn-sm text-rose-600 hover:bg-rose-600 hover:text-gray-50"
        disabled={disabled}
        onClick={onOpen}
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button colorScheme="red" ml={3} onClick={Confirm}>
              ยืนยันคำสั่ง
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmDialog;
