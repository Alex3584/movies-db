import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";

export default function CountdownText() {
  const [countdown, setCountdown] = useState(9);
  const intervalRef = useRef<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
    }
  }, [countdown]);

  return (
    <Typography variant="h4" align="center">
      Comming soon: {countdown}
    </Typography>
  );
}
