import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Phone, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  from: 'user' | 'bot';
  text: string;
  time: string;
}

const quickQuestions = [
  { id: 'saldo', label: '💰 Ver mi saldo', emoji: '💰' },
  { id: 'pago', label: '📅 Próximo pago', emoji: '📅' },
  { id: 'cambio', label: '🔄 Cambiar AFP', emoji: '🔄' },
  { id: 'jubilacion', label: '🏠 Jubilación', emoji: '🏠' },
  { id: 'retiro', label: '💳 Retirar fondos', emoji: '💳' },
  { id: 'beneficiario', label: '👨‍👩‍👧 Beneficiarios', emoji: '👨‍👩‍👧' },
];

const botAnswers: Record<string, string> = {
  saldo:
    'Su saldo actual en AFP Integra es de S/. 87,450.00 en el Fondo 2 (Mixto).\n\nSu último aporte fue de S/. 412.50 el 30 de abril de 2026.\n\nSu empleador aportó S/. 334.25 ese mismo mes.',
  pago:
    'Su próximo pago de pensión está programado para el 15 de mayo de 2026.\n\nEl monto estimado es de S/. 950.00 mensuales.\n\nSu modalidad es Renta Vitalicia con AFP Integra.',
  cambio:
    'Para cambiar de AFP puede:\n\n1. Ingresar a la app de su nueva AFP\n2. Llamar al 0800-00000 (gratis)\n3. Visitar una agencia con su DNI\n\nEl proceso toma entre 30 y 60 días hábiles. No hay costo para usted.',
  jubilacion:
    'Para jubilarse anticipadamente necesita:\n\n• Tener 55 años (mujeres) o 60 años (hombres)\n• Una pensión proyectada ≥ 40% del promedio de sus últimos 120 sueldos\n• O S/. 930 como mínimo garantizado\n\nLe recomiendo consultar con un asesor de AFP Integra.',
  retiro:
    'Puede retirar hasta el 25% de sus fondos para:\n\n• Compra de primer vivienda\n• Pago de deuda hipotecaria\n\nTambién existe el retiro libre de hasta 4 UIT (S/. 21,200) si tiene 65 años.\n\nLlame al 0800-00000 para asesoría gratuita.',
  beneficiario:
    'Sus beneficiarios son las personas que recibirán su pensión de sobrevivencia.\n\nPuede registrar o actualizar beneficiarios:\n\n• En la app AFP Integra\n• En cualquier agencia con su DNI\n• Llamando al 615-5000\n\nNecesitará los DNI de sus beneficiarios.',
  default:
    'Entiendo su consulta. Le recomiendo comunicarse directamente con AFP Integra al número gratuito 0800-00000 (Lunes a Viernes, 9am a 6pm) para recibir asesoría personalizada.\n\nTambién puede visitar la sección "Aprender" de esta app para más información sobre pensiones.',
};

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'bot',
    text: '¡Hola! Soy Molly, su asistente virtual de pensiones. 👋\n\nEstoy aquí para ayudarle con consultas sobre su AFP Integra. ¿En qué le puedo ayudar hoy?',
    time: getCurrentTime(),
  },
];

