export interface Student {
  id: string;         // Trùng với User ID
  firstName: string;
  lastName: string;
  campus: string;
  avtUrl?: string | null; // Có thể null
  dateOfBirth: string;    // LocalDate trả về "YYYY-MM-DD"
  
}