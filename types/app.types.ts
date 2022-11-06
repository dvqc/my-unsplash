type ButtonType = ({
  type,
  onButton
}: {
  type: "like" | "delete";
  onButton: () => void;
}) => JSX.Element;

export type { ButtonType };
