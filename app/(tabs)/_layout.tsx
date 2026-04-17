// VoiceMap — 5-Tab Navigation Layout (emoji icons, web-safe)
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Palette } from '@/constants/theme';
import { useAlertStore } from '@/store/useAlertStore';
import FloatingChatbot from '@/components/common/FloatingChatbot';
import { useTranslation } from '@/hooks/useTranslation';

// Web-safe tab icons using emoji — MaterialIcons font fails on Expo web
type TabKey = 'dashboard' | 'reviews' | 'alerts' | 'playbook' | 'settings';
const TAB_ICONS: Record<TabKey, { active: string; inactive: string }> = {
  dashboard: { active: '⬡', inactive: '⬡' },
  reviews:   { active: '◈', inactive: '◈' },
  alerts:    { active: '◉', inactive: '◉' },
  playbook:  { active: '◧', inactive: '◧' },
  settings:  { active: '◍', inactive: '◍' },
};

// Clean icon using emoji
function EmojiIcon({ emoji, color, size = 22 }: { emoji: string; color: string; size?: number }) {
  return (
    <Text style={{ fontSize: size, color, lineHeight: size + 4, textAlign: 'center' }}>
      {emoji}
    </Text>
  );
}

function AlertIcon({ color, count }: { color: string; count: number }) {
  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <EmojiIcon emoji="🔔" color={color} size={20} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  const unreadCount = useAlertStore((s) => s.unreadCount());
  const t = useTranslation();

  return (
    <View style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Palette.violetLight,
        tabBarInactiveTintColor: Palette.grey500,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tab_dashboard,
          tabBarIcon: ({ color, focused }) => (
            <Text style={[styles.tabIcon, { color }]}>
              {focused ? '▣' : '▢'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: t.tab_reviews,
          tabBarIcon: ({ color, focused }) => (
            <Text style={[styles.tabIcon, { color }]}>
              {focused ? '✦' : '✧'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: t.tab_alerts,
          tabBarIcon: ({ color }) => (
            <AlertIcon color={color} count={unreadCount} />
          ),
        }}
      />
      <Tabs.Screen
        name="playbook"
        options={{
          title: t.tab_playbook,
          tabBarIcon: ({ color, focused }) => (
            <Text style={[styles.tabIcon, { color }]}>
              {focused ? '⚙' : '⚙'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.tab_settings,
          tabBarIcon: ({ color, focused }) => (
            <Text style={[styles.tabIcon, { color }]}>
              {focused ? '◉' : '○'}
            </Text>
          ),
        }}
      />
      {/* Hidden legacy screen */}
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>

    {/* ── Global Floating AI Chatbot — visible on all tabs ── */}
    <FloatingChatbot />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Palette.navySurface,
    borderTopColor: Palette.navyBorder,
    borderTopWidth: 1,
    height: Platform.select({ ios: 84, web: 60, default: 60 }),
    paddingBottom: Platform.select({ ios: 24, default: 6 }),
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginTop: 1,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -10,
    backgroundColor: Palette.danger,
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: Palette.navySurface,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
  },
});
