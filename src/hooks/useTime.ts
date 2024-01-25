import { useEffect, useState, useRef } from 'react';
import dayjs from "dayjs";

/**
 * @description 获取本地时间
 */
export const useTimes = () => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const [time, setTime] = useState(dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
    }, 1000);
    return () => {
      if (timer) clearInterval(timer.current as NodeJS.Timer);
    };
  }, [time]);

  return {
    time
  };
};
