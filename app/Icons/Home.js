import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Home({color, size, style}) {
  return (
    <Svg
      width={size}
      height={0.9375 * size}
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M31.463 13.466l-4.85-4.85V3.014a1.834 1.834 0 00-3.668 0v1.934l-3.611-3.611c-1.786-1.785-4.89-1.782-6.67.003L.536 13.466a1.835 1.835 0 002.595 2.594L15.257 3.934c.395-.393 1.091-.393 1.484-.002L28.868 16.06c.36.358.829.537 1.297.537a1.835 1.835 0 001.298-3.13z"
        fill={color}
      />
      <Path
        d="M16.637 7.415a.9.9 0 00-1.274 0L4.697 18.078a.903.903 0 00-.264.638v7.777a3.305 3.305 0 003.305 3.305h5.28v-8.179h5.962v8.179h5.281a3.305 3.305 0 003.305-3.305v-7.777c0-.24-.095-.47-.264-.638L16.637 7.415z"
        fill={color}
      />
    </Svg>
  );
}
