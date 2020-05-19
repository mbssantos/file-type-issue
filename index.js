const fs = require("fs");
const FileType = require("file-type");

async function broken(input, outputSuffix) {
  const readStream = fs.createReadStream(input);
  const type = await FileType.fromStream(readStream);

  console.log({ type });

  const writeStream = fs.createWriteStream(`mangled-${outputSuffix}.pdf`);
  readStream.pipe(writeStream);
}

async function working(input, outputSuffix) {
  const readStream = fs.createReadStream(input);

  const writeStream = fs.createWriteStream(`working-${outputSuffix}.pdf`);
  readStream.pipe(writeStream);
}

// when checking the type, the write stream is mangled
broken('./input.1.3.pdf', 'v1.3')
broken('./input.1.4.pdf', 'v1.4');

// without checking the type, the write stream is fine
working('./input.1.3.pdf', 'v1.3');
working('./input.1.4.pdf', 'v1.4');