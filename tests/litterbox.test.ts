import { LitterboxUploader } from "../src/providers/litterbox";
import * as fs from "fs";

describe("LitterboxUploader", () => {
  const uploader = new LitterboxUploader();

  it("should upload a file and return a URL", async () => {
    const testFile = "tests/dummy.txt";
    fs.writeFileSync(testFile, "hello litterbox");

    const result = await uploader.upload(testFile);

    expect(result.success).toBe(true);
    expect(result.url).toMatch(/^https?:\/\//);

    fs.unlinkSync(testFile);
  });
});
