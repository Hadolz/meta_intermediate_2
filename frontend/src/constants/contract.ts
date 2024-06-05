import { ethers } from "ethers";
import Abi from "../constants/todo.json";

export const getTodoContract = (
  providerOrSigner: ethers.ContractRunner | null | undefined
) =>
  new ethers.Contract(
    import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
    Abi,
    providerOrSigner
  );
