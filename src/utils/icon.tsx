import UserIcon from '@ant-design/icons/UserOutlined'
import TranslatorIcon from '@ant-design/icons/GlobalOutlined'
import ThemeIcon from '@ant-design/icons/SmileOutlined'
import SeriesIcon from '@ant-design/icons/UnorderedListOutlined'
import TagIcon from '@ant-design/icons/TagFilled'
import React from "react";

const tagTypeIconMapping = {
  "artist": <UserIcon/>,
  "translator": <TranslatorIcon/>,
  "theme": <ThemeIcon/>,
  "series": <SeriesIcon/>
};

export function getTagTypeIcon(type: string) {
  const icon = tagTypeIconMapping[type]
  if (icon === undefined) {
    return <TagIcon/>
  }
  return icon
}

