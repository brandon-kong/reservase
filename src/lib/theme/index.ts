import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    colors,
});

export default theme;