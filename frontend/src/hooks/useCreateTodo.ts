import { useCallback, useEffect, useState } from "react";
import { isSupportedChain } from "../utils/index.js";
import { isAddress } from "ethers";
import { getTodoContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "sonner";

// Define the Todo structure for TypeScript type checking
interface TodoList {
  title: string;
  description: string;
  isCompleted: boolean;
}

// Hook to manage Todos
const useTodos = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [todos, setTodos] = useState<TodoList[]>([]);

  // Function to create a new Todo
  const createTodo = useCallback(
    async (title: string, description: string) => {
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getTodoContract(signer);

      try {
        toast.loading("Processing...");
        const transaction = await contract.createTodo(title, description);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.dismiss();
          toast.success("Todo created successfully!");
          // Optionally, fetch updated list of todos after creation
          fetchTodos();
        } else {
          console.log("Transaction failed!");
        }
      } catch (error: any) {
        toast.dismiss();
        toast.error("Error:", error);
      }
    },
    [chainId, walletProvider]
  );

  const fetchTodos = useCallback(async () => {
    if (!isSupportedChain(chainId)) {
      console.error("Unsupported chain:", chainId);
      return;
    }

    try {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getTodoContract(signer);
      console.log("Fetching todos...");
      const todosArray = await contract.getAllTodo();
      console.log("Fetched todos:", todosArray);
      setTodos(todosArray);
    } catch (error: any) {
      console.error("Failed to fetch todos:", error);
      toast.error("Failed to fetch todos:", error);
    }
  }, [chainId, walletProvider]);

  return { createTodo, todos };
};

export default useTodos;
