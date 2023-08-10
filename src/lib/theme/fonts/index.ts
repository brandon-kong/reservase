import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['cyrillic'],
});

const fonts = {
    heading: montserrat.style.fontFamily,
    body: montserrat.style.fontFamily,
};

export default fonts;
