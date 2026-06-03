export const todayKey = () => new Date().toISOString().slice(0,10);
export const computeOverallStatus = (a) => {
  if (a.pickupStatus === 'absent') return 'absent';
  if (a.pickupStatus === 'missed' || a.dropStatus === 'missed') return 'issue_reported';
  if (a.dropStatus === 'dropped') return 'dropped_home';
  if (a.schoolArrivalStatus === 'arrived' && a.departureStatus !== 'departed') return 'at_school';
  if (a.pickupStatus === 'picked_up' || a.departureStatus === 'departed') return 'in_transit';
  return 'in_transit';
};
export const toCsv = (rows) => {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? '').replaceAll('"','""')}"`;
  return [keys.join(','), ...rows.map(r => keys.map(k => esc(r[k])).join(','))].join('\n');
};
