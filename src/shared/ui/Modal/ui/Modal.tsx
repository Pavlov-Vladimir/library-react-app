import { Portal } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onModalClose: () => void;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  const { isOpen, onModalClose, children } = props;

  return (
    <Portal>
      <DialogRoot
        open={isOpen}
        size="lg"
        placement="center"
        onOpenChange={onModalClose}
      >
        <DialogContent>
          <DialogHeader
            py="2"
            borderWidth="1px"
            borderColor="transparent"
            borderBottomColor="gray.muted"
          >
            <DialogTitle fontSize="3xl" textAlign="center">
              Details
            </DialogTitle>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Portal>
  );
}
