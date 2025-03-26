import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ChatInput from './Components/ChatInput';
import ChatOutput from './Components/ChatOutput';
import resume from './Data/resumeData'

function App() {
  const [messages, setMessages] = useState([
   {sender:'bot',text:"hello this is vineeta"}
   
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    const userInput = input.toLowerCase().trim();
    let botResponse = 'Not sure what you mean! Try asking about my bio, work, or skills.';

    if (userInput.includes('bio') || userInput.includes('about')) {
      botResponse = resume.bio;
    } else if (userInput.includes('work') || userInput.includes('job')) {
      botResponse =
        'I’ve worked at\n' +
        Object.values(resume.jobs)
          .map((job) => ` ${job.role} at ${job.company} (${job.dates})`)
          .join('\n') +
        '\nAsk about a specific company for more!';
    } else if (Object.values(resume.jobs).some((job) => userInput.includes(job.company.toLowerCase()))) {
      const job = Object.values(resume.jobs).find((j) => userInput.includes(j.company.toLowerCase()));
      botResponse = `as ${job.company}, I was a ${job.role} (${job.dates}). ${job.details}`;
    } else if (userInput.includes('skill')) {
      botResponse = `My skills are: ${resume.skills.join(', ')}`;
    } else if (userInput.includes('exit') || userInput.includes('bye')) {
      botResponse = 'See ya!';
    }
    else if (userInput.includes('hobbies')){
      botResponse = `My hobbies are: ${resume.hobbies.join(', ')}`;
    }
    else if(userInput.includes('education')){
      botResponse = `My education is: ${resume.education.join(',')}`;
    }
    else if(userInput.includes('hi')) {
      botResponse = 'Hi! Nice to meet you!';
    }

    setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    setInput('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Wanna Know About me??
      </Typography>
      <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2, boxShadow: 3 }}>
        <ChatOutput messages={messages} />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </Box>
    </Container>
  );
}

export default App;