import fs from "fs"
import pdf from "pdf-parse-new"
import { extractTimetable } from "./ParseTable.ts"

async function main() {
  const buffer = fs.readFileSync("app/data/Timetable_20_Mar_2026-10-85.pdf")

  const data = await pdf(buffer)

  const result = extractTimetable(data.text)

  console.log(result.slice(0, 20)) // preview

  fs.writeFileSync(
    "app/data/classes.json",
    JSON.stringify(result, null, 2)
  )

  console.log(" Done. Output saved to classes.json")
}

main()