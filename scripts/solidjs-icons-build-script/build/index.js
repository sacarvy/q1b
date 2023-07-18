const fs = require("node:fs");

function buildMaterial(path, gr) {
	// console.log(gr);
	fs.writeFileSync(path, "", function (err, data) {
		if (err) {
			// console.log("ERROR BUILD")
			console.log(err);
		}
		// console.log(data, "no text condition satisfied");
	});
	let buffer = Buffer.from(gr, "utf-8");
	fs.open(path, "a", function (err, fd) {
		// If the output file does not exists
		// an error is thrown else data in the
		// buffer is written to the output file
		if (err) {
			console.log("Cant open file");
		} else {
			fs.write(
				fd,
				buffer,
				0,
				buffer.length,
				null,
				function (err, writtenbytes) {
					if (err) {
						console.log("Cant write to file");
					} else {
						console.log(writtenbytes + " characters added to file");
					}
				},
			);
		}
	});
}

module.exports = buildMaterial;
