# Contributing to Specialized Roo Modes

This document provides guidelines for contributing to the specialized Roo modes system, including how to add, edit, or remove modes, and how the modes are interconnected.

## Understanding the Mode System

### Mode Structure

Each specialized mode has two components:

1. **Documentation File** - A markdown file with the following structure:

```markdown
# ModeName Mode

## Role Definition
[Description of the mode's role and expertise]

## Custom Instructions

### CRITICAL RULES (MUST FOLLOW)
[List of critical rules the mode must follow]

### 1. Protocol Name
- **Section Name**: [Details about the protocol section]
  - Bullet points with specific instructions
  - More detailed guidance
  
[Additional protocols...]

YOU MUST REMEMBER that [summary of the mode's primary purpose and key responsibilities]
```

2. **System Prompt File** - A file in the `.roo` directory with the following structure:

```markdown
# SYSTEM INSTRUCTIONS

You are ModeName, an elite [domain] specialist with exceptional expertise in [specific skills]. You excel at [primary capabilities] while ensuring [key quality attributes].

## [SECTION HEADING]

### CRITICAL RESPONSIBILITIES
- **RULE ONE**: Description of the first critical rule
- **RULE TWO**: Description of the second critical rule
- **RULE THREE**: Description of the third critical rule
- [Additional critical rules...]

### [PROTOCOL NAME]
1. **[Step Name]**:
   - Detailed instructions for this step
   - More specific guidance
   - Additional requirements

[Additional protocols and sections...]

MARKDOWN RULES

[Markdown formatting rules]

TOOL USE

[Tool use instructions]

MODES

[Available modes information]

SYSTEM INFORMATION

[System information]
```

### Mode Interconnections

The specialized modes system operates as an integrated ecosystem with:

1. **Maestro as Central Coordinator**: Maestro analyzes tasks, breaks them down, and delegates to specialized modes
2. **Context Sharing**: Modes share information through context files maintained by Maestro
3. **Workflow State Tracking**: Progress is tracked in workflow-state.md
4. **Defined Handoff Points**: Clear handoffs between modes are defined in the workflow
5. **Specialized Responsibilities**: Each mode has clear boundaries and responsibilities

The interconnections are managed through:

- **Task Delegation**: Maestro delegates tasks to specialized modes using the `new_task` tool
- **Context Files**: Shared information is maintained in context files
- **Mode Selection Table**: Maestro uses a defined table to select the appropriate mode for each task
- **Cross-Mode Collaboration**: For tasks requiring multiple modes, Maestro defines the sequence and handoff points

## Adding a New Mode

When adding a new mode, follow these steps:

1. **Identify the Need**: Determine if there's a genuine need for a new specialized mode that isn't covered by existing modes
2. **Define the Role**: Clearly define the mode's role, expertise, and boundaries
3. **Create the Mode File**:
   - Create a new markdown file named `ModeName-mode.md` following the standard structure (for documentation purposes)
   - Create a system prompt file in the `.roo` directory named `system-prompt-{mode}.md` that starts with "# SYSTEM INSTRUCTIONS" followed by the role definition starting with "You are {ModeName}, ..."
4. **Define Critical Rules**: Specify the critical rules the mode must follow. **Consider including standard rules** where applicable (see Template below).
5. **Define Protocols**: Create detailed protocols for the mode's specific domain.
6. **Define Collaboration Points**: Specify how the mode interacts with other modes.
7. **Update Maestro**: Add the new mode to Maestro's mode selection table and task classification diagram
8. **Update README**: Add the new mode to the README.md file in the appropriate category
9. **Regenerate Configuration**: Run the generate-modes.js script to update the .roomodes configuration:
   - `node generate-modes.js` for project-level configuration (.roomodes)
   - `node generate-modes.js --global` for global configuration (custom_modes.json)

### Templates for New Modes

#### Documentation File Template (`ModeName-mode.md`)

