import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import shadows from "./shadows";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    colors,
    shadows,
});

export default theme;