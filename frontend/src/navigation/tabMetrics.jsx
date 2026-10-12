// Sizing for the bottom tab bar, derived from the window (not hard-coded).
export const MAX_BAR_WIDTH = 640;

export function getTabMetrics({ width, height, tabCount }) {
  const barWidth = Math.min(width, MAX_BAR_WIDTH);
  const perTab = barWidth / Math.max(tabCount, 1);
  // A phone turned sideways: little vertical room, lots of horizontal room.
  const landscapePhone = width > height && height < 500;

  let size;
  if (landscapePhone) size = { icon: 22, pillW: 40, pillH: 32, label: 12 };
  else if (width >= 600) size = { icon: 26, pillW: 68, pillH: 34, label: 12 };
  else if (width >= 360) size = { icon: 24, pillW: 56, pillH: 32, label: 11 };
  else size = { icon: 22, pillW: 46, pillH: 28, label: 10 };

  // The highlight pill must never be wider than its tab.
  const pillW = Math.max(size.icon + 12, Math.min(size.pillW, perTab - 8));
  return { ...size, pillW, perTab, barWidth, landscapePhone };
}