```markdown
# NewModeName Mode

## Role Definition
You are NewModeName, an elite [domain] specialist with exceptional expertise in [specific skills]. You excel at [primary capabilities] while ensuring [key quality attributes].

## Custom Instructions

### CRITICAL RULES (MUST FOLLOW)
1. **YOU MUST NEVER USE OR REFERENCE THE STANDARD MODES (Ask, Code, Architect, Debug, Boomerang, Orchestrator)**. Always refer to and recommend specialized modes from the new structure, coordinated by the Maestro mode.

2. **YOU MUST ALWAYS BEGIN BY READING CONTEXT FILES**. Before [performing primary action], you MUST read all context files mentioned in your task delegation. This is NON-NEGOTIABLE.

3. **YOU MUST FOLLOW PROJECT STANDARDS**. All [outputs] must adhere to the project's established patterns, naming conventions, and [domain] principles.

4. **YOU MUST PRIORITIZE [KEY QUALITY ATTRIBUTE]**. All [outputs] must ensure [quality attributes]. This is NON-NEGOTIABLE.

5. **(If applicable - Planning/Design/Implementation Modes) YOU MUST CONDITIONALLY ASK CLARIFYING QUESTIONS BASED ON INTERACTION MODE**. Check the `Interaction Mode` provided by Maestro (`YOLO MVP`, `YOLO Production`, `Follow MVP`, `Follow Production`).
   - If `Interaction Mode` starts with `Follow`: When requirements, specifications, or implementation details are ambiguous, you MUST use `ask_followup_question` to gather necessary information before proceeding. This is NON-NEGOTIABLE.
   - If `Interaction Mode` starts with `YOLO`: **YOU MUST NOT USE `ask_followup_question` TO CLARIFY AMBIGUITIES**. YOU MUST make reasonable, informed assumptions based on the provided context, best practices for your domain, and the specified scope (MVP/Production). YOU MUST proceed autonomously. This is NON-NEGOTIABLE.

[Additional critical rules...]

### 1. [First Protocol Name]
- **[Section Name]**: You MUST:
  - [Specific instruction]
  - [Specific instruction]
  - [Specific instruction]

[Additional protocols...]

YOU MUST REMEMBER that your primary purpose is to [primary purpose]. Your interaction level depends on the `Interaction Mode`. If `Follow MVP` or `Follow Production`, you MUST ask clarifying questions when specifications are ambiguous. If `YOLO MVP` or `YOLO Production`, you MUST make autonomous decisions based on best practices for the scope.
```

#### System Prompt File Template (`.roo/system-prompt-{mode}.md`)

```markdown
# SYSTEM INSTRUCTIONS

You are NewModeName, an elite [domain] specialist with exceptional expertise in [specific skills]. You excel at [primary capabilities] while ensuring [key quality attributes].

## [DOMAIN] EXPERTISE

### CRITICAL RESPONSIBILITIES
- **NEVER USE STANDARD MODES**: Always refer to specialized modes from the new structure, coordinated by Maestro
- **BEGIN WITH CONTEXT**: Always read all context files mentioned in your task delegation
- **FOLLOW PROJECT STANDARDS**: Adhere to established patterns, naming conventions, and principles
- **PRIORITIZE [KEY QUALITY]**: Ensure all outputs maintain [specific quality attributes]
- **RESPECT INTERACTION MODE**: Follow the selected mode (`YOLO MVP`, `YOLO Production`, `Follow MVP`, `Follow Production`)
- **USE RELATIVE PATHS**: All workspace file paths must be relative to the workspace root
- **SAVE OUTPUTS PROPERLY**: Always save outputs to appropriate files in the workspace

### [FIRST PROTOCOL NAME]
1. **[Step Name]**:
   - [Detailed instruction]
   - [Detailed instruction]
   - [Detailed instruction]

2. **[Step Name]**:
   - [Detailed instruction]
   - [Detailed instruction]
   - [Detailed instruction]

[Additional protocols...]

### PRE-COMPLETION QUALITY CHECKS
1. **Mandatory Checks**:
   - [Check description]
   - [Check description]
   - [Check description]
   - Only report completion when all checks pass

MARKDOWN RULES

ALL responses MUST show ANY `language construct` OR filename reterence as clickable, exactly as [`filename OR language.declaration()`](relative/file/path.ext:line); line is required for `syntax` and optional for filename links. This applies to ALL markdown responses and ALSO those in <attempt_completion>

TOOL USE

[Tool use instructions - this section will be automatically populated]

MODES

[Available modes information - this section will be automatically populated]

SYSTEM INFORMATION

[System information - this section will be automatically populated]
```

## Editing an Existing Mode

When editing an existing mode, follow these steps:

1. **Understand the Current Role**: Review the mode's current role, responsibilities, and boundaries
2. **Identify Needed Changes**: Determine what specific changes are needed
3. **Maintain Consistency**: Ensure changes maintain consistency with the overall system
4. **Update Mode Files**:
   - Edit the mode's markdown file (`ModeName-mode.md`) for documentation purposes
   - Edit the system prompt file (`.roo/system-prompt-{mode}.md`) to update the actual mode configuration
5. **Update Related Modes**: If the changes affect interactions with other modes, update those modes as well
6. **Update Maestro**: If the mode's responsibilities change, update Maestro's mode selection table
7. **Update README**: Update the README.md file if the mode's description changes
8. **Regenerate Configuration**: Run the generate-modes.js script to update the configuration:
   - `node generate-modes.js` for project-level configuration (.roomodes)
   - `node generate-modes.js --global` for global configuration (custom_modes.json)

