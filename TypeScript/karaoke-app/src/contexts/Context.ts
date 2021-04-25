import { createContext } from "react";
import { tiposHome } from "../tipos/tipos";


export type VistasContent = {
    vistaGolbal: string
    setVistasGlobal:(c: string) => void
  }


export const MyVistasContext = createContext<VistasContent>({
    vistaGolbal: tiposHome.home, // set a default value
    setVistasGlobal: () => {},
})
