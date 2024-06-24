export default (code) => {
    switch (code) {
        case 0:
        case 1:
            return 'Clear sky';
        case 2:
            return 'Partly cloudy';
        case 3:
            return 'Overcast';
        case 45:
        case 48:
            return 'Fog';
        case 51:
            return ['Drizzle', 'Light'];
            case 53:
            return ['Drizzle', 'Moderate'];
            case 55:
            return ['Drizzle', 'Heavy'];
        case 61:
            return ['Rain', 'Light'];
            case 63:
            return ['Rain', 'Moderate'];
            case 65:
            return ['Rain', 'Heavy'];
        case 66:
            return ['Freezing Rain', 'Light'];
        case 67:
            return ['Freezing Rain', 'Heavy'];
        case 71:
            return ['Snow Fall', 'Light'];
        case 73:
            return ['Snow Fall', 'Moderate'];
        case 75:
            return ['Snow Fall', 'Heavy'];
        case 77:
         	return 'Snow Grains';
        case 80:
            return ['Rain Showers', 'Slight'];
        case 81:
            return ['Rain Showers', 'Moderate'];
        case 82:
            return ['Rain Showers', 'Moderate'];
        case 85:
            return ['Snow showers', 'Light'];
        case 86:
            return ['Snow showers', 'Moderate'];
        case 95:
            return 'Thunderstorm';
        case 96:
            return ['Thunderstorm', 'Moderate Hail'];
        case 99:
            return ['Thunderstorm', 'Heavy Hail'];
    }
}

export function parseWeatherSlug (code) {
    switch (code) {
        case 0:
        case 1:
            return 'clear';
        case 2:
            return 'partially-cloudy';
        case 3:
            return 'cloudy';
        case 45:
        case 48:
            return 'fog';
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return 'rainy';
        case 66:
        case 67:
            return 'freezing-rain';
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return 'snowfall';
        case 95:
        case 96:
        case 99:
            return 'thunderstorm';
    }
}