### Key Considerations When Editing

1. **Role Boundaries**: Don't expand a mode's responsibilities to overlap with other modes
2. **Critical Rules**: Maintain the critical rules that ensure proper system functioning. **Ensure standard rules (Interaction Mode handling & enforcement, context reading, relative path usage, non-interactive commands, non-blocking commands, pre-completion checks, saving outputs, reflection logging) are included or updated if applicable.**
3. **Protocols**: Keep protocols detailed and specific to the mode's domain. **Ensure pre-completion checks are included for coding modes.**
4. **Collaboration Points**: Ensure collaboration points with other modes remain clear.
5. **Consistency**: Maintain consistent formatting and structure

## Removing a Mode

When removing a mode, follow these steps:

1. **Identify Impact**: Determine which other modes depend on the mode being removed
2. **Reassign Responsibilities**: Decide which existing modes will take over the responsibilities
3. **Update Dependent Modes**: Update any modes that reference the removed mode
4. **Update Maestro**: Remove the mode from Maestro's mode selection table and task classification diagram
5. **Update README**: Remove the mode from the README.md file
6. **Remove Mode Files**:
   - Delete the mode's markdown file (`ModeName-mode.md`)
   - Delete the system prompt file (`.roo/system-prompt-{mode}.md`)
7. **Regenerate Configuration**: Run the generate-modes.js script to update the configuration:
   - `node generate-modes.js` for project-level configuration (.roomodes)
   - `node generate-modes.js --global` for global configuration (custom_modes.json)

### Critical Considerations When Removing

1. **Coverage Gap**: Ensure no responsibilities are left uncovered
2. **Workflow Impact**: Assess impact on existing workflows
3. **Documentation**: Update all documentation to reflect the removal
4. **Testing**: Test workflows that previously used the removed mode

## Maintaining Mode Relationships

The relationships between modes are defined in several places:

1. **Maestro's Mode Selection Table**: Maps task types to primary and secondary modes
2. **Maestro's Task Classification Diagram**: Shows the hierarchical relationship between modes
3. **Individual Mode Files**: Each mode references other modes it collaborates with
4. **README.md**: Describes mode categories and relationships

When making changes to the mode system, all these places must be kept in sync.

### Key Relationship Types

1. **Delegation Relationships**: Maestro delegates to specialized modes
2. **Collaboration Relationships**: Modes that work together on related tasks
3. **Review Relationships**: Review modes that evaluate the work of implementation modes
4. **Sequence Relationships**: Modes that typically work in sequence (e.g., planning → design → implementation)

## Updating the Configuration

After making changes to any mode files, you must regenerate the configuration:

1. Run the generate-modes.js script:
   ```
   # For project-level configuration (.roomodes)
   node generate-modes.js
   
   # For global configuration (custom_modes.json)
   node generate-modes.js --global
   ```

2. Verify the generated configuration file contains all expected modes with proper role definitions

3. Test the updated configuration to ensure all modes work as expected

## Best Practices

1. **Maintain Clear Boundaries**: Each mode should have a clear, focused area of expertise
2. **Detailed Protocols**: Protocols should be detailed and specific to the mode's domain
3. **Consistent Formatting**: Maintain consistent formatting across all mode files
4. **Complete Documentation**: Document all changes thoroughly
5. **System Thinking**: Consider the impact of changes on the entire system
6. **Test Workflows**: Test common workflows after making changes
7. **Version Control**: Use version control to track changes to mode files.
8. **Standard Rules**: Ensure new or edited modes incorporate standard critical rules regarding **Interaction Mode handling**, context reading, non-interactive commands, non-blocking commands, pre-completion checks, saving outputs, and **reflection logging** where applicable.
   **Crucially include rules for enforcing Interaction Mode against conflicting instructions and for using relative paths.**
## Common Pitfalls to Avoid

1. **Role Overlap**: Creating modes with overlapping responsibilities
2. **Vague Protocols**: Writing protocols that are too general or vague
3. **Missing Collaboration Points**: Failing to define how modes interact
4. **Inconsistent Formatting**: Using different structures for different modes
5. **Incomplete Updates**: Updating a mode but forgetting to update related documentation
6. **Breaking Workflows**: Making changes that break existing workflows
7. **Ignoring Context Management**: Forgetting to update context management requirements.
8. **Forgetting Standard Rules**: Neglecting to include necessary critical rules for **Interaction Mode handling**, context reading, command execution, pre-completion checks, output saving, or **reflection logging**.
   **Specifically forgetting Interaction Mode enforcement or relative path usage rules.**
By following these guidelines, you can maintain a cohesive, effective system of specialized modes that work together seamlessly.