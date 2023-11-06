export default class ValidationService {
	static validate = ({value, required}, callback) => {
		if (!value && required) {
			return callback(new Error("Поле не может быть пустым"), null);
		}
		if (isNaN(value) || isNaN(parseFloat(value))) {
			return callback(new Error('Значение должно быть числом'), null);
		}
		return callback(null, value)
	}
}
