import {useEffect, useState} from "react";

export type ReplaceManager = ReturnType<typeof useReplaceManager>
export type ReplaceRule = {
  old: string
  to: string
  enable: boolean
}
const useReplaceManager = () => {
  const [patterns, setPatterns] = useState<ReplaceRule[]>([]);
  const getRawList = (): ReplaceRule[] => {
    const raw = localStorage.getItem("replace_rule")
    if (!raw) {
      return [];
    }

    return JSON.parse(raw)
  }
  const saveNew = (newPattern: ReplaceRule[]) => {
    localStorage.setItem("replace_rule", JSON.stringify(newPattern))
    setPatterns([...newPattern])
  }
  const addRule = (rule: ReplaceRule) => {
    const newPattern = patterns
    newPattern.push(rule)
    saveNew(newPattern)
  }
  const switchEnable = (old: string, isEnable: boolean) => {
    const newPattern = patterns.map(it => {
      if (it.old === old) {
        it.enable = isEnable
      }
      return it
    })
    saveNew(newPattern)
  }
  const updateList = (newList: ReplaceRule[]) => {
    saveNew(newList)
    setPatterns([...newList])
  }
  useEffect(() => {
    setPatterns(getRawList)
  }, [])
  return {
    patterns, addRule, switchEnable, updateList
  }
}
export default useReplaceManager
