import { pmofUpload } from "../src/providers/pmof2";
import * as fs from "fs";

describe("pmofUploader", () => {

  it("should upload a file and return a URL", async () => {
    const testFile = "tests/dummy.txt";
    fs.writeFileSync(testFile, "hello pmof");

    const result = await pmofUpload(testFile);

    expect(result.success).toBe(true);
    expect(result.url).toMatch(/^https?:\/\//);

    fs.unlinkSync(testFile);
  });
});
