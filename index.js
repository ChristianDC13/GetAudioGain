const fs = require("fs");
const { getAudioDurationInSeconds } = require("get-audio-duration");

function getAudioGain(filePath, lapse = 250, threshold = 110) {
  return new Promise(async (resolve, reject) => {
    try {
      const readStram = fs.createReadStream(filePath, {
        highWaterMark: 1 * 16,
      });
      const vocalMap = [];
      let audioDurationMilliseconds =
        (await getAudioDurationInSeconds(filePath)) * (1000 / lapse);
      const chunks = [];
      readStram.on("data", (chunk) =>
        chunks.push(chunk.toJSON().data.reduce((a, b) => a + b) / 16)
      );

      readStram.on("end", () => {
        const unitsPerSegment = Math.round(
          chunks.length / audioDurationMilliseconds
        );
        for (let i = 0; i < chunks.length; i += unitsPerSegment) {
          const subChunks = chunks.slice(i, i + unitsPerSegment);
          const avrg = subChunks.reduce((a, b) => a + b) / subChunks.length;
          vocalMap.push({
            segment: i / unitsPerSegment,
            gainAvg: avrg,
            silence: avrg < threshold,
          });
        }
        resolve(vocalMap);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

module.exports = getAudioGain;
