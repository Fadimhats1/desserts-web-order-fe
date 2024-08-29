import { ActiveContext } from "@/context/ActiveContextProvider";
import { useContext } from "react"

export const useActiveContext = () => {
  const context = useContext(ActiveContext);
  if(context === null){
    throw new Error("ActiveContext must be used within a ProductContextProvider");
  }
  return context;
}