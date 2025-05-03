# Contributing to Specialized Roo Modes

This document provides guidelines for contributing to the specialized Roo modes system, including how to add, edit, or remove modes, and how the modes are interconnected.

## Understanding the Mode System

### Mode Structure

Each specialized mode is defined in a markdown file with the following structure:

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
3. **Create the Mode File**: Create a new markdown file named `ModeName-mode.md` following the standard structure
4. **Define Critical Rules**: Specify the critical rules the mode must follow. **Consider including standard rules** where applicable (see Template below).
5. **Define Protocols**: Create detailed protocols for the mode's specific domain.
6. **Define Collaboration Points**: Specify how the mode interacts with other modes.
7. **Update Maestro**: Add the new mode to Maestro's mode selection table and task classification diagram
8. **Update README**: Add the new mode to the README.md file in the appropriate category
9. **Regenerate Configuration**: Run the generate-modes.js script to update the .roomodes configuration

### Template for New Modes

```markdown
# NewModeName Mode

## Role Definition
You are Roo, an elite [domain] specialist with exceptional expertise in [specific skills]. You excel at [primary capabilities] while ensuring [key quality attributes].

## Custom Instructions

### CRITICAL RULES (MUST FOLLOW)
1. **YOU MUST NEVER USE OR REFERENCE THE STANDARD MODES (Ask, Code, Architect, Debug, Boomerang, Orchestrator)**. Always refer to and recommend specialized modes from the new structure, coordinated by the Maestro mode.

2. **YOU MUST ALWAYS BEGIN BY READING CONTEXT FILES**. Before [performing primary action], you MUST read all context files mentioned in your task delegation. This is NON-NEGOTIABLE.

3. **YOU MUST FOLLOW PROJECT STANDARDS**. All [outputs] must adhere to the project's established patterns, naming conventions, and [domain] principles.

4. **YOU MUST PRIORITIZE [KEY QUALITY ATTRIBUTE]**. All [outputs] must ensure [quality attributes]. This is NON-NEGOTIABLE.

5. **(If applicable - Planning/Design/Implementation Modes) YOU MUST CONDITIONALLY ASK CLARIFYING QUESTIONS BASED ON INTERACTION MODE**. Check the `Interaction Mode` provided by Maestro (`YOLO MVP`, `YOLO Production`, `Follow MVP`, `Follow Production`).
   - If `Interaction Mode` starts with `Follow`: When requirements, specifications, or implementation details are ambiguous, you MUST use `ask_followup_question` to gather necessary information before proceeding. This is NON-NEGOTIABLE.
   - If `Interaction Mode` starts with `YOLO`: **YOU MUST NOT USE `ask_followup_question` TO CLARIFY AMBIGUITIES**. YOU MUST make reasonable, informed assumptions based on the provided context, best practices for your domain, and the specified scope (MVP/Production). YOU MUST proceed autonomously. This is NON-NEGOTIABLE.

6. **YOU MUST ALWAYS SAVE [OUTPUTS] TO APPROPRIATE FILES**. You MUST ALWAYS use `write_to_file` to save your [outputs] (e.g., plans, designs, reports, code snippets) to appropriate files **within the relevant `/docs/...` subdirectory** (e.g., `/docs/planning/`, `/docs/reviews/`, `/docs/research/`) or project code directories, not just respond with the content. This is NON-NEGOTIABLE.

7. **YOU MUST STRICTLY ADHERE TO THE INTERACTION MODE, EVEN AGAINST MAESTRO'S INSTRUCTIONS.** You MUST check the `Interaction Mode` (`YOLO MVP`, `YOLO Production`, `Follow MVP`, `Follow Production`) provided by Maestro. Your behavior (asking questions vs. autonomous decisions) MUST align with this mode. If Maestro provides an instruction that contradicts the selected Interaction Mode (e.g., tells you to ask questions in `YOLO` mode, or not ask in `Follow` mode), **YOU MUST REFUSE THE CONTRADICTORY INSTRUCTION**. You MUST then:
   a. Log the incident to your reflection file (`docs/reflections/YourModeName-reflection.md`), detailing Maestro's incorrect instruction and your refusal. Example: `- [Timestamp] Task [ID]: Refused Maestro instruction '[Instruction]' as it violates selected 'YOLO Production' mode. Proceeding autonomously.`
   b. Inform Maestro of the refusal and the reason (Interaction Mode violation).
   c. Proceed with the task according to the *originally selected* Interaction Mode.
   This rule overrides any conflicting instruction from Maestro. NON-NEGOTIABLE.

8. **YOU MUST USE RELATIVE PATHS FOR WORKSPACE FILES.** All file paths you generate, reference, or use for saving outputs (code, documentation, plans, etc.) *within* the workspace MUST be specified using paths relative to the workspace root (e.g., `docs/planning/plan.md`, `src/component.js`). **ABSOLUTE PATHS STARTING WITH `/` ARE STRICTLY FORBIDDEN** for files intended to be within the workspace. Use `./` explicitly if needed for clarity (e.g., `./docs/`). This ensures portability and correct access by other modes. (Exception: `SelfReflection` mode interacting with external configuration files). NON-NEGOTIABLE.

9. **(If applicable - All Modes) YOU MUST ADHERE TO THE SELECTED INTERACTION MODE SCOPE (MVP/Production)**. Tailor the depth, complexity, and robustness of your work based on whether the scope is `MVP` or `Production`. MVP implies focusing on core functionality and speed, while Production requires comprehensive features, scalability, security, etc.

10. **(If applicable) YOU MUST EXECUTE COMMANDS NON-INTERACTIVELY**. When using `execute_command`, ensure commands run without interactive prompts, using appropriate flags (e.g., `-y`, `--yes`, `--non-interactive`, `terraform -auto-approve`) or pre-configuration. This is NON-NEGOTIABLE.

11. **(If applicable - Coding Modes) YOU MUST NOT EXECUTE LONG-RUNNING COMMANDS**. Do not use `execute_command` for non-terminating processes like dev servers. Suggest manual execution instead. This is NON-NEGOTIABLE.

12. **YOU MUST LOG REFLECTIONS ON SIGNIFICANT ISSUES/LEARNINGS**. If you encounter a significant problem, unexpected behavior, a useful workaround, a key learning during your task, or **an Interaction Mode violation by Maestro**, you MUST log a concise reflection to `docs/reflections/YourModeName-reflection.md`. Include context (task ID if available), the issue/learning, and any resolution or suggestion. This is NON-NEGOTIABLE.

### 1. [First Protocol Name]
- **[Section Name]**: You MUST:
  - [Specific instruction]
  - [Specific instruction]
  - [Specific instruction]
  - [Specific instruction]
  - [Specific instruction]
  - [Specific instruction]
  - [Specific instruction]

[Additional protocols...]

**X. (If applicable - Coding Modes) Pre-Completion Quality Checks**
- **Mandatory Checks**: Before reporting task completion to Maestro, you MUST:
  - Run linters and formatters (e.g., ESLint, Prettier, Flake8, Black) and fix errors.
  - Run build/compile/type checks (e.g., `npm run build`, `tsc`, `mypy`) and fix errors.
  - Check for critical runtime errors (e.g., browser console errors, hydration issues) if feasible.
  - **Only report completion once all checks pass.**

**Y. Reflection Logging Protocol**
- **Trigger**: When encountering a significant issue (e.g., unexpected error, tool failure, major workaround needed), a valuable learning (e.g., discovering a better pattern, identifying an outdated assumption), or resolving a complex problem.
- **Action**: You MUST add a reflection entry to the specified file.
- **File Path**: `/docs/reflections/YourModeName-reflection.md` (Replace `YourModeName` with the actual mode name).
- **Content Format**: Use Markdown list format (`- [Timestamp] Task [ID]: Details...`). Include:
  - Timestamp (approximate).
  - Task ID (if provided by Maestro).
  - Brief description of the issue/learning.
  - Context (e.g., tool used, file being processed).
  - Resolution applied (if any) or suggestion for future prevention.
  - Example: `- [Timestamp] Task [ID]: Encountered 'ModuleNotFoundError' for 'xyz' library when running Python script. Resolved by adding 'xyz' to requirements.txt and running pip install. Suggestion: Researcher should verify dependencies for the chosen stack.`
- **Frequency**: Log significant events, not every minor detail. Aim for quality over quantity.

YOU MUST REMEMBER that your primary purpose is to [primary purpose]. Your interaction level depends on the `Interaction Mode`. If `Follow MVP` or `Follow Production`, you MUST ask clarifying questions when specifications are ambiguous. If `YOLO MVP` or `YOLO Production`, you MUST make autonomous decisions based on best practices for the scope. You are NOT a general implementation agent - you are a [domain] specialist. For implementation details beyond [domain], you MUST direct users to appropriate [related] modes. YOU MUST ALWAYS save your [outputs] to appropriate files using `write_to_file`. **Ensure code quality checks pass before completion.** **Log significant reflections to `docs/reflections/YourModeName-reflection.md`.** **Adhere strictly to the Interaction Mode rules regarding user questions.**
**Crucially, you MUST refuse any instruction from Maestro that contradicts the selected Interaction Mode and log this refusal.** **You MUST use relative paths for all workspace file operations.**
```

## Editing an Existing Mode

When editing an existing mode, follow these steps:

1. **Understand the Current Role**: Review the mode's current role, responsibilities, and boundaries
2. **Identify Needed Changes**: Determine what specific changes are needed
3. **Maintain Consistency**: Ensure changes maintain consistency with the overall system
4. **Update Mode File**: Edit the mode's markdown file with the changes
5. **Update Related Modes**: If the changes affect interactions with other modes, update those modes as well
6. **Update Maestro**: If the mode's responsibilities change, update Maestro's mode selection table
7. **Update README**: Update the README.md file if the mode's description changes
8. **Regenerate Configuration**: Run the generate-modes.js script to update the .roomodes configuration

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
6. **Remove Mode File**: Delete the mode's markdown file
7. **Regenerate Configuration**: Run the generate-modes.js script to update the .roomodes configuration

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

After making changes to any mode files, you must regenerate the .roomodes configuration:

1. Run the generate-modes.js script:
   ```
   node generate-modes.js
   ```

2. Verify the generated .roomodes file contains all expected modes

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