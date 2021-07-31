/******************************************************************************************************
 The following code is a 2-step semi-manual process that extracts information from the unicode.org website
 and returns an oject of categorized emojis and relating information. Code is broken up into two distinct 
 sections that are to be pasted and run in the Chrome WebDev console while visting the labeled URLs.
*******************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// START CODE utilized in console at: https://unicode.org/emoji/charts/full-emoji-modifiers.html   v13.1 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// Array of <td class="code" elements 
const toneTdCodes = Array.prototype.slice.call(document.getElementsByClassName('code'));

function buildToneArray (codes) {
  const toneArrayLength = codes.length;
  let toneArray = [];

  for (let i=0; i < toneArrayLength; i++) {
    // Get just the first code in the string, with the "U+" prefix removed
    let baseCode = codes[i].firstChild.textContent.split(" ").slice(0, 1)[0].split("+").slice(1)[0];
    if (!toneArray.includes(baseCode)) {
      toneArray.push(baseCode);
    }
  }

  return toneArray;
}

const toneArray = buildToneArray(toneTdCodes);

// Once toneArray has been logged to the Chrome WebDev Console,
// right-click on the array object and click "Copy-Object"
console.log(toneArray);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END CODE utilized in console at: https://unicode.org/emoji/charts/full-emoji-modifiers.html           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////// 

/* ***************************************************************************************************** */

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// START CODE utilized in console at: https://unicode.org/emoji/charts/full-emoji-list.html              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// Paste the object you just copied from the Chrome WebDev Console 
// in the previous section as the value for finaleToneArray
// ** This is has already been done here, but could be outdated now so it's best to redo it yourself ** // 
const finalToneArray = [
  "1F44B",
  "1F91A",
  "1F590",
  "270B",
  "1F596",
  "1F44C",
  "1F90C",
  "1F90F",
  "270C",
  "1F91E",
  "1F91F",
  "1F918",
  "1F919",
  "1F448",
  "1F449",
  "1F446",
  "1F595",
  "1F447",
  "261D",
  "1F44D",
  "1F44E",
  "270A",
  "1F44A",
  "1F91B",
  "1F91C",
  "1F44F",
  "1F64C",
  "1F450",
  "1F932",
  "1F64F",
  "270D",
  "1F485",
  "1F933",
  "1F4AA",
  "1F9B5",
  "1F9B6",
  "1F442",
  "1F9BB",
  "1F443",
  "1F476",
  "1F9D2",
  "1F466",
  "1F467",
  "1F9D1",
  "1F471",
  "1F468",
  "1F9D4",
  "1F469",
  "1F9D3",
  "1F474",
  "1F475",
  "1F64D",
  "1F64E",
  "1F645",
  "1F646",
  "1F481",
  "1F64B",
  "1F9CF",
  "1F647",
  "1F926",
  "1F937",
  "1F46E",
  "1F575",
  "1F482",
  "1F977",
  "1F477",
  "1F934",
  "1F478",
  "1F473",
  "1F472",
  "1F9D5",
  "1F935",
  "1F470",
  "1F930",
  "1F931",
  "1F47C",
  "1F385",
  "1F936",
  "1F9B8",
  "1F9B9",
  "1F9D9",
  "1F9DA",
  "1F9DB",
  "1F9DC",
  "1F9DD",
  "1F486",
  "1F487",
  "1F6B6",
  "1F9CD",
  "1F9CE",
  "1F3C3",
  "1F483",
  "1F57A",
  "1F574",
  "1F9D6",
  "1F9D7",
  "1F3C7",
  "1F3C2",
  "1F3CC",
  "1F3C4",
  "1F6A3",
  "1F3CA",
  "26F9",
  "1F3CB",
  "1F6B4",
  "1F6B5",
  "1F938",
  "1F93D",
  "1F93E",
  "1F939",
  "1F9D8",
  "1F6C0",
  "1F6CC",
  "1F46D",
  "1F46B",
  "1F46C",
  "1F48F",
  "1F491",
  "1F3FB",
  "1F3FC",
  "1F3FD",
  "1F3FE",
  "1F3FF"
]