export function HelpBotScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [idCounter, setIdCounter] = useState(10);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: idCounter,
      from: 'user',
      text: text.trim(),
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIdCounter((n) => n + 1);
    setInputText('');
    setIsTyping(true);

    // Determine bot response
    const lower = text.toLowerCase();
    let responseKey = 'default';
    if (lower.includes('saldo') || lower.includes('cuánto') || lower.includes('aporte')) responseKey = 'saldo';
    else if (lower.includes('pago') || lower.includes('pensión') || lower.includes('cobro') || lower.includes('cuándo')) responseKey = 'pago';
    else if (lower.includes('cambiar') || lower.includes('cambio') || lower.includes('traspasar')) responseKey = 'cambio';
    else if (lower.includes('jubil') || lower.includes('retir') && lower.includes('trabajar')) responseKey = 'jubilacion';
    else if (lower.includes('retiro') || lower.includes('sacar') || lower.includes('retirar')) responseKey = 'retiro';
    else if (lower.includes('beneficiario') || lower.includes('familiar') || lower.includes('heredero')) responseKey = 'beneficiario';

    setTimeout(() => {
      const botMsg: Message = {
        id: idCounter + 1,
        from: 'bot',
        text: botAnswers[responseKey],
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIdCounter((n) => n + 2);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (questionId: string) => {
    const question = quickQuestions.find((q) => q.id === questionId);
    if (question) {
      sendMessage(question.label.replace(/^[\s\S]{2}\s/, ''));
    }
  };

  return (
    <div className="flex flex-col" style={{ height: '100%', overflow: 'hidden' }}>
      {/* Bot Header */}
      <div
        className="px-5 pt-4 pb-4 flex-shrink-0"
        style={{ backgroundColor: '#FDFBF7' }}
      >
        <div
          className="flex items-center gap-4 rounded-3xl p-4"
          style={{ backgroundColor: '#0D3B66' }}
        >
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{ width: '56px', height: '56px', backgroundColor: '#06D6A0' }}
          >
            <Bot style={{ width: '30px', height: '30px', color: '#FDFBF7' }} strokeWidth={3} />
          </div>
          <div className="flex-1">
            <p className="font-black" style={{ fontSize: '20px', color: '#FDFBF7', lineHeight: '1.2' }}>
              Molly · Asistente AFP
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#06D6A0' }} />
              <p className="font-bold" style={{ fontSize: '14px', color: 'rgba(253,251,247,0.7)', lineHeight: '1.2' }}>
                En línea · Responde al instante
              </p>
            </div>
          </div>
          <a
            href="tel:080000000"
            className="flex items-center justify-center rounded-2xl"
            style={{ width: '52px', height: '52px', backgroundColor: 'rgba(6,214,160,0.2)', border: '2px solid #06D6A0', flexShrink: 0 }}
            aria-label="Llamar a AFP"
          >
            <Phone style={{ width: '24px', height: '24px', color: '#06D6A0' }} strokeWidth={3} />
          </a>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="px-5 pb-3 flex-shrink-0">
        <p className="font-bold mb-2" style={{ fontSize: '15px', color: '#5A6F8C' }}>
          Preguntas rápidas:
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {quickQuestions.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleQuickQuestion(id)}
              className="flex-shrink-0 rounded-full px-4 py-2 font-bold transition-all"
              style={{
                minHeight: '44px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid rgba(13,59,102,0.2)',
                color: '#0D3B66',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-5 pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
            >
              {msg.from === 'bot' && (
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: '40px', height: '40px', backgroundColor: '#06D6A0', marginBottom: '4px' }}
                >
                  <Bot style={{ width: '22px', height: '22px', color: '#FDFBF7' }} strokeWidth={3} />
                </div>
              )}
              <div
                className="rounded-3xl px-5 py-4"
                style={{
                  maxWidth: '80%',
                  backgroundColor: msg.from === 'user' ? '#0D3B66' : '#FFFFFF',
                  border: msg.from === 'bot' ? '3px solid rgba(13,59,102,0.10)' : 'none',
                  boxShadow: msg.from === 'bot' ? '0 2px 12px rgba(13,59,102,0.06)' : 'none',
                  borderBottomRightRadius: msg.from === 'user' ? '8px' : '24px',
                  borderBottomLeftRadius: msg.from === 'bot' ? '8px' : '24px',
                }}
              >
                <p
                  className="font-bold whitespace-pre-line"
                  style={{
                    fontSize: '17px',
                    lineHeight: '1.6',
                    color: msg.from === 'user' ? '#FDFBF7' : '#0D3B66',
                  }}
                >
                  {msg.text}
                </p>
                <p
                  className="font-bold mt-1"
                  style={{
                    fontSize: '12px',
                    color: msg.from === 'user' ? 'rgba(253,251,247,0.6)' : '#5A6F8C',
                  }}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-end gap-3"
              >
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: '40px', height: '40px', backgroundColor: '#06D6A0' }}
                >
                  <Bot style={{ width: '22px', height: '22px', color: '#FDFBF7' }} strokeWidth={3} />
                </div>
                <div
                  className="rounded-3xl px-5 py-4 flex items-center gap-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '3px solid rgba(13,59,102,0.10)',
                    borderBottomLeftRadius: '8px',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{ width: '10px', height: '10px', backgroundColor: '#0D3B66' }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        className="flex-shrink-0 px-5 pt-3 pb-4"
        style={{ backgroundColor: '#FDFBF7', borderTop: '2px solid rgba(13,59,102,0.08)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex-1 flex items-center rounded-2xl px-4 gap-2"
            style={{
              backgroundColor: '#FFFFFF',
              border: '3px solid rgba(13,59,102,0.2)',
              minHeight: '60px',
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(inputText);
              }}
              placeholder="Escriba su consulta..."
              className="flex-1 bg-transparent outline-none font-bold"
              style={{
                fontSize: '18px',
                color: '#0D3B66',
                lineHeight: '1.4',
              }}
            />
          </div>

          {/* Voice button */}
          <button
            onClick={() => sendMessage('¿Cuánto tengo en mi AFP?')}
            className="flex items-center justify-center rounded-2xl flex-shrink-0 touch-manipulation"
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#5A6F8C',
            }}
            aria-label="Usar voz"
          >
            <Mic style={{ width: '28px', height: '28px', color: '#FDFBF7' }} strokeWidth={3} />
          </button>

          {/* Send button */}
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() && !isTyping}
            className="flex items-center justify-center rounded-2xl flex-shrink-0 touch-manipulation"
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: inputText.trim() ? '#06D6A0' : 'rgba(13,59,102,0.2)',
            }}
            aria-label="Enviar"
          >
            <Send
              style={{
                width: '28px',
                height: '28px',
                color: inputText.trim() ? '#FDFBF7' : '#5A6F8C',
              }}
              strokeWidth={3}
            />
          </button>
        </div>

        {/* Call CTA */}
        <a
          href="tel:080000000"
          className="mt-3 w-full flex items-center justify-center gap-3 rounded-2xl py-3 font-black transition-all"
          style={{
            minHeight: '56px',
            backgroundColor: '#FFF8E6',
            border: '2px solid #FFB800',
            color: '#8B6000',
            fontSize: '17px',
            textDecoration: 'none',
          }}
        >
          <Phone style={{ width: '24px', height: '24px' }} strokeWidth={3} />
          Llamar gratis: 0800-00000
        </a>
      </div>
    </div>
  );
}