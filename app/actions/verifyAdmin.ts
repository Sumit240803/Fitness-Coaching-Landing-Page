"use server";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const correct = process.env.ADMIN_PASSWORD;
  if (!correct) return false;
  return password === correct;
}
