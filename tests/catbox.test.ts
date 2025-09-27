import { CatboxUploader } from "../src/providers/catbox";
import * as fs from "fs";

describe("CatboxUploader", () => {
  const uploader = new CatboxUploader();

  it("should upload a file and return a URL", async () => {
    const testFile = "tests/dummy.txt";
    fs.writeFileSync(testFile, "hello world");

    const result = await uploader.upload(testFile);

    expect(result.success).toBe(true);
    expect(result.url).toMatch(/^https?:\/\//);

    fs.unlinkSync(testFile);
  });
});
