const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// 1. Remove state variables
content = content.replace(/const \[processStyle, setProcessStyle\] = useState\(1\);\r?\n/, '');
content = content.replace(/const \[activeRadialIndex, setActiveRadialIndex\] = useState\(0\);\r?\n/, '');
content = content.replace(/const \[activeBlueprintIndex, setActiveBlueprintIndex\] = useState\(0\);\r?\n/, '');
content = content.replace(/const \[activeStepIndex, setActiveStepIndex\] = useState\(0\);\r?\n/, '');

// 2. Remove the style toggler UI
// It starts with <div className="flex md:inline-flex overflow-x-auto ...
// and ends right before <AnimatePresence mode="wait">
let togglerRegex = /<div className="flex md:inline-flex overflow-x-auto[\s\S]*?<\/div>\s*<\/div>\s*<AnimatePresence mode="wait">/;
content = content.replace(togglerRegex, '');

// 3. Remove Style 1
// It starts with {processStyle === 1 && ( and ends with a corresponding )} before {processStyle === 2
let style1Regex = /\{processStyle === 1 && \([\s\S]*?\}\)\s*\{processStyle === 2 && \(/;
content = content.replace(style1Regex, '');

// 4. Extract Style 2 content
// Style 2 starts with <motion.div key="style2"... and ends right before {processStyle === 3
let style2Regex = /<motion\.div\s*key="style2"[\s\S]*?\{processStyle === 3 && \(/;
let style2Match = content.match(style2Regex);

if (style2Match) {
  let style2Str = style2Match[0];
  // Remove the wrapper motion div for style2
  // It has: <motion.div key="style2" ... > ... </motion.div> )} {processStyle === 3
  
  // A safer way is to just replace the whole AnimatePresence block with JUST the inner content of Style 2.
}

// Let's do a more robust approach:
let newContent = content;

// Replace the start of the style block (where processStyle === 2)
let process2Regex = /\{processStyle === 2 && \(\s*<motion\.div\s*key="style2"[\s\S]*?transition={{ duration: 0\.4 }}\s*>/;
newContent = newContent.replace(process2Regex, '<div className="process-timeline-wrapper">');

// Now we need to remove everything after Style 2 ends.
// Style 2 ends with:
//               </motion.div>
//             )}
//
//             {processStyle === 3 && (
// And AnimatePresence ends with </AnimatePresence>
// Let's find:
let endStyle2Regex = /<\/motion\.div>\s*\)\}\s*\{processStyle === 3 && \([\s\S]*?<\/AnimatePresence>/;
newContent = newContent.replace(endStyle2Regex, '</div>');

fs.writeFileSync('src/pages/Home.jsx', newContent);
console.log("Cleanup complete");
