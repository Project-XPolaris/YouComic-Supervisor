import {Button, Divider, Input, Select, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import useReplaceManager, {ReplaceRule} from "@/hooks/replace";

export type ReplaceRuleSelectPropTypes = {
  style: React.CSSProperties
  onChange: (activeRule:ReplaceRule[]) => void
}
const ReplaceRuleSelect = ({style,onChange}: ReplaceRuleSelectPropTypes) => {
  const manager = useReplaceManager()
  const [oldValue, setOldValue] = useState<string>();
  const [newValue, setNewValue] = useState<string>();
  const onAddRule = () => {
    if (!oldValue) {
      return
    }
    manager.addRule({
      old: oldValue,
      to: newValue ?? "",
      enable: false
    })
  }
  const onSelect = (values: string[]) => {
    const newList = manager.patterns.map(it => {
      it.enable = Boolean(values.find(value => value === it.old))
      return it
    })
    manager.updateList([...newList])
    onChange(newList)
  }
  return (
    <Select
      style={style}
      mode="multiple"
      defaultActiveFirstOption={true}
      onChange={onSelect}
      value={manager.patterns.filter(it => it.enable).map(it => it.old)}
      tagRender={(props) => {
        return (
          <></>
        )
      }}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{margin: '8px 0'}}/>
          <Space style={{padding: '0 8px 4px'}}>
            <Input
              placeholder="Old value"
              onChange={(e) => setOldValue(e.currentTarget.value)}
            />
            <Input
              placeholder="To value"
              onChange={(e) => setNewValue(e.currentTarget.value)}
            />
            <Button type="text" icon={<PlusOutlined/>} onClick={onAddRule}>
              
            </Button>
          </Space>
        </>
      )}
    >
      {
        manager.patterns.map((it, idx) => {
          return (
            <Select.Option value={it.old} key={idx}>{it.old + " -> "} {it.to}</Select.Option>
          )
        })
      }
    </Select>
  )
}
export default ReplaceRuleSelect
