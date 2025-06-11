import React from "react";

type Props = {
  children: React.ReactNode;
  condition: boolean;
};

function If({ children, condition }: Props) {
  if (!condition) return null;

  return <>{children}</>;
}

export default If;
