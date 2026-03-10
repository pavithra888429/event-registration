const scenarios = [
  "my email is jane at gmail dot com",
  "college mail id jane underscore doe at the rate outlook dot com",
  "email address is 21 cs 101 at college dot edu",
  "mail is john point smith at yahoo dot co dot in",
  "name is bob, email bob@gmail.com, phone 1234567890",
  "student name is alice, college mail alice-123 at university dot org"
];

const parseEmail = (text) => {
  console.log(`\nInput: "${text}"`);

  // Robust email pattern
  // Matches "email", "mail", "college mail", "email id", "mail id", "email address"
  // Captures everything until a keyword for another field or end of string
  const emailRegex = /(?:email|mail|college mail|email id|mail id|email address|mail address)(?:\s+is)?\s+([a-z0-9._%+-@\s]+?)(?=\s+(?:roll|department|year|phone|student name|name)|$|,|\.)/i;
  
  const emailMatch = text.match(emailRegex);
  
  if (emailMatch) {
    let email = emailMatch[1].trim().toLowerCase();
    console.log(`  Initial Capture: "${email}"`);
    
    // Comprehensive STT cleaning
    email = email
      .replace(/\s*at the rate\s*/g, '@')
      .replace(/\s*at\s*/g, '@')
      .replace(/\s*dot\s*/g, '.')
      .replace(/\s*point\s*/g, '.')
      .replace(/\s*underscore\s*/g, '_')
      .replace(/\s*dash\s*/g, '-')
      .replace(/\s*hyphen\s*/g, '-')
      .replace(/\s+/g, '');
    
    console.log(`  Cleaned: "${email}"`);
    return email;
  }
  
  console.log("  No match found.");
  return null;
};

console.log("--- Testing Voice Email Parsing ---");
scenarios.forEach(parseEmail);
