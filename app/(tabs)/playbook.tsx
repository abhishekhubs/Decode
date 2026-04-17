// VoiceMap — Playbook Builder Tab (Premium Version)
import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Modal, TextInput, Platform, ScrollView, Alert,
  Dimensions, LayoutAnimation, KeyboardAvoidingView,
} from 'react-native';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { PlaybookAction, Priority, ActionStatus } from '@/types';
import { usePlaybookStore } from '@/store/usePlaybookStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PRIORITY_COLOR: Record<Priority, string> = {
  high: Palette.danger,
  medium: Palette.warning,
  low: Palette.success,
};

function PlaybookCardItem({
  action,
  onMove,
}: {
  action: PlaybookAction;
  onMove: (id: string, status: ActionStatus) => void;
}) {
  const pColor = PRIORITY_COLOR[action.priority];
  const dateStr = new Date(action.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <View style={styles.card}>
      <View style={[styles.cardPriorityBar, { backgroundColor: pColor }]} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{action.title}</Text>
          </View>
        </View>
        
        <Text style={styles.cardDesc} numberOfLines={2}>{action.description}</Text>
        
        <View style={styles.cardMetaRow}>
          <View style={styles.metaItem}>
            <Feather name="user" size={12} color={Palette.grey400} />
            <Text style={styles.metaText}>{action.owner}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="tag" size={12} color={Palette.grey400} />
            <Text style={styles.metaText}>{action.feature}</Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: pColor + '15', borderColor: pColor + '30' }]}>
            <Text style={[styles.priorityText, { color: pColor }]}>{action.priority.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          {action.status !== 'todo' && (
            <TouchableOpacity 
              style={[styles.miniActionBtn, { borderColor: Palette.grey600 }]}
              onPress={() => onMove(action.id, 'todo')}
            >
              <Feather name="arrow-left" size={14} color={Palette.grey400} />
              <Text style={styles.miniActionText}>Back</Text>
            </TouchableOpacity>
          )}
          {action.status === 'todo' && (
            <TouchableOpacity 
              style={[styles.miniActionBtn, { borderColor: Palette.warning + '80', backgroundColor: Palette.warning + '10' }]}
              onPress={() => onMove(action.id, 'inprogress')}
            >
              <Feather name="zap" size={14} color={Palette.warning} />
              <Text style={[styles.miniActionText, { color: Palette.warning }]}>Start Now</Text>
            </TouchableOpacity>
          )}
          {action.status === 'inprogress' && (
            <TouchableOpacity 
              style={[styles.miniActionBtn, { borderColor: Palette.success + '80', backgroundColor: Palette.success + '10' }]}
              onPress={() => onMove(action.id, 'done')}
            >
              <Feather name="check" size={14} color={Palette.success} />
              <Text style={[styles.miniActionText, { color: Palette.success }]}>Complete</Text>
            </TouchableOpacity>
          )}
          {action.status === 'done' && (
            <View style={[styles.miniActionBtn, { borderColor: Palette.success + '40', opacity: 0.6 }]}>
              <Feather name="check-circle" size={14} color={Palette.success} />
              <Text style={[styles.miniActionText, { color: Palette.success }]}>Resolved</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default function PlaybookScreen() {
  const { actions, addAction, updateActionStatus } = usePlaybookStore();
  const [activeTab, setActiveTab] = useState<ActionStatus>('todo');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newFeature, setNewFeature] = useState('Battery');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const t = useTranslation();

  const stats = useMemo(() => {
    const total = actions.length;
    const done = actions.filter(a => a.status === 'done').length;
    const inProgress = actions.filter(a => a.status === 'inprogress').length;
    const progress = total > 0 ? (done / total) * 100 : 0;
    return { total, done, inProgress, progress };
  }, [actions]);

  const filteredActions = actions.filter((a) => a.status === activeTab);

  const handleMove = (id: string, status: ActionStatus) => {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    updateActionStatus(id, status);
  };

  const handleAddAction = () => {
    if (!newTitle.trim()) return;
    const action: PlaybookAction = {
      id: `p_${Date.now()}`,
      title: newTitle,
      description: 'Strategic remediation task generated to address active concerns.',
      feature: newFeature,
      priority: newPriority,
      owner: newOwner || 'Product Team',
      status: 'todo',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    addAction(action);
    setNewTitle('');
    setNewOwner('');
    setShowAddModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <LinearGradient colors={[Palette.deepNavy, Palette.navyCard]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerLabel}>{t.playbook_label}</Text>
            <Text style={styles.headerTitle}>{t.playbook_title}</Text>
          </View>
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => setShowAddModal(true)}
          >
            <Feather name="plus" size={24} color={Palette.violetLight} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{stats.total}</Text>
            <Text style={styles.statLab}>Actions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: Palette.warning }]}>{stats.inProgress}</Text>
            <Text style={styles.statLab}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: Palette.success }]}>{stats.done}</Text>
            <Text style={styles.statLab}>Resolved</Text>
          </View>
          <View style={styles.progressRing}>
            <Text style={styles.progressText}>{Math.round(stats.progress)}%</Text>
          </View>
        </View>

        {/* Segmented Control */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {['todo', 'inprogress', 'done'].map((tab) => {
              const isActive = activeTab === tab;
              const labels = { todo: t.playbook_todo, inprogress: t.playbook_inprogress, done: t.playbook_done };
              const counts = { todo: stats.total - stats.done - stats.inProgress, inprogress: stats.inProgress, done: stats.done };
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, isActive && styles.activeTab]}
                  onPress={() => {
                    if (Platform.OS !== 'web') LayoutAnimation.easeInEaseOut();
                    setActiveTab(tab as ActionStatus);
                  }}
                >
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {labels[tab as keyof typeof labels]}
                  </Text>
                  <View style={[styles.tabBadge, isActive && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Text style={[styles.tabBadgeText, isActive && { color: '#fff' }]}>
                      {counts[tab as keyof typeof counts]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={filteredActions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaybookCardItem action={item} onMove={handleMove} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="clipboard" size={48} color={Palette.grey700} />
            <Text style={styles.emptyText}>{t.playbook_empty}</Text>
          </View>
        }
      />

      {/* Modern Add Action Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.playbook_new_title}</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)} style={styles.closeBtn}>
                <Feather name="x" size={24} color={Palette.grey400} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalBody}>
              <Text style={styles.inputLabel}>Action Title</Text>
              <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="e.g. Initiate customer outreach"
                placeholderTextColor={Palette.grey600}
              />

              <Text style={styles.inputLabel}>Responsible Owner</Text>
              <TextInput
                style={styles.input}
                value={newOwner}
                onChangeText={setNewOwner}
                placeholder="e.g. John Doe"
                placeholderTextColor={Palette.grey600}
              />

              <Text style={styles.inputLabel}>Priority Level</Text>
              <View style={styles.prioritySelector}>
                {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.priorityOption,
                      newPriority === p && { backgroundColor: PRIORITY_COLOR[p] + '40', borderColor: PRIORITY_COLOR[p] }
                    ]}
                    onPress={() => setNewPriority(p)}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      newPriority === p && { color: PRIORITY_COLOR[p], fontWeight: '700' }
                    ]}>{p.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.saveActionBtn} onPress={handleAddAction}>
                <LinearGradient
                  colors={[Palette.violet, Palette.violetLight]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  <Text style={styles.saveActionBtnText}>{t.playbook_save}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.deepNavy },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerLabel: { color: Palette.violetLight, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 4 },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '800' },
  addBtn: {
    width: 48, height: 48, borderRadius: 24, 
    backgroundColor: Palette.navySurface,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'space-between' },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', 
    padding: 12, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  statVal: { color: '#fff', fontSize: 18, fontWeight: '800' },
  statLab: { color: Palette.grey400, fontSize: 10, fontWeight: '600', marginTop: 2 },
  progressRing: {
    width: 54, height: 54, borderRadius: 27, 
    borderWidth: 3, borderColor: Palette.violet,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
  },
  progressText: { color: Palette.violetLight, fontSize: 12, fontWeight: '800' },

  tabsContainer: { marginTop: 24 },
  tabs: {
    flexDirection: 'row', backgroundColor: Palette.navyCard,
    padding: 6, borderRadius: 20,
    borderWidth: 1, borderColor: Palette.navyBorder,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 16, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  activeTab: { backgroundColor: Palette.navySurface },
  tabText: { color: Palette.grey400, fontSize: 13, fontWeight: '600' },
  activeTabText: { color: '#fff', fontWeight: '800' },
  tabBadge: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  tabBadgeText: { color: Palette.grey500, fontSize: 10, fontWeight: '800' },

  listContent: { padding: Spacing.lg, paddingTop: 8, paddingBottom: 100 },
  card: {
    backgroundColor: Palette.navyCard, borderRadius: 20,
    marginBottom: 16, flexDirection: 'row', overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3,
  },
  cardPriorityBar: { width: 6 },
  cardContent: { flex: 1, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '700', flex: 1, marginRight: 10 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  priorityText: { fontSize: 9, fontWeight: '900' },
  cardDesc: { color: Palette.grey300, fontSize: 14, lineHeight: 20, marginBottom: 16 },
  cardMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16, alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: Palette.grey400, fontSize: 11, fontWeight: '500' },
  cardActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 14 },
  miniActionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1,
  },
  miniActionText: { fontSize: 11, fontWeight: '700', color: Palette.grey400 },

  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { color: Palette.grey600, fontSize: 15, fontWeight: '600', marginTop: 16 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalSheet: { 
    backgroundColor: Palette.navyCard, borderTopLeftRadius: 32, borderTopRightRadius: 32, 
    height: '75%', paddingBottom: 40,
  },
  modalHandle: { 
    width: 40, height: 4, backgroundColor: Palette.grey700, 
    borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 20,
  },
  modalHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 24, marginBottom: 24,
  },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Palette.navySurface, alignItems: 'center', justifyContent: 'center' },
  modalBody: { paddingHorizontal: 24 },
  inputLabel: { color: Palette.grey400, fontSize: 13, fontWeight: '700', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: Palette.navySurface, borderRadius: 16, padding: 16,
    color: '#fff', fontSize: 16, marginBottom: 20,
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  prioritySelector: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  priorityOption: { 
    flex: 1, paddingVertical: 12, alignItems: 'center', 
    borderRadius: 12, borderWidth: 1, borderColor: Palette.navyBorder,
    backgroundColor: Palette.navySurface,
  },
  priorityOptionText: { color: Palette.grey500, fontSize: 11, fontWeight: '600' },
  saveActionBtn: { marginTop: 10 },
  gradientBtn: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  saveActionBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
