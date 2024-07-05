import Svg, {G, Rect, Path, Defs} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';

function Logo(props) {
  return (
    <View style={styles.container}>
      <Svg
        width={128}
        height={128}
        viewBox="0 0 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G filter="url(#filter0_d_1346_1321)">
          <Rect x={8} y={8} width={128} height={128} rx={16} fill="#1E1E1E" />
          <Path
            d="M34.3 72.805c-.327 0-.64-.063-.937-.188a2.727 2.727 0 01-.761-.515 2.431 2.431 0 01-.516-.762 2.39 2.39 0 01-.188-.938v-4.804c0-.329.063-.637.188-.926.125-.297.297-.55.516-.762a2.43 2.43 0 01.761-.515c.297-.133.61-.2.938-.2h8.156c.328 0 .637.067.926.2.297.124.554.296.773.515.219.211.39.465.516.762.125.289.187.597.187.926v2.168h-2.402v-2.168h-8.156v4.804h8.156c.328 0 .637.063.926.188.297.125.554.297.773.516.219.218.39.476.516.773.125.289.187.598.187.926v4.793c0 .328-.062.64-.187.937a2.396 2.396 0 01-1.29 1.277 2.307 2.307 0 01-.925.188h-8.39c-.329 0-.641-.063-.938-.188a2.431 2.431 0 01-1.277-1.277 2.392 2.392 0 01-.188-.937V75.44h2.402v2.157h8.391v-4.793h-8.156zm14.895-7.207c0-.329.063-.637.188-.926.125-.297.297-.55.515-.762.22-.219.473-.39.762-.515.297-.133.61-.2.938-.2h9.117c.328 0 .637.067.926.2.297.124.554.296.773.515.219.211.39.465.516.762.125.289.187.597.187.926v2.168h-2.402v-2.168h-9.117v12h9.117V75.44h2.402v2.157c0 .328-.062.64-.187.937a2.397 2.397 0 01-1.29 1.277 2.307 2.307 0 01-.925.188h-9.117a2.39 2.39 0 01-2.403-2.402v-12z"
            fill="#DCDCDC"
          />
          <Path
            d="M83.754 80h-2.402V63.195h2.402l10.102 13.032V63.195h2.402V80h-2.402L83.754 66.969V80zm16.816-16.805h12.246v2.403h-9.843v4.804h8.402v2.403h-8.402v4.793h9.843V80H100.57V63.195z"
            fill="#E1FF41"
          />
          <Path
            d="M77.766 63.195H65.519v2.403h9.844v4.804h-8.402v2.403h8.402v4.793H65.52V80h12.247V63.195z"
            fill="#fff"
          />
        </G>
        <Defs></Defs>
      </Svg>
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 0.5,
    elevation: 10,
    height: 128,
    justifyContent: 'center',
    marginTop: 120,
    shadowColor: colors.primary,
    shadowOffset: {height: 8, width: 8},
    shadowOpacity: 1,
    shadowRadius: 10,
    width: 128,
  },
});
