

import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({ input, setInput, handleSend }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type here..."
        size="small"
      />
      <Button
        variant="contained"
        onClick={handleSend}
        endIcon={<SendIcon />}
        sx={{ px: 3 }}
      >
        Send
      </Button>
    </Box>
  );
}

export default ChatInput;