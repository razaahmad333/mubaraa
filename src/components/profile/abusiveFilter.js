export default function filterIt(username) {
  const filt = [
    "idiot", "whore",
  ];

  for (let word of filt) {
    if (username.includes(word)) {
      return true;
    }
  }
}
