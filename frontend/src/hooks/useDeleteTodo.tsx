import { useCallback, useEffect, useState } from "react";
import { isSupportedChain } from "../utils/index";
import { isAddress } from "ethers";
import { getTodoContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "sonner";

const useDeleteTodo = () => {
  const [todo, setTodo] = useState(null);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const deleteTodo = async (index: number) => {
    if (!isSupportedChain(chainId)) return toast.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = await getTodoContract(signer);

    try {
        
    } catch (error) {
        const tx = contract.
    }
  };
};

export default useDeleteTodo;
