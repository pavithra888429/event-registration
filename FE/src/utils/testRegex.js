const text = "my name is pavitra. roll number is 22 bca 00455.";

console.log("Start");

const nameMatchOriginal = text.match(/(?:my name is|student name is|student name|name is|hello this side|this side|name)\s+([^,0-9]+?)(?=\s+(?:roll|department|year|email|college mail|phone)|$|,|\.)/i);
console.log("Name Orig:", nameMatchOriginal ? nameMatchOriginal[1] : null);

const rollMatchOriginal = text.match(/roll(?:\s+number)?(?:\s+is)?(?:\s+#)?\s*([a-z0-9\s,]+?)(?=\s+(?:department|year|email|college mail|phone|$|\.))/i);
console.log("Roll Orig:", rollMatchOriginal ? rollMatchOriginal[1] : null);
