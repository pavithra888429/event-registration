/**
 * Parses a voice transcript into registration form fields.
 * Example input: "My name is John Doe, roll number 101, department CSE, year 3, email john@college.edu, phone 9876543210"
 */
export const parseVoiceInput = (transcript) => {
  const text = transcript.toLowerCase();
  console.log('🎤 RAW VOICE HEARD BY BROWSER:', text);

  const formData = {};

  // Extract Name
  // supports: "my name is X", "name is X", "student name is X", "hello this side X", "name X"
  const nameMatch = text.match(/(?:my name is|student name is|student name|name is|hello this side|this side|name)\s+([^,0-9]+?)(?=\s+(?:roll|department|year|email|college mail|phone)|$|,|\.)/i);
  if (nameMatch && nameMatch[1]) {
    formData.studentName = nameMatch[1].trim().replace(/\b\w/g, c => c.toUpperCase());
  }

  // Extract Roll Number
  // supports: "roll number 101", "roll #22", "roll 22", "roll #22, bga 0045"
  const rollMatch = text.match(/roll(?:\s+number)?(?:\s+is)?(?:\s+#)?\s*([a-z0-9\s,]+?)(?=\s+(?:department|year|email|college mail|phone)|$|,|\.)/i);
  if (rollMatch && rollMatch[1]) {
    formData.rollNumber = rollMatch[1].replace(/[\s,]/g, '').toUpperCase();
  }

  // Extract Department
  // supports: "department CSE", "department is IT", "department bca"
  const deptMatch = text.match(/department(?:\s+is)?\s+([a-z\s]+?)(?=\s+(?:year|email|college mail|phone)|$|,|\.)/i);
  if (deptMatch) {
    let dept = deptMatch[1].trim().toUpperCase();
    if (dept === 'C S E' || dept === 'COMPUTER SCIENCE') dept = 'CSE';
    if (dept === 'I T' || dept === 'INFORMATION TECHNOLOGY') dept = 'IT';
    if (dept === 'E C E' || dept === 'ELECTRONICS') dept = 'ECE';
    if (dept === 'E E E' || dept === 'ELECTRICAL') dept = 'EEE';
    if (dept === 'MECH' || dept === 'MECHANICAL') dept = 'MECH';
    if (dept === 'CIVIL') dept = 'CIVIL';
    if (dept === 'B C A') dept = 'BCA';
    formData.department = dept;
  }

  // Extract Year
  // supports: "year 3", "year is 2", "year of study 1", "first year", "1st year"
  const yearMatch = text.match(/(?:year(?:\s+of\s+study)?(?:\s+is)?\s+([1-4])|(first|second|third|fourth|1st|2nd|3rd|4th)\s+year)/i);
  if (yearMatch) {
    if (yearMatch[1]) formData.year = yearMatch[1];
    else if (yearMatch[2]) {
      const spelled = yearMatch[2].toLowerCase();
      if (['first', '1st'].includes(spelled)) formData.year = '1';
      if (['second', '2nd'].includes(spelled)) formData.year = '2';
      if (['third', '3rd'].includes(spelled)) formData.year = '3';
      if (['fourth', '4th'].includes(spelled)) formData.year = '4';
    }
  }

  // Extract Email
  // supports: "email is x@y.com", "college mail id x at y dot com"
  const emailMatch = text.match(/(?:email|mail|college mail(?: id)?)(?:\s+is)?\s+([a-z0-9._%+-]+(?:\s*at\s*|@)[a-z0-9.-]+(?:\s*dot\s*|\.)[a-z]{2,})/i);
  if (emailMatch) {
    formData.email = emailMatch[1]
      .replace(/\s*at\s*/g, '@')
      .replace(/\s*dot\s*/g, '.')
      .replace(/\s+/g, '');
  }

  // Extract Phone
  // supports: "phone number 9876543210"
  const phoneMatch = text.match(/phone(?:\s+number)?(?:\s+is)?\s*([0-9\s]{10,12})/i);
  if (phoneMatch) {
    formData.phone = phoneMatch[1].replace(/\s+/g, '');
  }

  return formData;
};
