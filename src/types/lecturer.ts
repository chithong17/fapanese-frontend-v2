export interface Lecturer {
  id: string;         // Trùng với User ID
  firstName: string;
  lastName: string;
  expertise: string;
  avtUrl?: string | null;
  bio?: string | null;    // @Column(columnDefinition = "TEXT")
  dateOfBirth: string;    // LocalDate trả về "YYYY-MM-DD"
}