import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc?: string;
}

export function VideoModal({ isOpen, onOpenChange, videoSrc = "/demo.mp4" }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black border-none overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Product Demo Video</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            src={videoSrc}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
