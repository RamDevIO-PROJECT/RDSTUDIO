const videoUrl = document.querySelector('.video-url-input')
const startBtn = document.querySelector('.start-btn')
const downloadBtn = document.querySelector('.download-btn')
const videoThumbnail = document.querySelector('.video-thumbnail')
const videoTitle = document.querySelector('.video-title')
const ResolutionsList = document.querySelector('.resolutions-list')


const getVideoID = () => {
  const url = videoUrl.value
  const searchParams = new URLSearchParams(url.split('?')[1])
  return searchParams.get('v')
}

const getVideoInfo = async (id) => {
  const res = await fetch(`/api/video?id=${id}`)
  return res.json()
}

const showResolutions = (resolutions) => {
  const html = resolutions
  .map((resolution, i) => `
    <label>
      <input type="radio" name="resolution" value="${resolution}" ${i === 0 ? 'checked' : ''}>
      ${resolution}
    </label>
  `)
  .join('')
  
  ResolutionsList.innerHTML = html
}

const getDownloadActhor = ({id, resolution, format}) => {
  let url = `/download?id=${id}&format=${format}`
  if (format === 'video') {
    url += `&resolution=${resolution}`
  }
  alert(url)
  let a = document.createElement('a')
  a.href = url
  a.download = true
  
  return a
}

const download = ({id, resolution, format}) => {
  let a = getDownloadActhor({id, resolution, format})
  a.click()
}

const getRadioValue = (name) => 
  document.querySelector(`[name="${name}"]:checked`).value


startBtn.addEventListener('click', async () => {
  const id = getVideoID()
  const { title, resolutions, thumbnailURL } = await getVideoInfo(id)
  
  videoThumbnail.src = thumbnailURL
  videoTitle.textContent = title
  showResolutions(resolutions)
})

downloadBtn.addEventListener('click', () => {
  download({
    id: getVideoID(),
    resolution: getRadioValue('resolution'),
    format: getRadioValue('format')
  })
})

