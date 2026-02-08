/**
 * Shared Claude API client for React components.
 *
 * Used by Consciousness Decoder and Origin Oracle to avoid
 * duplicating the same fetch-and-parse logic.
 */

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-20250514";

/**
 * Call the Claude API with a system prompt and user message.
 *
 * @param {string} systemPrompt - The system prompt for Claude
 * @param {string} userMessage - The user's message
 * @param {Object} [options] - Optional configuration
 * @param {number} [options.maxTokens=2000] - Maximum tokens in response
 * @param {Array} [options.history=[]] - Prior conversation messages
 * @returns {Promise<string>} The text content of Claude's response
 */
export async function callClaude(systemPrompt, userMessage, { maxTokens = 2000, history = [] } = {}) {
  const messages = [
    ...history,
    { role: 'user', content: userMessage }
  ];

  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages,
    })
  });

  const data = await response.json();
  return data.content.find(block => block.type === "text")?.text || "";
}
