# GetAudioGain

GetAudioGain is a tool that will help you obtain the gain values ​​of an audio file, separating it into segments based on a specified time lapse, as well as knowing which parts of the audio can be considered silence.

### Instalation

You can install this tool in your projects this way

```bash
npm install audio-gain
```

OR

```bash
yarn add audio-gain
```

### Usage

To use this tool, first of all, we need to import it into our project

```js
const getAudioGain = require("get-audio-gain");
```

Now we will be able to use the function

You must pass as a parameter the path of your audio file

Example:

```js
getAudioGain("audio-example.wav").then(console.log).catch(console.error);
```

You will get a result like this:

```json
[
    {
        "segment":0,
        "gainAvg":99.21582456458636,
        "silence":false
    },
    {
        "segment":1,
        "gainAvg":124.71142507256894,
        "silence":false
    },
    {
        "segment":2,
        "gainAvg":65.4035286647315,
        "silence":true
    },
    {
        "segment":3,
        "gainAvg":117.08377177068215,
        "silence":false
    }
    ...
```

### Response description

#### segment:

Single segment of the current reading, determined by the **lapse** parameter.
For example, if the specified time is _250 milliseconds_, segment 0 represents reading from 0 to 250 milliseconds, and segment 1 from 250 to 500, etc.

#### gainAvg

Represent the gain average for each segment

#### silence

Define if the segment can be considered silence, according to the parameter **threshold**
If the specified threshold is _74_ and **average gain** is less than 74, **silence** will be _true_

### Parameters definition

| Parameter | Description                                                   | Type   | Optional | Default |
| --------- | ------------------------------------------------------------- | ------ | -------- | ------- |
| filePath  | Audio file path                                               | string | false    | N/A     |
| lapse     | Time lapse for each segment **in milliseconds**               | number | true     | 250     |
| threshold | threshold to define what is a silence or a considerable sound | number | true     | 110     |

#### Usage example with optional parameters

```js
getAudioGain("audio-file.wav", 200, 80);
```

## Contributors

[Christian De La Cruz](https://github.com/ChristianDC13)
