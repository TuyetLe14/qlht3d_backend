import path from 'path'
import fs from 'fs'
import crc32 from 'crc/crc32'

const caculate_crc = async (version, chunkSize) => {
  const url = path.join(__dirname, `../../../public/firmware/${version}`)
  const fileData = fs.readFileSync(`${url}/firmware.bin`)
  const fileSize = fileData.length
  const numChunks = Math.ceil(fileSize / chunkSize)
  const crcArray: string[] = []

  // Splitting the file into chunks and calculating CRC32 for each chunk
  for (let i = 0; i < numChunks; i++) {
    const start = i * chunkSize
    const end = Math.min(fileSize, start + chunkSize)
    const chunk = fileData.slice(start, end)

    const crc = crc32(chunk).toString(16).toUpperCase()
    // console.log(`Chunk ${i + 1}: CRC32 - ${crc}`)
    crcArray.push(crc)
  }

  const outputFile = path.join(__dirname, `../../../public/firmware/${version}/metadata.txt`)
  const crcContent = `filesize=${fileSize}\n[crc32]\n${crcArray.join('\n')}\n[/crc32]`

  await fs.writeFileSync(outputFile, crcContent)
}
const remove = async (dir: string) => {
  console.log(dir)
  const url = path.join(__dirname, `../../../public${dir}`)
  console.log(url)
  fs.unlink(url, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

export default { remove, caculate_crc }
