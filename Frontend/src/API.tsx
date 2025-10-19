/**





explain why to use mongo and not postgres
5 on top 5 on bottom:
simply take from sorted list??



readme
github
 */
export interface User {
  _id: string;
  name: string;
  score: number;
  avatarUrl?: string;
}
const BASE_URL = "http://localhost:5000";

export async function getTopUsers(n: number): Promise<User[]> {
  try {
    const response = await fetch(`${BASE_URL}/users?n=${n}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User[] = await response.json();
    console.log(`Top ${n} users from backend:`, data);
    return data;
  } catch (err) {
    console.error("Failed to fetch top users:", err);
    return [];
  }
}
export async function addUser(user: Partial<User>) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}
export async function updateUser(id: string, updatedFields: Partial<User>): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}


