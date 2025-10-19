function getRandomDecimal(min: number, max: number, decimals = 1) {
	const num = Math.random() * (max - min) + min;
	return Number(num.toFixed(decimals));
}

export function temperatureGenarete() {
	return {
		supply(temp: number) {
			if (temp === -0.5) {
				return getRandomDecimal(0.2, 0.4) + temp;
			}

			if (temp === 0.0) {
				return getRandomDecimal(0.1, 0.3) + temp;
			}

			if (temp === -1.0) {
				return getRandomDecimal(0.1, 0.2) + temp;
			}

			if (temp >= 0) {
				return getRandomDecimal(0.1, 1) + temp;
			}

			return temp + -getRandomDecimal(2, 5);
		},

		return(temp: number) {
			if (temp === -0.5) {
				return -getRandomDecimal(0.2, 0.4) - temp;
			}

			if (temp === 0.0) {
				return getRandomDecimal(1, 1.5) + temp;
			}

			if (temp === -1.0) {
				return getRandomDecimal(0.1, 0.9) + temp;
			}

			if (temp >= 0) {
				return getRandomDecimal(2, 4) + temp;
			}

			return moreOrLess(temp) + getRandomDecimal(0.6, 1);
		},
	};
}

function moreOrLess(value: number) {
	const randomNumber: 1 | 2 = getRandomDecimal(1, 2, 0) as 1 | 2;

	const fn = {
		1: (number: number) => {
			return number - 1;
		},

		2: (number: number) => {
			return number;
		},
	};

	return fn[randomNumber](value);
}
