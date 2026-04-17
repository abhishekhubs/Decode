// VoiceMap — Playbook Builder Tab
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Modal, TextInput, Platform, ScrollView, Alert,
} from 'react-native';
import { Palette, Radii, Spacing } from '@/constants/theme';
import { PlaybookAction, Priority, ActionStatus } from '@/types';
import { usePlaybookStore } from '@/store/usePlaybookStore';
import { useTranslation } from '@/hooks/useTranslation';

const PRIORITY_COLOR: Record<Priority, string> = {
  high: Palette.danger,
  medium: Palette.warning,
  low: Palette.success,
};

const STATUS_LABELS: { key: ActionStatus; label: string; icon: string; color: string }[] = [
  { key: 'todo',       label: 'To Do',       icon: '📌', color: Palette.grey500 },
  { key: 'inprogress', label: 'In Progress', icon: '⚡', color: Palette.warning },
  { key: 'done',       label: 'Done',        icon: '✅', color: Palette.success },
];

function PlaybookCardItem({
  action,
  onMove,
}: {
  action: PlaybookAction;
  onMove: (id: string, status: ActionStatus) => void;
}) {
  const pColor = PRIORITY_COLOR[action.priority];
  return (
    <View style={[styles.card, { borderLeftColor: pColor }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{action.title}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: pColor + '33' }]}>
          <Text style={[styles.priorityText, { color: pColor }]}>{action.priority}</Text>
        </View>
      </View>
      <Text style={styles.cardDesc} numberOfLines={2}>{action.description}</Text>
      <View style={styles.cardMeta}>
        <Text style={styles.metaText}>👤 {action.owner}</Text>
        <Text style={styles.metaText}>🎯 {action.feature}</Text>
        {action.linkedAlertId && (
          <View style={styles.alertLink}>
            <Text style={styles.alertLinkText}>🔔 Alert</Text>
          </View>
        )}
      </View>
      {/* Move buttons */}
      <View style={styles.moveRow}>
        {STATUS_LABELS.map((s) =>
          s.key !== action.status ? (
            <TouchableOpacity
              key={s.key}
              style={[styles.moveBtn, { borderColor: s.color }]}
              onPress={() => onMove(action.id, s.key)}
            >
              <Text style={[styles.moveBtnText, { color: s.color }]}>→ {s.label}</Text>
            </TouchableOpacity>
          ) : null
        )}
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

  // Translated status labels (computed inside component so they react to language change)
  const STATUS_LABELS_T = [
    { key: 'todo'       as ActionStatus, label: t.playbook_todo,       icon: '📌', color: Palette.grey500 },
    { key: 'inprogress' as ActionStatus, label: t.playbook_inprogress, icon: '⚡', color: Palette.warning },
    { key: 'done'       as ActionStatus, label: t.playbook_done,       icon: '✅', color: Palette.success },
  ];

  const moveAction = (id: string, newStatus: ActionStatus) => {
    updateActionStatus(id, newStatus);
  };

  const handleAddAction = () => {
    if (!newTitle.trim()) return;
    const action: PlaybookAction = {
      id: `p_${Date.now()}`,
      title: newTitle,
      description: 'Custom remediation action added via Playbook Builder.',
      feature: newFeature,
      priority: newPriority,
      owner: newOwner || 'Unassigned',
      status: 'todo',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    addAction(action);
    setNewTitle('');
    setNewOwner('');
    setShowAddModal(false);
    Alert.alert('✅ Action Added', `"${action.title}" added to your Playbook!`);
  };

  const tabCounts = {
    todo: actions.filter((a) => a.status === 'todo').length,
    inprogress: actions.filter((a) => a.status === 'inprogress').length,
    done: actions.filter((a) => a.status === 'done').length,
  };

  const displayed = actions.filter((a) => a.status === activeTab);

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.screenLabel}>{t.playbook_label}</Text>
          <Text style={styles.screenTitle}>{t.playbook_title}</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={{fontSize:20,color:"#fff"}}>+</Text>
          <Text style={styles.addBtnText}>{t.playbook_add.replace('+ ', '')}</Text>
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(tabCounts.done / Math.max(actions.length, 1)) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {tabCounts.done}/{actions.length} resolved
        </Text>
      </View>

      {/* Kanban tabs */}
      <View style={styles.kanbanTabs}>
        {STATUS_LABELS_T.map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[styles.kanbanTab, activeTab === s.key && { borderBottomColor: s.color, borderBottomWidth: 3 }]}
            onPress={() => setActiveTab(s.key)}
          >
            <Text style={[styles.kanbanTabText, activeTab === s.key && { color: s.color }]}>
              {s.icon} {s.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: s.color + '33' }]}>
              <Text style={[styles.countText, { color: s.color }]}>{tabCounts[s.key]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Actions list */}
      <FlatList
        data={displayed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaybookCardItem action={item} onMove={moveAction} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No actions in this stage</Text>
            <Text style={styles.emptySubText}>Add a new action via the button above</Text>
          </View>
        }
      />

      {/* Add Action Modal */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>➕ New Playbook Action</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={{fontSize:24,color:Palette.grey400}}>?</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text style={styles.inputLabel}>Action Title *</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="e.g. Escalate battery issue to dev team"
              placeholderTextColor={Palette.grey600}
            />

            <Text style={styles.inputLabel}>Owner</Text>
            <TextInput
              style={styles.input}
              value={newOwner}
              onChangeText={setNewOwner}
              placeholder="e.g. Product Manager"
              placeholderTextColor={Palette.grey600}
            />

            <Text style={styles.inputLabel}>Feature</Text>
            <View style={styles.featureRow}>
              {['Battery', 'Packaging', 'Support', 'Sound', 'Delivery'].map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.featureChip, newFeature === f && styles.featureChipActive]}
                  onPress={() => setNewFeature(f)}
                >
                  <Text style={[styles.featureChipText, newFeature === f && styles.featureChipTextActive]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Priority</Text>
            <View style={styles.priorityRow}>
              {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityChip,
                    { borderColor: PRIORITY_COLOR[p] },
                    newPriority === p && { backgroundColor: PRIORITY_COLOR[p] + '44' },
                  ]}
                  onPress={() => setNewPriority(p)}
                >
                  <Text style={[styles.priorityChipText, { color: PRIORITY_COLOR[p] }]}>
                    {p.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleAddAction}>
              <Text style={styles.saveBtnText}>✅ Save Action</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.deepNavy, paddingTop: Platform.OS === 'android' ? 28 : 50 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.md, marginBottom: 12,
  },
  screenLabel: { fontSize: 10, color: Palette.violetLight, fontWeight: '800', letterSpacing: 3 },
  screenTitle: { fontSize: 22, color: '#fff', fontWeight: '900' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Palette.violet, paddingHorizontal: 14, paddingVertical: 9, borderRadius: Radii.md,
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  progressContainer: {
    paddingHorizontal: Spacing.md, marginBottom: 12, gap: 4,
  },
  progressTrack: {
    height: 6, backgroundColor: Palette.navyBorder, borderRadius: 999, overflow: 'hidden',
  },
  progressFill: {
    height: 6, backgroundColor: Palette.success, borderRadius: 999,
  },
  progressLabel: { color: Palette.grey500, fontSize: 11 },
  kanbanTabs: {
    flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Palette.navyBorder,
    marginBottom: 12,
  },
  kanbanTab: {
    flex: 1, paddingVertical: 12, alignItems: 'center', flexDirection: 'row',
    justifyContent: 'center', gap: 6, borderBottomWidth: 0, borderBottomColor: 'transparent',
  },
  kanbanTabText: { color: Palette.grey500, fontSize: 13, fontWeight: '700' },
  countBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 },
  countText: { fontSize: 11, fontWeight: '800' },
  listContent: { paddingHorizontal: Spacing.md, paddingBottom: 32 },
  card: {
    backgroundColor: Palette.navyCard, borderRadius: Radii.md,
    padding: 14, marginBottom: 10, borderWidth: 1, borderColor: Palette.navyBorder,
    borderLeftWidth: 4, gap: 8,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  cardTitle: { color: '#fff', fontSize: 14, fontWeight: '700', flex: 1 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  priorityText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  cardDesc: { color: Palette.grey400, fontSize: 12, lineHeight: 17 },
  cardMeta: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  metaText: { color: Palette.grey500, fontSize: 11, fontWeight: '600' },
  alertLink: { backgroundColor: Palette.dangerDim, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 },
  alertLinkText: { color: Palette.dangerLight, fontSize: 10, fontWeight: '700' },
  moveRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  moveBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, borderWidth: 1 },
  moveBtnText: { fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyText: { color: Palette.grey400, fontSize: 15, fontWeight: '700' },
  emptySubText: { color: Palette.grey600, fontSize: 12 },
  modal: { flex: 1, backgroundColor: Palette.navySurface },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Palette.navyBorder,
  },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  modalBody: { padding: Spacing.md },
  inputLabel: { color: Palette.grey400, fontSize: 12, fontWeight: '700', marginBottom: 6, letterSpacing: 0.5 },
  input: {
    backgroundColor: Palette.navyCard, color: '#fff', borderRadius: Radii.md,
    padding: 12, fontSize: 14, marginBottom: 16,
    borderWidth: 1, borderColor: Palette.navyBorder,
  },
  featureRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  featureChip: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radii.md,
    backgroundColor: Palette.navyCard, borderWidth: 1, borderColor: Palette.navyBorder,
  },
  featureChipActive: { backgroundColor: Palette.violetDim, borderColor: Palette.violet },
  featureChipText: { color: Palette.grey400, fontSize: 13, fontWeight: '600' },
  featureChipTextActive: { color: Palette.violetLight },
  priorityRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  priorityChip: {
    flex: 1, paddingVertical: 10, borderRadius: Radii.md, borderWidth: 1.5, alignItems: 'center',
  },
  priorityChipText: { fontSize: 13, fontWeight: '800' },
  saveBtn: {
    backgroundColor: Palette.violet, borderRadius: Radii.md, paddingVertical: 14, alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
