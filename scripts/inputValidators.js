export const latitudeValidator = () => {
    return (error, value) => {
        if (error) {
            return error
        }
        if (0 > value || value > 90) {
            return new Error('Значение должно быть в пределах от 0° до 90°');
        }
    }
}

export const longitudeValidator = () => {
    return (error, value) => {
        if (error) {
            return error
        }
        if (0 > value || value > 180) {
            return new Error('Значение должно быть в пределах от 0° до 180°');
        }
    }
}