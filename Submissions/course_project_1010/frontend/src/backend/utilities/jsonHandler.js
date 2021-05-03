import util from "util";
import fs from "fs";
import path from "path";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const createDir = async (filePath) => {
  const dir = path.parse(filePath).dir;
  if (fs.existsSync(dir)) {
    console.log("Directory exists!");
  } else {
    console.log("Directory not found.");
    try {
      await fs.promises.mkdir(dir, { recursive: true });
      console.log(`"${dir}" created!`);
    } catch (error) {
      console.log(`Failed to create directory "${dir}", ${error}`);
    }
  }
};

const addPayload = (filePath, payload, storedData) => {
  return new Promise((resolve, reject) => {
    if (storedData.length !== 0) {
      let data = JSON.parse(storedData);
      data.push(payload);
      resolve(data);
    } else {
      reject(new Error(`Error: data not found at: ${filePath}`));
    }
  });
};

const createItem = async (filePath, payload) => {
  try {
    const storedData = await readFile(filePath);
    const updatedData = await addPayload(filePath, payload, storedData);
    await writeFile(filePath, JSON.stringify(updatedData));
  } catch (error) {
    console.log(error.message);
    if (error.code == "ENOENT") {
      console.log(`"${filePath}" does not exist!`);
      try {
        await createDir(filePath);
        await writeFile(filePath, `[${JSON.stringify(payload)}]`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const readItems = async (filePath) => {
  return JSON.parse(await readFile(filePath));
};

const getIndexByPK = (textPK, valuePK, itemsArr) => {
  return new Promise((resolve, reject) => {
    const dummy = valuePK;
    const index = itemsArr.findIndex((props) => props[textPK] == valuePK);
    if (index == -1)
      reject(`The entry with the given ${textPK}# ${valuePK} is not found.`);
    resolve(index);
  });
};

const updateItem = async (textPK, valuePK, filePath, payload) => {
  try {
    const itemsArr = await readItems(filePath);
    const index = await getIndexByPK(textPK, valuePK, itemsArr);
    Object.assign(itemsArr[index], payload);
    return await writeFile(filePath, JSON.stringify(itemsArr));
  } catch (error) {
    if (error) throw error;
  }
};

const removeItem = async (textPK, valuePK, filePath) => {
  try {
    let itemsArr = await readItems(filePath);
    const index = await getIndexByPK(textPK, valuePK, itemsArr);
    itemsArr.splice(index, 1);
    return await writeFile(filePath, JSON.stringify(itemsArr));
  } catch (error) {
    if (error) throw error;
  }
};

export {
  createItem,
  updateItem,
  removeItem,
  // Here we give the readItems function a different name that makes sense for files requiring it
  readItems,
};
