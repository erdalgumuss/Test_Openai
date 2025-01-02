import Chat from '../components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Hukuk AI Chatbot</h1>
      <Chat />
    </main>
  );
}
