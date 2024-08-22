import { ref } from "vue"

export const useRefs = <T extends Record<string, any>>(refs: T): T => {

    return refs.map((refItem: string) => {
        return ref<typeof refItem>(refItem)
    })
    
    

    
  
    
}
