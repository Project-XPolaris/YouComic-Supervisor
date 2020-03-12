import localforage from 'localforage'
import {differenceWith} from 'lodash'
export interface Snapshot {
  id:string
  icon:string
  name:string
  url:string
  extra:any
  type:string
}

export async function addSnapshots({snapshots}:{snapshots:Snapshot[]}) {
  let snapshotList = await localforage.getItem<Snapshot[]>("snapshots");
  if (snapshotList === null){
    snapshotList = []
  }
  await localforage.setItem<Snapshot[]>("snapshots",[
    ...snapshotList,
    ...snapshots
  ])
}

export async function getSnapshot() {
  return localforage.getItem<Snapshot[]>("snapshots")
}

export async function removeSnapshotById({ids}:{ids:string[]}) {
  const snapshotList = await localforage.getItem<Snapshot[]>("snapshots");
  if (snapshotList === null){
    return
  }
  await localforage.setItem<Snapshot[]>("snapshots",
    differenceWith<Snapshot,string>(snapshotList,ids,(a:Snapshot,b:string) => a.id === b)
  )
}
