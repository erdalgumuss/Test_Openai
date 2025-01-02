import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Hukuk AI Chatbot"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold text-center sm:text-left text-gray-800">
          Hukuk AI Chatbot
        </h1>
        <p className="text-lg text-gray-700 text-center sm:text-left max-w-lg">
          Hukuki sorularınıza hızlı, doğru ve anlaşılır yanıtlar sunan yapay
          zeka destekli chatbotumuzla tanışın. Türk hukuk sistemi çerçevesinde
          danışmanlık alabilir ve sorularınıza yanıt bulabilirsiniz. Lütfen
          unutmayın, bu bir avukatlık hizmeti değildir.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Yönlendirme Butonu */}
          <Link
            href="/chat"
            className="mt-4 rounded-full bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 shadow-lg transition transform hover:scale-105"
          >
            Chatbot ile Konuşmaya Başla →
          </Link>
        </div>
      </main>

      {/* Footer kaldırıldı */}
    </div>
  );
}
