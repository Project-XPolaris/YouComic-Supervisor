import React from "react";
import {Modal, Progress, Typography} from "antd";

export const ProgressDialog =
  ({
     onClose,
     closeable,
     progress,
     hint = "处理中",
     isOpen = false
   }: { onClose: () => void, closeable: boolean, progress?: number, hint?: string, isOpen?: boolean }) => {
    return (
      <Modal visible={isOpen} footer={null} maskClosable={closeable} closable={closeable} onCancel={onClose}>
        <div>
          <Typography.Text strong>{hint}</Typography.Text>
        </div>
        {
          progress && <Progress percent={progress}/>
        }
      </Modal>
    )
  }
