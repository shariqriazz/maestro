#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const exists = util.promisify(fs.exists);

/**
 * Parses a system prompt file to extract the mode name and role definition
 * @param {string} content - The content of the system prompt file
 * @param {string} filename - The filename of the system prompt file
 * @returns {Object} An object containing the mode name, slug, and role
 */
function parseSystemPrompt(content, filename) {
  // Extract mode name from the filename (system-prompt-{mode}.md)
  const modeMatch = filename.match(/system-prompt-(.+)$/);
  if (!modeMatch) {
    throw new Error(`Invalid system prompt filename: ${filename}`);
  }
  const slug = modeMatch[1];
  
  // Extract the first paragraph after "# SYSTEM INSTRUCTIONS" as the role definition
  // This pattern matches the first paragraph starting with "You are" after the heading
  const roleMatch = content.match(/# SYSTEM INSTRUCTIONS\s+\n+You are ([^,\n]+)(?:,\s+|\s+)([^\n]+(?:\n(?!##|\n\n)[^\n]+)*)/);
  if (!roleMatch) {
    throw new Error('Could not find role definition in system prompt file');
  }
  
  const name = roleMatch[1].trim();
  const role = `You are ${name}, ${roleMatch[2].trim()}`;
  
  return {
    name,
    slug,
    role
  };
}

/**
 * Main function to generate the .roomodes configuration file
 */
async function generateModesConfig() {
  // Check for --global flag
  const isGlobal = process.argv.includes('--global');
  const outputFilename = isGlobal ? 'custom_modes.json' : '.roomodes';
  const sourceValue = isGlobal ? 'global' : 'project';

  try {
    // Check if .roo directory exists
    const rooExists = await exists('.roo');
    if (!rooExists) {
      console.log('.roo directory not found, creating it...');
      await mkdir('.roo', { recursive: true });
    }

    // Read all system prompt files from .roo directory
    const files = await readdir('.roo');
    const systemPromptFiles = files.filter(file => file.startsWith('system-prompt-'));
    
    console.log(`Found ${systemPromptFiles.length} system prompt files`);
    
    // Parse each system prompt file
    const modes = [];
    for (const file of systemPromptFiles) {
      console.log(`Processing ${file}...`);
      const content = await readFile(path.join('.roo', file), 'utf-8');
      try {
        const mode = parseSystemPrompt(content, file);
        
        // Add mode to the array with only role definition (no custom instructions)
        modes.push({
          slug: mode.slug,
          name: mode.name,
          roleDefinition: mode.role,
          groups: [
            "read",
            "edit",
            "browser",
            "command",
            "mcp"
          ],
          source: sourceValue // Use determined source value
        });
      } catch (error) {
        console.error(`Error parsing ${file}: ${error.message}`);
      }
    }
    
    // Sort modes alphabetically by name
    modes.sort((a, b) => a.name.localeCompare(b.name));
    
    // Format the modes into the .roomodes configuration
    const roomodesConfig = {
      customModes: modes
    };
    
    // Write the configuration to .roomodes file
    const configJson = JSON.stringify(roomodesConfig, null, 2);
    await writeFile(outputFilename, configJson); // Use determined filename
    
    console.log(`Successfully generated ${outputFilename} configuration with ${modes.length} modes`); // Update log message
  } catch (error) {
    console.error('Error generating modes configuration:', error);
    process.exit(1);
  }
}

// Run the script
generateModesConfig().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
