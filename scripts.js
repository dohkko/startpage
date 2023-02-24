/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"SuQnrgWP3lxt7W5K","label":"Learning","bookmarks":[{"id":"tN5bAGSOnApiBBA0","label":"TryHackMe","url":"https://tryhackme.com"},{"id":"1Gk1UtPAwFywvrKM","label":"Udemy","url":"https://www.udemy.com"},{"id":"Phn8IazsQNwtTQC0","label":"Real Python","url":"https://realpython.com"},{"id":"jkHaEiqeit7DehZD","label":"The Valuable Dev","url":"https://thevaluable.dev/"}]},{"id":"k1XXaMM699n3DdsV","label":"Reddit","bookmarks":[{"id":"BJwoVyF0cgRTI172","label":"Xfce","url":"https://www.reddit.com/r/xfce/"},{"id":"h91YzInSeMs39mgd","label":"Arch Linux","url":"https://www.reddit.com/r/archlinux/"},{"id":"jgDUFtqISXVRSevy","label":"unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"aujkjAYJ1rO5IJU1","label":"Firefox CSS","url":"https://www.reddit.com/r/FirefoxCSS/"}]},{"id":"kvdc9L5k216eKtvj","label":"Socials","bookmarks":[{"id":"f7gBDnyMqGvb7WAm","label":"LinkendIn","url":"https://www.linkedin.com/"},{"id":"jXkCBLISrYJeESdX","label":"Telegram","url":"https://web.telegram.org/"},{"id":"VON8iv3KyJHsOwYY","label":"Gmail","url":"https://gmail.com"}]},{"id":"uDKPFgyrg7naH60C","label":"Others","bookmarks":[{"id":"EfSifUqmAwK5z7aw","label":"Github","url":"https://github.com"},{"id":"0KLGCac88SDn0Tz0","label":"Youtube","url":"https://youtube.com"},{"id":"Ro50mt7xPOqUf5Ci","label":"Todoist","url":"https://todoist.com"},{"id":"OgVJ3OD7BcfIRvQi","label":"Notion","url":"https://www.notion.so/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
