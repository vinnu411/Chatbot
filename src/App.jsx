import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, TextField, Button, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import "./App.css";
import resume from './Data/resumeData';


function App() {
  // State and media queries
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Vineeta. Ask me about my skills, experience, or education!" }
  ]);
  const [input, setInput] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate shooting stars
  const shootingStars = Array.from({ length: isMobile ? 5 : 10 }).map((_, i) => (
    <div key={i} className="shooting-star" style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }} />
  ));

  // Handle user messages
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userInput = input.toLowerCase().trim();
    let response = generateResponse(userInput);
    
    setMessages(prev => [...prev, 
      { sender: 'user', text: input },
      { sender: 'bot', text: response }
    ]);
    setInput('');
  };

  // Generate bot responses
  const generateResponse = (input) => {
    if (input.includes('bio') || input.includes('about')) return resume.bio;
    if (input.includes('work') || input.includes('job') || input.includes('experience')) 
    return formatExperience();
    if (input.includes('skills') || input.includes('skill'))return formatskills();
    
    if (input.includes('hi') || input.includes('hello')) return 'Hello! What would you like to know?';
    if (input.includes('hobbies')) return `My hobbies: ${resume.hobbies.join(', ')}`;
    if (input.includes('education')) return `Education: ${resume.education.join(', ')}`;

    if (input.includes('contact')) return formatContact();
    if (input.includes('project'))return formatProjects();

   
    if (input.includes('bye')) return 'Bye have a nice day 👋';
    
    return "I can discuss my skills, experience, education, or hobbies. What would you like to know?";
  };

  // Format experience section
  const formatExperience = () => {
    return `My Professional Experience:\n${Object.values(resume.jobs)
      .map(job => `• ${job.role} @ ${job.company} (${job.dates})\n   ${job.description || ''}`)
      .join('\n')}`;
  };
  // Format projects section
  const formatProjects = () => {
   return `My Projects:\n${Object.values(resume.project)  
    .map(project => `• ${project.name} -> ${project.description}   `)
   
    .join('\n')}`;
  };
  const formatContact = () => {
    return `Connect with me:\n${Object.values(resume.contact)
      .map(contact => `📧 ${contact.email}\n 🔗${contact.linkedin}\n  💻${contact.github}  `)
     
      .join('\n')}`;

  }
  const formatskills = () => {
    return `My Skills:\n${Object.values(resume.skills)
      .map(skill => `🖥️ ${skill.front}\n  ⚙️${skill.back}\n 🗃️${skill.data}\n  🛠️${skill.tools}`)
      .join('\n')}`;
  }

  
  
  return (
    <div className="interactive-resume">
      {shootingStars}
      
      <Container 
        maxWidth="md" // Changed to md for smaller width
        ref={containerRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: isMobile ? 1 : 4,
          margin: '0 auto',
          position: 'relative',
          maxWidth: '500px',
          width: '70%',
          height: 'auto',
          minHeight: '100vh'
        }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" sx={{
            textAlign: 'center',
            color: '#4fc3f7',
            mb: 3,
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            fontWeight: 600,
            textShadow: '0 0 10px rgba(79, 195, 247, 0.7)'
          }}>
            Wanna Know about me?? 🙌
          </Typography>
        </motion.div>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #3ba5d8',
          borderRadius: '16px',
          p: 3,
          backgroundColor: 'rgba(16, 20, 30, 0.85)',
          boxShadow: '0 0 20px rgba(59, 165, 216, 0.3)',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto',
          height: 'auto',
          maxHeight: '80vh',
          minHeight: '200px'
        }}>
          {/* Messages container - now with dynamic height */}
          <Box sx={{
            flex: '1 1 auto',
            overflowY: 'auto',
            mb: 2,
            pr: 1,
            minHeight: '100px'
          }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  bgcolor: msg.sender === 'user' ? '#4fc3f7' : '#2d3748',
                  color: msg.sender === 'user' ? '#000' : '#fff',
                  p: 2,
                  borderRadius: '12px',
                  maxWidth: '90%',
                  mb: 2,
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  {msg.text}
                </Box>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input area - fixed at bottom */}
          <Box sx={{ 
            flex: '0 0 auto',
            display: 'flex', 
            gap: 1.5,
            pt: 2,
            borderTop: '1px solid rgba(79, 195, 247, 0.2)'
          }}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my skills, experience, or education..."
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
                minWidth: '100px',
                fontWeight: 600,
                '&:hover': { bgcolor: '#3ba5d8' }
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
