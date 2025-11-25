import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;

  /** Largeur maximale (sm, md, lg, xl, full) */
  size?: "sm" | "md" | "lg" | "xl" | "full";

  /** Nombre de colonnes (ex: 1, 2, 3, 4...) */
  columns?: number;

  /** Espacement horizontal (par défaut `px-4` mobile, `px-6` desktop) */
  paddingX?: string;

  /** Ajoute un padding vertical (py) */
  paddingY?: string;
};

const sizeMap: Record<NonNullable<Props["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-full"
};

export default function Container({
  children,
  className,
  size = "xl",
  columns,
  paddingX = "px-4 sm:px-6",
  paddingY = ""
}: Props) {
  const gridClass = columns
    ? `grid grid-cols-1 sm:grid-cols-${columns} gap-4`
    : "";
  return (
    <div
      className={clsx(
        "w-full mx-auto",
        sizeMap[size],
        paddingX,
        paddingY,
        gridClass,
        className
      )}
    >
      {children}
    </div>
  );
}
