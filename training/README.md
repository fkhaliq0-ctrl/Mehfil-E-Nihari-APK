# Training videos (offline)

Drop MP4 lesson videos here — the app plays them **from this folder, no
internet needed**. They are bundled into the EXE build and the APK web
assets under `training/`.

Expected file names (set per lesson in Settings → Software Training):

| Lesson          | File            |
| --------------- | --------------- |
| 1 · Make a Bill | `training-1.mp4`|
| 2 · Hold a Table| `training-2.mp4`|
| 3 · Menu Master | `training-3.mp4`|
| 4 · Day Close   | `training-4.mp4`|

Notes:

- A lesson with no file (or a wrong name) shows a friendly
  "Video not added yet" slot — nothing breaks.
- The Owner can change a lesson's video file name in
  **Settings → Software Training → ✏️ Edit**.
- Keep videos short (≤ 3–4 min, 720p) so the APK stays small.
- MP4s are git-ignored (they live on the build machine / phone only).
