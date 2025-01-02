import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;  // Tüm geçmişi buradan alıyoruz

    // Sistem mesajınız
    const systemMessage = {
      role: 'system',
      content: `
      Sen bir hukuk uzmanı ve aynı zamanda dostça sohbet eden bir asistansın.
      Kullanıcıya Türk hukuku çerçevesinde anlaşılır, samimi ve eğlenceli bir dille
      yanıt ver. 
      ...
      `,
    };

    // Yeni istek payload’ında, systemMessage + user geçmişi + assistant geçmişi vs. birleştiriyoruz.
    const payloadMessages = [
      systemMessage,
      ...messages, // Hem user hem assistant mesajları
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: payloadMessages,
        max_tokens: 700,
        temperature: 0.8,
        top_p: 0.9,
        presence_penalty: 0.5,
        frequency_penalty: 0.5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Hatası:', errorText);
      return NextResponse.json({
        reply: `AI yanıtında bir hata oluştu: ${errorText}`,
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error('Hata:', error);
    return NextResponse.json({
      reply: 'Bir hata meydana geldi. Lütfen daha sonra tekrar deneyin.',
    });
  }
}
