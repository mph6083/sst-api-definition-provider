import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

export async function run(): Promise<void> {
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");

  try {
    const files: any = await globPromise("**/*.test.js", { cwd: testsRoot });
    files.forEach((file) => mocha.addFile(path.resolve(testsRoot, file)));

    mocha.run((failures) => {
      if (failures > 0) {
        throw new Error(`${failures} tests failed.`);
      }
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
