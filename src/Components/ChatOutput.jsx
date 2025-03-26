// src/components/ChatOutput.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

function ChatOutput({ messages }) {
  return (
    <Paper elevation={3} sx={{ height: '400px', overflowY: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            mb: 1,
            textAlign: msg.sender ==='user' ? 'right' : 'left',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: msg.sender === 'bot' ? '#2c3e50' : '#1976d2',
              display: 'inline-block',
              bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#eceff1',
              p: 1,
              borderRadius: 2,
            }}
          >
            {msg.sender === 'bot' ? 'Bot: ' : 'You: '} {msg.text}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}

export default ChatOutput;