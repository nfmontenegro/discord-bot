interface Thumbnail {
  url: string
}

interface Author {
  name: string
  icon_url: string
  url: string
}

interface Fields {
  [index: number]: {
    name: string
    value: string
  }
}

interface Item {
  color: string
  author: Author
  fields: Fields
  thumbnail: Thumbnail
  timestamp: Date
  footer: {
    text: string
    icon_url: string
  }
}

interface Embed {
  embed: Item
}

export default Embed
