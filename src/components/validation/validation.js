
const Service = {
    min: (value, minLength, t) => {
        if (value.length < minLength) {
            return t('min', { min: minLength });
        }
    },
    max: (value, maxLength, t) => {
        if (value.length > maxLength) {
            return t('max', { max: maxLength });
        }
    },
};

export default Service;
