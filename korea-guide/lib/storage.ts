export const STORAGE_KEY = 'seoul-field-guide:trip:v1';
export type Trip = { version: 1; saved: string[]; checked: string[] };
export function parseTrip(raw: string | null, placeIds: string[], checklistIds: string[]): Trip {
  const empty: Trip = {version:1,saved:[],checked:[]};
  if (!raw) return empty;
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) return empty;
    const clean = (input: unknown, allowed: string[]) => Array.isArray(input) ? [...new Set(input.filter((id): id is string => typeof id === 'string' && allowed.includes(id)))] : [];
    return {version:1,saved:clean(data.saved,placeIds),checked:clean(data.checked,checklistIds)};
  } catch { return empty; }
}
