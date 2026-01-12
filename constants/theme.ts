const tintColorLight = '#2381ff';
const tintColorDark = '#2381ff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Add your custom colors here
    feedTab: '#ff6b6b',      // Coral red for Feed tab
    planTab: '#3B82F6',      // Blue for Plan
    saveTab: '#10B981',      // Green for Saved
    profileTab: '#8B5CF6',   // Purple for Profile
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Add your custom colors for dark mode
    feedTab: '#ff6b6b',      // Same coral red for consistency
    planTab: '#60A5FA',      // Lighter blue for dark mode
    saveTab: '#34D399',      // Lighter green for dark mode
    profileTab: '#A78BFA',   // Lighter purple for dark mode
  },
};