'use server';

/**
 * @fileOverview Summarizes client message threads using AI.
 *
 * - summarizeClientMessages - A function that takes client messages and returns a summary.
 * - SummarizeClientMessagesInput - The input type for the summarizeClientMessages function.
 * - SummarizeClientMessagesOutput - The return type for the summarizeClientMessages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeClientMessagesInputSchema = z.object({
  messages: z.string().describe('The full transcript of messages to summarize.'),
});
export type SummarizeClientMessagesInput = z.infer<
  typeof SummarizeClientMessagesInputSchema
>;

const SummarizeClientMessagesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the client messages.'),
});
export type SummarizeClientMessagesOutput = z.infer<
  typeof SummarizeClientMessagesOutputSchema
>;

export async function summarizeClientMessages(
  input: SummarizeClientMessagesInput
): Promise<SummarizeClientMessagesOutput> {
  return summarizeClientMessagesFlow(input);
}

const summarizeClientMessagesPrompt = ai.definePrompt({
  name: 'summarizeClientMessagesPrompt',
  input: {schema: SummarizeClientMessagesInputSchema},
  output: {schema: SummarizeClientMessagesOutputSchema},
  prompt: `Summarize the following client messages. Be concise.

Messages: {{{messages}}}`,
});

const summarizeClientMessagesFlow = ai.defineFlow(
  {
    name: 'summarizeClientMessagesFlow',
    inputSchema: SummarizeClientMessagesInputSchema,
    outputSchema: SummarizeClientMessagesOutputSchema,
  },
  async input => {
    const {output} = await summarizeClientMessagesPrompt(input);
    return output!;
  }
);
