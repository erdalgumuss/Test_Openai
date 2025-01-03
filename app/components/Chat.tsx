'use client';

import React, { useState } from 'react';

interface Message {
  sender: 'User' | 'AI';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Kullanıcı mesajını ekliyoruz
    const newUserMessage: Message = { sender: 'User', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Tüm önceki mesajları (User / AI) + yeni kullanıcı mesajını API'ye gönderiyoruz
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            role: msg.sender === 'User' ? 'user' : 'assistant',
            content: msg.content,
          })).concat({
            role: 'user',
            content: input,
          }),
        }),
      });

      const data = await response.json();
      const aiText = data.reply;

      // AI mesajını karakter karakter yazdırma
      typeAIMessage(aiText);
    } catch (error) {
      console.error('Hata:', error);
      // İsterseniz hata mesajını da chat'e ekleyebilirsiniz
    } finally {
      setIsTyping(false);
    }
  };

  // AI mesajını "typing effect" ile ekleyen fonksiyon
  const typeAIMessage = (fullText: string) => {
    let index = -1;
    // Öncelikle boş içerikli bir AI mesajı ekliyoruz
    setMessages((prev) => [...prev, { sender: 'AI', content: '' }]);

    const typingInterval = setInterval(() => {
      setMessages((prev) => {
        // Son eklenen mesaj (AI)
        const lastMessage = prev[prev.length - 1];
        // Karakter karakter ekleyerek güncelliyoruz
        const updatedMessage = {
          ...lastMessage,
          content: lastMessage.content + fullText.charAt(index),
        };
        return [...prev.slice(0, -1), updatedMessage];
      });

      index++;
      if (index >= fullText.length) {
        clearInterval(typingInterval);
      }
    }, 5); // Burada hızını ayarlayabilirsiniz (ms cinsinden)
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full sm:w-2/3 lg:w-1/2 mx-auto min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Hukuk AI Chatbot</h1>

      <div className="w-full h-[500px] border border-gray-300 rounded-lg p-4 overflow-y-auto bg-white shadow mb-4">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'User';
          // Mesajın sağda mı solda mı görüneceği
          const alignment = isUser ? 'justify-end' : 'justify-start';
          // Kullanıcı balonları ile AI balonlarının farklı stilleri
          const bubbleStyle = isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800';

          return (
            <div key={index} className={`flex ${alignment} my-1`}>
              <div
                className={`max-w-[80%] p-2 rounded-lg ${bubbleStyle} whitespace-pre-wrap`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="text-sm text-gray-400 mt-2">AI yazıyor...</div>
        )}
      </div>

      <div className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
          placeholder="Mesajınızı yazın..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
