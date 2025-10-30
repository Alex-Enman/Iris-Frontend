# Agent Markdown Generation Guidelines

## Purpose
Defines how Cursor agents should create `.md` files for agent-to-agent communication.  
Outputs must be machine-readable, self-contained, deterministic, and ≤ 300 lines.

---

## Core Directives
1. **Audience:** Other LLMs or automated agents.  
2. **Tone:** Instructional and declarative — no conversational text.  
3. **Goal:** Ensure consistent, parseable Markdown for logic transfer and contextual use.  
4. **Limit:** Never exceed 300 lines.  
5. **Format:** GitHub-compatible Markdown only. No HTML, emojis, or commentary.  
6. **Consistency:** File structure and section order must remain identical across all `.md` files.  

---

## Required File Schema
Each agent Markdown file must follow this structure: