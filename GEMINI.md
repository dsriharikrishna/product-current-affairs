# AI Ways of Working and Implementation Rules

These rules dictate the mandatory workflow the AI must follow when implementing features or fixing bugs in this project.

## WAYS OF WORKING (MANDATORY)

1. **Build First, Test Later:**
   - Implement the requested feature or fix first in a continuous flow.
   - After the feature is fully built and functioning, write the corresponding test files to ensure code quality and prevent regressions.

2. **Continuous Execution:**
   - Execute the implementation plan in logical chunks.
   - You do not need to pause and ask for confirmation after every minor file change, but you should still provide clear summaries of what was accomplished when you complete a logical milestone or finish the feature.

3. **Code Quality & Architecture:**
   - Prefer simple, readable, maintainable code over "clever" hacks.
   - Follow clean architecture and strict separation of concerns.

4. **Clarification over Assumption:**
   - If something in the specification or architecture is unclear, ask the user instead of assuming.

## OUTPUT FORMAT

When finishing a feature implementation, use the following format:

**Feature Completion Summary:**
[Briefly describe what was implemented]

**Tests Added:**
[List the test files that were added/updated to verify the feature]

**Suggested Commit Message:**
`type(scope): concise description of what was changed`
