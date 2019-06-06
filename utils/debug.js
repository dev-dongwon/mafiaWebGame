const debug = {

	color : {
		cyanColor : '\x1b[36m',
		greenColor : '\x1b[32m',
		redColor : '\x1b[31m',
		resetColor : '\x1b[0m',
	},

	log(tag) {
		if (!tag) {
			console.error(`${debug.color.redColor}[debug module]${debug.color.resetColor} 태그를 지정하세요`);
		}
		return (message) => {
			const log = `${debug.color.cyanColor}[${tag}]${debug.color.resetColor}` + 
									` ${debug.color.greenColor}${message}${debug.color.resetColor}`;
			console.log(log);
			return log;
		}
	}
}

module.exports = debug.log;