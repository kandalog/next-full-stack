import Todos from "@/components/todos/Todos";
import { BASE_URL } from "@/lib/config";

export default async function Home() {
  const res = await fetch(BASE_URL + "/todos");
  const data = await res.json();
  return <Todos initialTodos={data.todos} />;
}
