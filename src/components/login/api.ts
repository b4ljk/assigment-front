import { ethers } from "ethers";
import toast from "react-hot-toast";
import { SuccessFullAuthType } from "./type";
import { useAuthStore } from "@/lib/stores";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export async function signInWithMetamask(): Promise<void | any> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask first.");
        reject("Please install MetaMask first.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const publicAddress = await signer.getAddress();

      const response = await fetch(`${API_BASE_URL}/v1/verification/nonce?publicAddress=${publicAddress}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        toast.error(`Error fetching nonce: ${errorMsg}`);
        reject(errorMsg);
        return;
      }
      const json: { nonce: string; isFirstLogin: boolean } = await response.json();

      const signature = await signer.signMessage(json.nonce);

      const authResponse = await fetch(`${API_BASE_URL}/v1/verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicAddress,
          signedNonce: signature,
        }),
      });

      if (!authResponse.ok) {
        const errorMsg = await authResponse.text();
        toast.error(`Error with signing: ${errorMsg}`);
        reject(errorMsg);
        return;
      }
      const authJson: SuccessFullAuthType = await authResponse.json();
      // using secure cookie is standard practice for storing tokens,to do
      localStorage.setItem("access_token", authJson.tokens.access.token);
      localStorage.setItem("refresh_token", authJson.tokens.refresh.token);
      useAuthStore.getState().changeIsLogged(true);
      toast.success("Successfully logged in.");
      resolve(json.isFirstLogin);
    } catch (e) {
      console.error(e);
      toast.error("Error with signing, please try again.");
      reject("Error with signing, please try again.");
    }
  });
}
