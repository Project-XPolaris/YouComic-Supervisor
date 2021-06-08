import {IpcRenderer} from "electron";


export const isRenderer = () => {
  return Boolean((window as any).require)
};

const isElectron = isRenderer()
let ipcRenderer: IpcRenderer | undefined = undefined;
if (isElectron) {
  console.log(window.require("electron"))
  ipcRenderer = window.require("electron").ipcRenderer
}
export const maxWindow = () => {
  if (!ipcRenderer){
    return
  }
  ipcRenderer.send("max")
}
export const minWindow = () => {
  console.log("min")
  if (!ipcRenderer){
    return
  }

  ipcRenderer.send("min")
}
export const exitWindow = () => {
  if (!ipcRenderer){
    return
  }
  ipcRenderer.send("exit")
}
