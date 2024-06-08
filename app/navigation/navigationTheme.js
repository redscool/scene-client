import { DefaultTheme } from "@react-navigation/native";

import colors from "../config/colors";

export default {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background: colors.dark,
        border: colors.cardBorder,
        card: colors.card,
        primary: colors.primary,
        text: colors.text,
    }
}