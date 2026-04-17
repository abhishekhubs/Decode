// VoiceMap — Floating AI Chatbot (Groq-powered, global overlay)
import { Palette, Radii } from '@/constants/theme';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY ?? '';
const GROQ_MODEL = 'llama-3.1-8b-instant';



const SYSTEM_PROMPT = `You are VoiceMap AI Assistant — an intelligent chatbot embedded in the VoiceMap platform, an AI-powered review intelligence and sentiment analytics SaaS for businesses.

You help users with:
- Dashboard metrics, sentiment scores, revenue-at-risk calculations
- Review management and AI-generated reply suggestions
- Alert configuration and threshold settings
- Geo-sentiment heat maps and regional analysis
- Playbook strategies for handling negative/positive reviews
- Multi-language support (English, Hindi, Kannada)
- Exporting PDF reports and loading demo data
- General questions about NPS, CSAT, customer feedback

Be concise, friendly, and use emojis occasionally. Always try to help even for off-topic questions.`;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  '📊 Explain sentiment scores',
  '🔔 How do alerts work?',
  '🤖 AI reply generator?',
  '🗺️ Geo-sentiment map?',
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "👋 Hi! I'm your **VoiceMap AI Assistant**.\n\nAsk me anything about the platform — reviews, alerts, sentiment analysis, or how to use any feature!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // Pulse animation for FAB
  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const openChat = () => {
    slideAnim.setValue(60);
    fadeAnim.setValue(0);
    setIsOpen(true);
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 70, friction: 9 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const closeChat = () => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 80, useNativeDriver: true, tension: 70, friction: 9 }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(() => setIsOpen(false));
  };

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userText };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...next.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      const data = await res.json();

      // Groq returns errors as { error: { message, type, code } }
      if (!res.ok || data?.error) {
        const errMsg = data?.error?.message ?? `HTTP ${res.status}`;
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `⚠️ Groq API error: ${errMsg}`,
          },
        ]);
        return;
      }

      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        throw new Error('Empty reply from Groq');
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: reply },
      ]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `⚠️ Error: ${e?.message ?? 'Connection failed. Check your internet and try again.'}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };


  // ── Markdown renderer: correct RN inline Text nesting ──────────────
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      if (line.trim() === '') return <View key={lineIdx} style={{ height: 5 }} />;

      const isBullet   = /^[*\-]\s/.test(line.trim());
      const isNumbered = /^\d+\.\s/.test(line.trim());
      const isHeading  = /^#{1,3}\s/.test(line.trim());

      const cleanLine = line
        .replace(/^#{1,3}\s/, '')
        .replace(/^[*\-]\s/, '')
        .replace(/^\d+\.\s/, '');

      // Inline bold — nested Text spans inside parent Text (RN-correct)
      const spans = cleanLine.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
        seg.startsWith('**') && seg.endsWith('**') ? (
          <Text key={i} style={{ fontWeight: '800', color: Palette.violetLight }}>
            {seg.slice(2, -2)}
          </Text>
        ) : (
          <Text key={i}>{seg}</Text>
        )
      );

      if (isBullet || isNumbered) {
        const marker = isBullet ? '•' : `${line.trim().match(/^(\d+)/)?.[1]}.`;
        return (
          <View key={lineIdx} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: lineIdx > 0 ? 4 : 0 }}>
            <Text style={{ width: 16, color: Palette.violetLight, fontWeight: '800', fontSize: 13, lineHeight: 20 }}>
              {marker}
            </Text>
            <Text style={{ flex: 1, fontSize: 13, lineHeight: 20, color: Palette.grey100 }}>
              {spans}
            </Text>
          </View>
        );
      }

      return (
        <Text
          key={lineIdx}
          style={[
            { fontSize: 13, lineHeight: 20, color: Palette.grey100, marginTop: lineIdx > 0 ? 2 : 0 },
            isHeading && { fontWeight: '800', fontSize: 14, color: Palette.violetLight, marginTop: lineIdx > 0 ? 8 : 0, marginBottom: 2 },
          ]}
        >
          {spans}
        </Text>
      );
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.msgRow, isUser ? styles.msgRowUser : styles.msgRowBot]}>
        {!isUser && (
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>🤖</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
          {isUser ? (
            <Text style={styles.bubbleTextUser}>{item.content}</Text>
          ) : (
            <View>{renderMarkdown(item.content)}</View>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {/* ── Chat Modal ─────────────────────────────────────────────── */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeChat}
      >
        {/* Dim backdrop */}
        <TouchableWithoutFeedback onPress={closeChat}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Chat panel — slides up from bottom-right */}
        <Animated.View
          style={[
            styles.chatWindow,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderLeft}>
              <View style={styles.headerAvatar}>
                <Text style={{ fontSize: 18 }}>🤖</Text>
              </View>
              <View>
                <Text style={styles.chatHeaderTitle}>VoiceMap AI</Text>
                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.chatHeaderSub}>Online · DECODE Powered</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={closeChat} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Quick prompts — only on first open */}
          {messages.length === 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.quickScroll}
              contentContainerStyle={styles.quickScrollContent}
            >
              {QUICK_PROMPTS.map((q) => (
                <TouchableOpacity key={q} style={styles.quickChip} onPress={() => sendMessage(q)}>
                  <Text style={styles.quickChipText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Typing indicator */}
          {loading && (
            <View style={styles.typingRow}>
              <View style={styles.botAvatar}>
                <Text style={styles.botAvatarText}>🤖</Text>
              </View>
              <View style={styles.typingBubble}>
                <ActivityIndicator size="small" color={Palette.violetLight} />
                <Text style={styles.typingText}>Thinking…</Text>
              </View>
            </View>
          )}

          {/* Input */}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.chatInput}
                value={input}
                onChangeText={setInput}
                placeholder="Ask me anything…"
                placeholderTextColor={Palette.grey600}
                multiline
                maxLength={500}
                returnKeyType="send"
                blurOnSubmit={false}
                onSubmitEditing={() => sendMessage()}
              />
              <TouchableOpacity
                style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
                onPress={() => sendMessage()}
                disabled={!input.trim() || loading}
              >
                <Text style={styles.sendBtnText}>➤</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </Modal>

      {/* ── Floating Action Button ──────────────────────────────────── */}
      <Animated.View style={[styles.fabWrap, { transform: [{ scale: pulseAnim }] }]}>
        <TouchableOpacity style={styles.fab} onPress={openChat} activeOpacity={0.85}>
          <Text style={styles.fabIcon}>🤖</Text>
          <View style={styles.fabBadge}>
            <Text style={styles.fabBadgeText}>AI</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  // ── Backdrop ────────────────────────────────────────────────────
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  // ── Chat window ─────────────────────────────────────────────────
  chatWindow: {
    position: 'absolute',
    bottom: 100,
    right: 12,
    width: 320,
    height: 480,
    backgroundColor: Palette.navyCard,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
    overflow: 'hidden',
    shadowColor: Palette.violet,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 24,
  },

  // ── Header ──────────────────────────────────────────────────────
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Palette.navySurface,
    borderBottomWidth: 1,
    borderBottomColor: Palette.navyBorder,
  },
  chatHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.violetDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Palette.violet,
  },
  chatHeaderTitle: { color: '#fff', fontWeight: '800', fontSize: 14 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  chatHeaderSub: { color: Palette.grey400, fontSize: 10, fontWeight: '600' },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.navyBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: Palette.grey400, fontSize: 13, fontWeight: '700' },

  // ── Messages ────────────────────────────────────────────────────
  messageList: { flex: 1 },
  messageListContent: { padding: 12, gap: 10 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  msgRowUser: { justifyContent: 'flex-end' },
  msgRowBot: { justifyContent: 'flex-start' },
  botAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Palette.violetDim,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  botAvatarText: { fontSize: 14 },
  bubble: {
    maxWidth: '78%',
    borderRadius: Radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bubbleUser: { backgroundColor: Palette.violet, borderBottomRightRadius: 4 },
  bubbleBot: {
    backgroundColor: Palette.navySurface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
  },
  bubbleText: { fontSize: 13, lineHeight: 19 },
  bubbleTextUser: { color: '#fff', fontWeight: '500' },
  bubbleTextBot: { color: Palette.grey100 },

  // ── Typing ──────────────────────────────────────────────────────
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.navySurface,
    borderRadius: Radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
  },
  typingText: { color: Palette.grey400, fontSize: 12 },

  // ── Quick prompts ────────────────────────────────────────────────
  quickScroll: { maxHeight: 44 },
  quickScrollContent: { paddingHorizontal: 10, gap: 8, alignItems: 'center' },
  quickChip: {
    backgroundColor: Palette.violetDim,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Palette.violet,
  },
  quickChipText: { color: Palette.violetLight, fontSize: 11, fontWeight: '700' },

  // ── Input ────────────────────────────────────────────────────────
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Palette.navyBorder,
    backgroundColor: Palette.navySurface,
  },
  chatInput: {
    flex: 1,
    backgroundColor: Palette.navyCard,
    color: '#fff',
    borderRadius: Radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    borderWidth: 1,
    borderColor: Palette.navyBorder,
    maxHeight: 80,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Palette.violet,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.violet,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  sendBtnDisabled: { backgroundColor: Palette.navyBorder, shadowOpacity: 0 },
  sendBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },

  // ── FAB ─────────────────────────────────────────────────────────
  fabWrap: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    zIndex: 999,
    elevation: 20,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Palette.violet,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.violet,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 14,
  },
  fabIcon: { fontSize: 26 },
  fabBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#10B981',
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: Palette.deepNavy,
  },
  fabBadgeText: { color: '#fff', fontSize: 8, fontWeight: '900' },
});
