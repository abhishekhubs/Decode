// VoiceMap — English base strings (source of truth for Groq translation)

export const BASE_STRINGS = {
  // Tab labels
  tab_dashboard: 'Dashboard',
  tab_reviews:   'Reviews',
  tab_alerts:    'Alerts',
  tab_playbook:  'Playbook',
  tab_settings:  'Settings',

  // Dashboard
  dash_brand_label:    'VOICEMAP',
  dash_shield_active:  'Shield Active',
  dash_role_product:   'Product',
  dash_role_marketing: 'Marketing',
  dash_role_support:   'Support',
  dash_key_insights:   '💡 Key Insights',
  dash_live_feed:      'Live Review Feed',
  dash_competitor:     'Competitor\nBenchmark',
  dash_playbook:       'Playbook\nBuilder',
  dash_kpi_revenue:    'Revenue at Risk',
  dash_kpi_reviews:    'Reviews Analyzed',
  dash_kpi_critical:   'Critical Alerts',
  dash_today:          'today',
  dash_alltime:        'all time',
  dash_unresolved:     'unresolved',

  // Alerts
  alerts_label:        'ALERT CENTER',
  alerts_title:        'Alerts',
  alerts_mark_read:    'Mark all read',
  alerts_critical:     '🔴 Critical',
  alerts_medium:       '🟡 Medium',
  alerts_low:          '🟢 Low',
  alerts_unread:       '🔔 Unread',
  alerts_sec_critical: '🔴 Critical Alerts',
  alerts_sec_medium:   '🟡 Medium Alerts',
  alerts_sec_low:      '🟢 Low Priority',
  alerts_whatsapp:     '📱 WhatsApp alerts enabled · Last sent: 2 mins ago',

  // Reviews
  reviews_label:       'AI ANALYSIS',
  reviews_title:       'Reviews',
  reviews_empty:       'No reviews match this filter',

  // Playbook
  playbook_label:      'AI STRATEGY',
  playbook_title:      'Playbook',
  playbook_todo:       'To Do',
  playbook_inprogress: 'In Progress',
  playbook_done:       'Done',
  playbook_add:        'Add Action',

  // Settings
  settings_label:       'CONFIGURATION',
  settings_title:       'Settings',
  settings_brand_sec:   '🏢 Brand Configuration',
  settings_brand_name:  'Brand Name',
  settings_brand_cat:   'Product Category',
  settings_rev_sec:     '💰 Revenue Parameters',
  settings_avg_order:   'Avg Order Value (₹)',
  settings_monthly:     'Monthly Orders',
  settings_rev_info:    'These values calibrate Revenue-at-Risk calculations shown on the Dashboard.',
  settings_alert_sec:   '🔔 Alert Settings',
  settings_threshold:   'Alert Threshold',
  settings_threshold_sub: 'Current: {val} (alerts fire above this score)',
  settings_whatsapp:    'WhatsApp Alerts',
  settings_whatsapp_sub:'Twilio WhatsApp integration',
  settings_fcm:         'FCM Push Notifications',
  settings_fcm_sub:     'Firebase Cloud Messaging',
  settings_active:      '● Active',
  settings_lang_sec:    '🌏 Language',
  settings_dev_sec:     '🛠 Developer Tools',
  settings_demo:        'Generate Demo Data',
  settings_demo_sub:    'Reload 200 mock reviews + 5 alerts',
  settings_export:      'Export Full Report',
  settings_export_sub:  'Generate VoiceMap_Insights.pdf',
  settings_team:        'Team Decode',
} as const;

export type TKey = keyof typeof BASE_STRINGS;
export type TStrings = Record<TKey, string>;
