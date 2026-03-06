import * as fs from "node:fs/promises";
import * as readline from "node:readline/promises";
import path from "node:path";
import { stdin as input, stdout as output } from "node:process";

const mainDir = "newfile";

const rl = readline.createInterface({ input, output });
const question = (input) => {
  return new Promise((resolve) => {
    resolve(rl.question(input));
  });
};

const updateContent = async (fileName, dataToAppend) => {
  const fileName = await question("Nama file yang ingin di update: ");
  try {
    const oldwriteFile = await fs.readFile(
      path.join(mainDir, fileName),
      "utf-8",
    );
    console.log("Isi saat ini:", oldwriteFile);
    const newwriteFile = await question("Isi yang baru: ");
    await fs.writeFile(path.join(mainDir, fileName), newwriteFile, "utf-8");
    console.log("Content sudah diupdate");
  } catch (err) {
    console.log("File tidak ada!", err);
  }
};

const removeFile = async () => {
  const fileName = await question(
    "File Mana yang ingin kamu hapus (cth : namaFile.txt)? ",
  );
  const answer = await question("Apakah kamua yakin menghapus File ini Y/n ? ");
  const filePath = path.join(mainDir, fileName);

  if (answer.toLowerCase() === "y") {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log("File berhasil terhapus");
    });
  } else {
    return;
  }
};

const createFile = async () => {
  const fileName = await question("Nama file :");
  const filePath = path.join(mainDir, fileName.trim());
  fs.writeFile(filePath, "utf-8", (err) => {
    if (err) throw err;
    console.log("File berhasil dibuat");
  });
};

const readFile = () => {
  fs.readFile(pathFile, (err) => {
    if (err) throw err;
    console.log("File dalam mode : Read");
  });
};

const userInteactive = async () => {
  const answer = await question(
    `
    Apa yang ingin anda lakukan ?
    Tekan 1 jika ingin menambahkan file
    Tekan 2 jika ingin mengupdate file
    Tekna 3 jika ingin melihat file
    Tekan 4 jika ingin menghapus file
    jawaban : `,
  );
  if (answer == 1) {
    await createFile();
  }
  if (answer == 2) {
  }
  if (answer == 3) {
  }
  if (answer == 4) {
    await removeFile();
  }
};

userInteactive();
