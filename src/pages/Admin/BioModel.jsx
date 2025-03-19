import {
  Dialog,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

export default function BioModel({ model, handler, title, bio }) {
  return (
    <Dialog open={model} handler={handler}>
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">{title}</Typography>
            <IconButton
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
              onClick={handler} // Close on button click
            >
              <Xmark className="h-5 w-5" />
            </IconButton>
          </div>
          <Typography className="mb-6 mt-2 text-foreground">{bio}</Typography>
          <div className="mb-1 flex items-center justify-end gap-2">
            <Button variant="ghost" color="error" onClick={handler}>
              Cancel
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
