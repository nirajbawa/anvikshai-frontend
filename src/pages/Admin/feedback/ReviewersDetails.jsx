import {
  Dialog,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function ReviewersDetails({ model, handler, title, details }) {
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
          <div className="mb-6 mt-2 text-foreground">
            <div className="text-black prose max-w-full prose-lg prose-gray dark:prose-invert markdown-content">
              <p>
                <b>name :</b> {details?.first_name} {details?.last_name}
              </p>
              <p>
                <b>Email :</b> {details?.email}
              </p>
              <p>
                <b>Bio :</b> {details?.bio}
              </p>
              <p>
                <b>Domains :</b> {details?.domains.join(", ")}
              </p>
              <p>
                <b>Education :</b> {details?.education}
              </p>
              <p>
                <b>Stream :</b> {details?.stream_of_education}
              </p>
            </div>
          </div>
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
