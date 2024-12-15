import axios, { AxiosInstance } from "axios";

interface Node {
  id: number;
  name: string;
  screen_name: string;
  city: string;
  sex: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

export async function getAllNodes(): Promise<Node[]> {
  const response = await apiClient.get<Node[]>("/nodes");
  console.log(response.data);
  return response.data;
}
