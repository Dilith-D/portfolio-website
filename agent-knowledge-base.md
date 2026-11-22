# Agent Knowledge Base, moved

The voice agent files live in **`VAPI/`** (gitignored, backed up to private-portfolio by the pre-push hook):

- `VAPI/watson KB.txt`: the knowledge base. Facts only, no behaviour rules.
- `VAPI/vapi prompt.txt`: the system prompt. All behaviour rules live here.

Do not recreate a second copy anywhere else.

**To deploy a change:** editing these files does NOT update the live agent. Paste the
prompt into the Vapi assistant and re-upload the KB file in the Vapi dashboard.
