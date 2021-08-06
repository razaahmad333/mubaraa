export default function filterIt(username) {
  const filt = [
    "bsdk",
    "madarchod",
    "chutiya",
    "mc",
    "bc",
    "lund",
    "chut",
    "randi",
    "chhakka",
    "gay",
    "mdchoder",
    "harami",
    "bhenchod",
    "benchod",
  ];

  for (let word of filt) {
    if (username.includes(word)) {
      return true;
    }
  }
}
