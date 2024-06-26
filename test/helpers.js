import * as parser from "../build/esm/index.js";
import expect from "expect.js";

const encoder = new parser.Encoder();

// tests encoding and decoding a single packet
const test = (obj) => {
  return new Promise((resolve) => {
    const encodedPackets = encoder.encode(obj);

    const decoder = new parser.Decoder();
    decoder.on("decoded", (packet) => {
      expect(packet).to.eql(obj);
      resolve();
    });

    decoder.add(encodedPackets[0]);
  });
};

// tests encoding of binary packets
const test_bin = (obj) => {
  return new Promise((resolve) => {
    const encodedPackets = encoder.encode(obj);

    const decoder = new parser.Decoder();
    decoder.on("decoded", (packet) => {
      expect(obj).to.eql(packet);
      resolve();
    });

    for (let i = 0; i < encodedPackets.length; i++) {
      decoder.add(encodedPackets[i]);
    }
  });
};

export { test, test_bin };
