import * as readline from "readline";

class ReadLineSingleton {
  private static instance: ReadLineSingleton | null = null;
  private rl: readline.Interface;

  private constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal:false,
    });
  }

  public static getInstance(): ReadLineSingleton {
    if (!ReadLineSingleton.instance) {
      ReadLineSingleton.instance = new ReadLineSingleton();
    }
    return ReadLineSingleton.instance;
  }

  public getInterface(): readline.Interface {
    return this.rl;
  }
}

const readLineSingleton = ReadLineSingleton.getInstance();
export default readLineSingleton.getInterface();