const categories = [
  {
    "name" : "Faces",
    "start" : 0,
    "end" : 119,
  },
  {
    "name" : "Emotions",
    "start" : 119,
    "end" : 156,
  },
  {
    "name" : "Body Parts",
    "start" : 156,
    "end" : 207,
  },
  {
    "name" : "People",
    "start" : 207,
    "end" : 462,
  },
  {
    "name" : "Animals & Nature",
    "start" : 509,
    "end" : 649,
  },
  {
    "name" : "Food & Drink",
    "start" : 650,
    "end" : 778,
  },
  {
    "name" : "Transportation",
    "start" : 843,
    "end" : 913,
  },
];

// Array of emojis that have been flagged due to poor browser support
// Elements correlate to the № table column which means that incrementing
// the value by 1 will be necessary when checking against tdCodes array
const flaggedEmojis = [
  '22', '64', '163', '200', '201', '323', '504', '534', '551',
  '561', '587', '588', '604', '616', '619', '624', '625', '638',
  '664', '667', '675', '687', '704', '711', '757', '769', '799',
  '800', '801', '869', '882',
];

// Array of <td class="code"> elements
const tdCodes = Array.prototype.slice.call(document.getElementsByClassName('code'));

// Array of <td class="chars"> elements
const tdChars = Array.prototype.slice.call(document.getElementsByClassName('chars'));

// Array of <td class="name"> elements
const tdNames = Array.prototype.slice.call(document.getElementsByClassName('name'));

// Array of <td class="rchars"> elements (this TD displays the emoji number count)
const tdCharNumber = Array.prototype.slice.call(document.getElementsByClassName('rchars'));

// Takes the string of potentially mulitple unicode codes and returns an array
// of unicodes with the "U+" prefix removed from each
function returnBaseCodeArray (codeList) {
  const codeArray = codeList.split(' ');
  let baseCodeArray = [];

  for (let i=0; i < codeArray.length; i++) {
    baseCodeArray.push(codeArray[i].split("+").slice(1)[0]);
  }

  return baseCodeArray;
}

// Returns array of objects with individual emoji properties
function buildBaseArray (codes, chars, names, flags, charNumber) {
  const baseArrayLength = codes.length;
  let baseArray = [];
  
  for (let i=0; i < baseArrayLength; i++) {
    let baseCodeArray = returnBaseCodeArray(codes[i].firstChild.textContent);
      baseArray.push(
        {
          "emoji": chars[i].firstChild.textContent,
          "code": baseCodeArray,
          "toned": (finalToneArray.includes(baseCodeArray[0])),
          "name": names[i].firstChild.textContent,
          "flagged": flags.includes((i + 1).toString()),
        }
      );
  }

  return baseArray;
}

const baseEmojiArray = buildBaseArray(tdCodes, tdChars, tdNames, flaggedEmojis, tdCharNumber);

// Organizes array of emoji objects into groups of categories
function buildEmojiListObject (emojiArray, categories) {
  const finalObject = {};

  for (let i=0; i < categories.length; i++) {
    let category = categories[i];
    finalObject[category.name] = [];

    for (let j=category.start; j < category.end; j++) {
      if(!emojiArray[j].flagged) {
        finalObject[category.name].push(emojiArray[j]);
      }
    }
  }
  return finalObject;
}

const emojiListObject = buildEmojiListObject(baseEmojiArray, categories);

// Once emojiListObject has been logged to the Chrome WebDev Console,
// right-click on the array object and click "Copy-Object". Then it may
// be pasted and used in any manner you wish.
console.log(emojiListObject);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END CODE utilized in console at: https://unicode.org/emoji/charts/full-emoji-list.html          v13.1 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////// 