import { countries } from 'countries-list';
import countryCodeLists from 'country-codes-list';
import codes from 'country-calling-code';

export const countryCodes = Object.entries(countries).map(([key, value]) => ({
    code: key,
    name: value.name,
    phone: value.phone,
    value: `${value.name} +${value.phone}`,
    label: ` ${value.name} (+${value.phone})`,
}));

export const getCountryCodes = () => {
    const a = [];

    for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        if (code.countryCodes.length === 1) {
            a.push({
                phone: code.countryCodes[0],
                name: code.country,
                value: `${code.country}:${code.countryCodes[0]}:${code.isoCode2}`,
                label: ` ${code.country} (+${code.countryCodes[0]})`,
            });
        } else {
            for (let k = 0; k < code.countryCodes.length; k++) {
                const countryCode = code.countryCodes[k];
                a.push({
                    phone: countryCode,
                    name: code.country,
                    value: `${code.country}:${countryCode}:${code.isoCode2}`,
                    label: ` ${code.country} (+${countryCode})`,
                });
            }
        }
    }

    return a;
};
