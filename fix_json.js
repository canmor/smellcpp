const fs = require('fs');
const path = require('path');

const quizDir = path.join(process.cwd(), 'data', 'quiz');
const files = fs.readdirSync(quizDir).filter(file => file.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(quizDir, file);
  console.log(`Processing ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove comments
  const cleanedContent = content
    .replace(/\/\/.*$/gm, '') // Remove single line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
    
  try {
    // Test if valid JSON
    JSON.parse(cleanedContent);
    
    // Write cleaned content
    fs.writeFileSync(filePath, cleanedContent);
    console.log(`✅ Fixed ${file}`);
  } catch (err) {
    console.error(`❌ Error in ${file}: ${err.message}`);
    console.error(cleanedContent);
  }
});

console.log('Done processing all files.');
