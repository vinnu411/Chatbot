import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Vineeta. Ask me about my skills, experience, or education!" }
  ]);
  const [input, setInput] = useState('');

  // Generate multiple shooting stars
  const shootingStars = Array.from({ length: 3 }).map((_, index) => (
    <div 
      key={index}
      className="shooting-star" 
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${5 + Math.random() * 10}s`
      }} 
    />
  ));

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    const userInput = input.toLowerCase().trim();
    let botResponse = 'I\'m not sure what you mean. Try asking about my bio, work experience, or skills!';

    if (userInput.includes('bio') || userInput.includes('about')) {
      botResponse = resume.bio;
    } else if (userInput.includes('work') || userInput.includes('job') || userInput.includes('experience')) {
      botResponse = 'My work experience includes:\n' +
        Object.values(resume.jobs)
          .map((job) => ` • ${job.role} at ${job.company} (${job.dates})`)
          .join('\n');
    } else if (userInput.includes('skill')) {
      botResponse = `My technical skills include: ${resume.skills.join(', ')}`;
    } else if (userInput.includes('hi') || userInput.includes('hello')) {
      botResponse = 'Hi there! What would you like to know about me?';
    }

    setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    setInput('');
  };

  return (
    <div className="galaxy-background">
      {/* Shooting stars background elements */}
      {shootingStars}
      
      <Container maxWidth="md" sx={{ 
        py: 4, 
        position: 'relative', 
        zIndex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#4fc3f7',
            textShadow: '0 0 8px rgba(79, 195, 247, 0.7)',
            mb: 4
          }}
        >
          👋 Welcome to My Interactive Resume
        </Typography>
        
        <motion.div 
          className="chat-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(16, 20, 30, 0.8)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? '#4fc3f7' : '#2d3748',
                  color: message.sender === 'user' ? '#000' : '#fff',
                  padding: '12px 16px',
                  borderRadius: message.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  maxWidth: '70%',
                  marginBottom: '12px',
                  whiteSpace: 'pre-line'
                }}
              >
                {message.text}
              </motion.div>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask about my skills, experience..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#4fc3f7' },
                  '&:hover fieldset': { borderColor: '#4fc3f7' }
                }
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleSend}
              sx={{
                bgcolor: '#4fc3f7',
                color: '#000',
                '&:hover': { bgcolor: '#3ba5d8' }
              }}
            >
              Send
            </Button>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
}

export default App;