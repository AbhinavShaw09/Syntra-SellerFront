import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ShowToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function showToast({
  title,
  description,
  type = "info",
  actionLabel,
  onActionClick,
}: ShowToastProps) {
  const action =
    actionLabel && onActionClick
      ? { label: actionLabel, onClick: onActionClick }
      : undefined;
  switch (type) {
    case "success":
      toast.success(title, { description, action });
      break;
    case "error":
      toast.error(title, { description, action });
      break;
    case "warning":
      toast.warning(title, { description, action });
      break;
    default:
      toast.info(title, { description, action });
  }
}
