import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

const ConfirmReloadDialog = ({
  obj = {},
  isChecked = false,
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
      {isChecked ? (
        <button
          className="text-green-600 btn btn-ghost btn-circle btn-sm hover:bg-green-600 hover:text-gray-50"
          disabled={disabled}
          onClick={onOpen}
        >
          <CheckIcon className="w-4 h-4" />
        </button>
      ) : (
        <button
          className="text-orange-600 btn btn-ghost btn-circle btn-sm hover:bg-orange-600 hover:text-gray-50"
          disabled={disabled}
          onClick={onOpen}
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
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

export default ConfirmReloadDialog;
