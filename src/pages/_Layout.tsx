import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import { Header } from "../components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout = ({ children }: LayoutProps) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [heightOffset, setHeightOffset] = useState(0);

  useEffect(() => {
    setHeightOffset(headerRef.current?.getBoundingClientRect().height ?? 0);
  }, [headerRef]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header ref={headerRef} />
      <div
        style={{
          marginTop: `${heightOffset}px`,
          flexGrow: 1,
          display: "flex",
        }}
      >
        {children}
      </div>
      <Typography
        variant="caption"
        textAlign="center"
        sx={{ backgroundColor: "info.light", paddingY: "0.25rem" }}
      >
        Disney and Disney characters are trademarks of Walt Disney Company.
      </Typography>
    </div>
  );
};
