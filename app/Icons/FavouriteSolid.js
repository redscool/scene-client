import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function FavouriteSolid({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(26 * size) / 30}
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.527 3.959C11.822.807 7.303-.167 3.915 2.719.526 5.605.049 10.431 2.71 13.844c2.212 2.838 8.908 8.823 11.103 10.76.245.217.368.326.511.368a.686.686 0 00.387 0c.143-.042.266-.15.511-.367 2.195-1.938 8.89-7.923 11.103-10.761 2.66-3.413 2.242-8.27-1.205-11.125C21.673-.137 17.231.807 14.527 3.96z"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
