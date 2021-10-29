export type EventType =
  "EventScanTaskError"
  | "EventScanTaskFileError"
  | "EventScanTaskDone"
  | "EventScanTaskStop"
  | "EventRemoveLibraryTaskDone"
  | "EventRemoveLibraryTaskError"
  | "TaskBeat"
  | "GeneratorStatusBeat"
  | "EventGenerateThumbnailTaskError"
  | "EventGenerateThumbnailTaskFileError"
  | "EventGenerateThumbnailTaskDone"
  | "GenerateThumbnail"

export interface WebsocketMessage {
  event: EventType
  data: any
}
