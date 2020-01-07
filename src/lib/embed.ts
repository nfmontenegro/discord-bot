const embedMessage = ({
  authorName,
  authorIconUrl,
  authorUrl,
  fields,
  thumbnailUrl,
  footerText,
  footerIconUrl
}) => ({
  embed: {
    color: '0x0099ff',
    author: {
      name: authorName,
      icon_url: authorIconUrl,
      url: authorUrl
    },
    fields,
    thumbnail: {
      url: thumbnailUrl
    },
    timestamp: new Date(),
    footer: {
      text: footerText,
      icon_url: footerIconUrl
    }
  }
})

export default embedMessage
