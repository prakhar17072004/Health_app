export interface User { id: number; name: string; email: string; }
export interface Child { id: number; name: string; dob: string; userId: number; }
export interface VaccineStatus { id: number; vaccineId: number; name: string; status: string; dueDate?: string | null; childId: number; }
